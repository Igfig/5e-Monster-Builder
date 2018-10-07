import { ABILITIES, ALIGNMENTS, ARMOR, SHIELDS, SIZES, TIER_THRESHOLDS, TYPES } from "../constants";
import _ from "lodash";
import { mapObject } from "../util";
import { Attack } from "./attack";

class AbilityScore {
  constructor(ability, score = 10) {
    this.ability = ability;
    this.score = score;
  }

  static getters = {
    mod: ability => Math.floor((ability.score - 10) / 2)
  };

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

  naturalArmor = 10;
  armor = ARMOR.NONE;
  shield = SHIELDS.NONE;

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
      const natural = getters.monster.naturalAC + monster.shield.ac; // TODO perhaps define natural armour as an Armor, so we can use the same hooks... add a new naturalArmor prop though maybe
      const armored = getters.monster.armorAC + monster.shield.ac;
      return Math.max(natural, armored);
    },
    naturalAC: (monster, getters) => monster.naturalArmor + getters.monster.abilityScores.DEX.mod,
    armorAC: (monster, getters) => monster.armor.getAC(getters.monster),
    acText: (monster, getters) => {
      const acSources = [];

      if (monster.naturalArmor > 10 || monster.armor !== ARMOR.NONE) {
        const base =
          getters.monster.naturalAC > monster.armor.getAC(getters.monster)
            ? "natural armor"
            : monster.armor.text;

        acSources.push(base);
      }

      if (monster.shield !== SHIELDS.NONE) {
        acSources.push(monster.shield.label.toLowerCase());
      }

      return acSources.join(", ");
    },

    hpPerHd: (monster, getters) => {
      const hpMultiplier = monster.isInjured ? 0.5 : 1;
      const baseHpPerHd = monster.hasMaxHp ? monster.size.hd : (monster.size.hd + 1) / 2;
      return Math.max(1, baseHpPerHd + getters.monster.abilityScores.CON.mod) * hpMultiplier;
    },
    hp: (monster, getters) => Math.max(1, Math.floor(monster.hd * getters.monster.hpPerHd)),

    abilityScores: monster => {
      // XXX hmm this is a little inefficient isn't it. There's got to be a better way. Like, construct an object once ahead of time instead of rebuilding it every call. Can we cache it perhaps?
      return _.mapValues(monster.abilityScores, ability =>
        _.mapValues(AbilityScore.getters, getter => getter(ability))
      );
    },

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
