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
import { diceAverage, formatBonus } from "../../util";

class AbilityScore {
  constructor(name, score = 10) {
    this.name = name; // XXX if we want to remove this we'll have to change some indexing stuff on the statblock
    this.score = score;
  }

  get mod() {
    // FIXME this really needs to be a proper getter, not this get() thing
    return AbilityScore.getters.mod(this);
  }

  static getters = {
    mod: state => Math.floor((state.score - 10) / 2)
  };

  // valueOf() { return this.score; } // XXX this might be nice but it's also a bit dangerous
}

export class Attack {
  name = "";

  ability = ABILITIES.STR;

  // TODO much more nuance, multiple dice, etc
  numDamageDice = 1;
  damageDieSize = 4;

  attackOverride = undefined;
  damageOverride = undefined;

  getAbilityDamageBonus(monster) {
    if (this.damageDieSize === 1) {
      // very small creatures just deal 1 damage flat.
      // XXX does this apply to, say, humanoids making unarmed attacks though?
      return 0;
    }
    if (_.includes([ABILITIES.STR, ABILITIES.DEX], this.ability)) {
      return monster.abilities[this.ability.id].mod;
    }
    return 0;
  }

  getAttack(monster) {
    return /*monster.proficiency +*/ monster.abilities[this.ability.id].mod; // FIXME monster.proficiency is not properly accessible
  }
  getDamageExpression(monster) {
    // TODO a lot more
    const abilityBonus = this.getAbilityDamageBonus(monster);
    const formattedBonus = abilityBonus ? formatBonus(abilityBonus) : "";
    return `${this.numDamageDice}d${this.damageDieSize}${formattedBonus}`;
  }
  getAverageDamage(monster) {
    // TODO multiple dice types
    return (
      diceAverage(this.numDamageDice, this.damageDieSize) + this.getAbilityDamageBonus(monster)
    );
  }

  getEffectiveAttack(monster) {
    return this.attackOverride || this.getAttack(monster) || 0; // TODO if no override, calculate it properly
  }
  getEffectiveDamage(monster) {
    return this.damageOverride || this.getAverageDamage(monster) || 0; // TODO if no override, calculate it properly
  }
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
    ac: monster => {
      const natural = monster.naturalAC + monster.abilities.DEX.mod + monster.shield.ac; // TODO perhaps define natural armour as an Armor, so we can use the same hooks... add a new naturalArmor prop though maybe
      const armored = monster.armor.getAC(monster) + monster.shield.ac;
      return Math.max(natural, armored);
    },
    hpPerHd: monster => {
      const hpMultiplier = monster.isInjured ? 0.5 : 1;
      const baseHpPerHd = monster.hasMaxHp ? monster.size.hd : (monster.size.hd + 1) / 2;
      return Math.max(1, baseHpPerHd + monster.abilities.CON.mod) * hpMultiplier;
    },
    hp: (monster, getters) => Math.max(1, Math.floor(monster.hd * getters.monster.hpPerHd)),
    /*speed: state => {
      const speed = { ...state.speed };
      if (_.isNil(speed.land)) {
        speed.land = state.size.speed;
      }
      return speed;
    }*/
    // "bar/gar": () => 1,
    //"speed/land": state => (_.isNil(state.speed.land) ? state.size.speed : state.speed.land),
    cr: () => 0, // TODO calc
    proficiency: (monster, getters) => Math.max(2, Math.ceil(getters.monster.cr / 4) + 1),
    tier: (monster, getters) => _.sortedIndex(TIER_THRESHOLDS, getters.monster.cr),
    speed: monster => ({
      land: _.isNil(monster.speed.land) ? monster.size.speed : monster.speed.land
    })
    // TODO allow for merging when using slash form. The bar/gar bit works fine, but the speed/land overwrites speed.       ...Can we use _.merge()?         This might not be needed any more now that we have nested form
  };

  // SPECIAL CUSTOM MUTATIONS
  // note that these must be static
  static mutations = {
    /*"attacks/add": state => {
      state.attacks.push(new Attack());
      return state;
    },*/
    attacks: {
      add: state => {
        state.attacks.push(new Attack());
        return state;
      }
    }
  };
}
