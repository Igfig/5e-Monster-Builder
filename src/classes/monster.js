import { ABILITIES, ALIGNMENTS, ARMOR, SHIELDS, SIZES, TIER_THRESHOLDS, TYPES } from "../constants";
import _ from "lodash";
import { mapObject } from "../util";
import { Attack } from "./attack";

class AbilityScore {
  constructor(ability, score = 10) {
    this.ability = ability;
    this.score = score;

    Object.defineProperty(this, "mod", {
      enumerable: true,
      get: () => Math.floor((this.score - 10) / 2)
      // it's actually more efficient to use this getter than a proper Vue getter, or at least it is in my current implementation; the Vue getter updates the entire Monster object, and then each of the ability scores six times.
      // TODO smarter implementation so that a getter could actually work
    });
  }

  /*static getters = {
    mod: abilityScore => Math.floor((abilityScore.score - 10) / 2)
  };*/

  // valueOf() { return this.score; } // XXX this might be nice but it's also a bit dangerous
}

export class Monster {
  name = "";
  isProperName = false;

  size = SIZES.MEDIUM;
  type = TYPES.HUMANOID;
  subtypes = null;
  alignment = ALIGNMENTS.UNALIGNED;

  hd = 1;
  hasMaxHp = false;
  isInjured = false;

  naturalAC = 10;
  armor = ARMOR.NONE;
  hasShield = false; //SHIELDS.NONE;

  abilityScores = mapObject(ABILITIES, ability => ability.id, ability => new AbilityScore(ability));
  saves = [];

  // accessed via getters
  speed = {
    land: undefined,
    fly: undefined,
    swim: undefined,
    climb: undefined,
    burrow: undefined
  };
  canHover = false;

  butt = {
    poop: 100
  };

  attacks = [new Attack()];

  // GETTERS
  // note that these must be static

  static getters = {
    ac: (monster, getters) => {
      return monster.armor.acWithDex(monster) + getters.monster.shieldAC;
    },
    shieldAC: monster => (monster.hasShield ? SHIELDS.SHIELD.ac : SHIELDS.NONE.ac),
    acText: monster => {
      const acSources = [];

      if (monster.armor !== ARMOR.NONE || monster.naturalAC > 10) {
        // if our natural AC is 10 (i.e. no natural armor), then don't display the text
        acSources.push(monster.armor.text);
      }

      if (monster.hasShield) {
        acSources.push(SHIELDS.SHIELD.label.toLowerCase());
      }

      return acSources.join(", ");
    },

    hpPerHd: monster => {
      const hpMultiplier = monster.isInjured ? 0.5 : 1;
      const baseHpPerHd = monster.hasMaxHp ? monster.size.hd : (monster.size.hd + 1) / 2;
      return Math.max(1, baseHpPerHd + monster.abilityScores.CON.mod) * hpMultiplier;
    },
    hp: (monster, getters) => Math.max(1, Math.floor(monster.hd * getters.monster.hpPerHd)),

    cr: () => 0, // TODO calc
    proficiency: (monster, getters) => Math.max(2, Math.ceil(getters.monster.cr / 4) + 1),
    tier: (monster, getters) => _.sortedIndex(TIER_THRESHOLDS, getters.monster.cr),
    speed: monster => ({
      land: _.isNil(monster.speed.land) ? monster.size.speed : monster.speed.land
    })
  };

  // SPECIAL CUSTOM MUTATIONS
  // note that these must be static
  static mutations = {
    /*"attacks/add": state => {
      state.attacks.push(new Attack());
    },*/
    /*attacks: {
      add: state => {
        state.attacks.push(new Attack());
      }
    }*/
    addAttack: state => {
      state.attacks.push(new Attack());
    },
    butt: {
      fart: state => {
        state.butt.poop = 1000;
      }
    }
  };
}
