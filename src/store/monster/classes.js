import {
  ABILITIES,
  ALIGNMENTS,
  ARMOR,
  SHIELDS,
  SIZES,
  TIER_THRESHOLDS,
  TYPES
} from "../../constants";
import _ from "lodash";

class AbilityScore {
  constructor(name, score = 10) {
    this.score = score;
  }

  get mod() {
    return Math.floor((this.score - 10) / 2);
    // TODO cache the value if it ends up impacting performance
  }

  // valueOf() { return this.score; } // XXX this might be nice but it's also a bit dangerous
}

// TODO turn all these js getters into vuex getters. They're better because they cache values.
// also FIXME right now the get()ed properties don't show up in the statblock, because we use Object.entries() to get the properties list, and I guess get()s don't show up on that.

export class Monster {
  name = "";
  isProperName = false;

  size = SIZES.MEDIUM;
  type = TYPES.HUMANOID;
  subtypes = null;
  alignment = ALIGNMENTS.UNALIGNED;

  cr = 0; // TODO calculate
  get tier() {
    return _.sortedIndex(TIER_THRESHOLDS, this.cr);
  }

  get proficiency() {
    return Math.max(2, Math.ceil(this.cr / 4) + 1);
  }

  hd = 1;
  hasMaxHp = false;
  isInjured = false;
  hpPerHd = () => {
    // TODO this should be a getter, or at least cached somehow
    const hpMultiplier = this.isInjured ? 0.5 : 1;
    const baseHpPerHd = this.hasMaxHp ? this.size.hd : (this.size.hd + 1) / 2;
    return Math.max(1, baseHpPerHd + this.abilities.CON.mod) * hpMultiplier;
  };

  get hp() {
    // TODO this should be a getter, or at least cached somehow
    return Math.max(1, Math.floor(this.hd * this.hpPerHd()));
  }

  naturalAC = 10;
  armor = ARMOR.NONE;
  shield = SHIELDS.NONE;

  /*get ac() {
    // FIXME getter?
    const natural = this.naturalAC + this.abilities.DEX.mod + this.shield.ac; // TODO perhaps define natural armour as an Armor, so we can use the same hooks... add a new naturalArmor prop though maybe
    const armored = this.armor.getAC(this) + this.shield.ac;
    return Math.max(natural, armored);
  }*/

  abilities = _.mapValues(ABILITIES, ability => new AbilityScore(ability.label));
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

  // GETTERS
  // note that these must be static

  static getters = {
    // "bar/gar": () => 1,
    ac: state => {
      const natural = state.naturalAC + state.abilities.DEX.mod + state.shield.ac; // TODO perhaps define natural armour as an Armor, so we can use the same hooks... add a new naturalArmor prop though maybe
      const armored = state.armor.getAC(state) + state.shield.ac;
      return Math.max(natural, armored);
    },
    speed: state => {
      const speed = { ...state.speed };
      if (_.isNil(speed.land)) {
        speed.land = state.size.speed;
      }
      return speed;
    }
    //"speed/land": state => (_.isNil(state.speed.land) ? state.size.speed : state.speed.land)
  };

  // MUTATIONS
  // note that these must be static
  static mutations = {
    foo: () => 1
    //speed: () => 1
  };
}
