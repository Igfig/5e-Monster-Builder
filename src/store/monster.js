import { ABILITIES, ALIGNMENTS, ARMOR, SHIELDS, SIZES, TIER_THRESHOLDS, TYPES } from "../constants";
import _ from "lodash";
import { propertiesToMutations } from "../util";

// XXX still not sure this is good organization

class AbilityScore {
  constructor(name, score = 10) {
    this.name = name; // XXX not sure we really need this... it's nice for reading, but it could be a problem if we ever want to, say, swap two scores.
    this.score = score;
  }

  get mod() {
    return Math.floor((this.score - 10) / 2);
    // TODO cache the value if it ends up impacting performance
  }

  // valueOf = () => this.score; // XXX this might be nice but it's also a bit dangerous
}

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
  get ac() {
    // FIXME getter?
    const natural = this.naturalAC + this.abilities.DEX.mod + this.shield.ac; // TODO perhaps define natural armour as an Armor, so we can use the same hooks... add a new naturalArmor prop though maybe
    const armored = this.armor.getAC(this) + this.shield.ac;
    return Math.max(natural, armored);
  }

  abilities = _.mapValues(ABILITIES, ability => new AbilityScore(ability.label));
  saves = [];

  speed = {
    land: SIZES.MEDIUM.speed, // TODO this should actually be empty by default, and return the default speed for the current size unless it's set. Though maybe do that on the component end? ...Maybe not? If they never specified a speed, maybe it *should* update if size changes later.
    fly: undefined,
    swim: undefined,
    burrow: undefined
  };
  canHover = false;
}

export const monster = {
  namespaced: true,
  state: new Monster(),
  mutations: propertiesToMutations(["hd"]) // TODO extract that string to a constant
};
