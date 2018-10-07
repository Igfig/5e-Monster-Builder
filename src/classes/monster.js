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

  naturalAC = 10;
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
      return monster.armor.acWithDex(getters.monster) + monster.shield.ac;
    },
    naturalAC: monster => monster.naturalAC, // XXX this is a bit ugly to have
    acText: monster => {
      const acSources = [];

      if (monster.armor !== ARMOR.NONE) {
        acSources.push(monster.armor.text);
      } else if (monster.naturalAC > 10) {
        acSources.push("natural armor"); // XXX or put this on natural armor proper?
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
