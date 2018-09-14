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
import { diceAverage } from "../../util";

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

export class Attack {
  name = "";

  ability = ABILITIES.STR;

  // TODO much more nuance, multiple dice, etc
  numDamageDice = 1;
  damageDieSize = 2;

  attackOverride = undefined;
  damageOverride = undefined;

  getAttack(monster) {
    return /*monster.proficiency +*/ monster.abilities[this.ability.id].mod; // FIXME monster.proficiency is not properly accessible
  }
  getDamage(monster) {
    const abilityBonus =
      this.ability === ABILITIES.STR || this.ability === ABILITIES.DEX
        ? monster.abilities[this.ability.id].mod
        : 0;
    return diceAverage(this.numDamageDice, this.damageDieSize) + abilityBonus;
  }

  getEffectiveAttack(monster) {
    return this.attackOverride || this.getAttack(monster) || 0; // TODO if no override, calculate it properly
  }
  getEffectiveDamage(monster) {
    return this.damageOverride || this.getDamage(monster) || 0; // TODO if no override, calculate it properly
  }
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

  attacks = [new Attack()];

  // GETTERS
  // note that these must be static

  static getters = {
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
    // "bar/gar": () => 1,
    //"speed/land": state => (_.isNil(state.speed.land) ? state.size.speed : state.speed.land) // TODO allow for merging when using slash form. The bar/gar bit works fine, but the speed/land overwrites speed.
  };

  // SPECIAL CUSTOM MUTATIONS
  // note that these must be static
  static mutations = {
    "attacks/add": state => {
      state.attacks.push(new Attack());
      return state;
    }
  };
}
