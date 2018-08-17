import { ABILITIES, ALIGNMENTS, SIZES, TIER_THRESHOLDS, TYPES } from "../constants";
import _ from "lodash";

// XXX still not sure this is good organization

class AbilityScore {
  constructor(name, score = 10) {
    this.name = name; // XXX not sure we really need this... it's nice for reading, but it could be a problem if we ever want to, say, swap two scores.
    this.score = score;
  }

  get bonus() {
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

  ac = 10;
  hd = 1;
  hasMaxHp = false;
  isInjured = false;
  hpPerHd = () => {
    const hpMultiplier = this.isInjured ? 0.5 : 1;
    const baseHpPerHd = this.hasMaxHp ? this.size.hd : (this.size.hd + 1) / 2;
    return Math.max(1, baseHpPerHd + this.abilities.CON.bonus) * hpMultiplier;
  };
  set hpTarget(value) {
    this.hd = Math.max(1, Math.round(value / this.hpPerHd()));
  }
  get hp() {
    return Math.max(1, Math.floor(this.hd * this.hpPerHd()));
  }

  // FIXME updating Con when we have an hp target doesn't change our number of HD
  abilities = _.mapValues(ABILITIES, ability => new AbilityScore(ability.label));
  saves = [];

  speed = {
    land: SIZES.MEDIUM.speed, // TODO this should actually be empty by default, and return the default speed for the current size unless it's set
    fly: undefined,
    swim: undefined,
    burrow: undefined
  };
  canHover = false;
}
