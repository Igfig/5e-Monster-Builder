import { ABILITIES, ALIGNMENTS, SIZES, TYPES } from "../constants";
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
  alignment = ALIGNMENTS.UNALIGNED;

  ac = 10;
  hd = 1;
  hasMaxHp = false;
  isInjured = false;

  proficiency = 2; // TODO make dependent on CR

  abilities = _.mapValues(ABILITIES, ability => new AbilityScore(ability.label));
  saves = [];

  speed = {
    land: SIZES.MEDIUM.speed, // TODO this should actually be empty by default, and return the default speed for the current size unless it's set
    fly: undefined,
    swim: undefined,
    burrow: undefined
  };

  hpPerHd = () => {
    const hpMultiplier = this.isInjured ? 0.5 : 1;

    if (this.hasMaxHp) {
      return (this.size.hd + this.abilities.CON.bonus) * hpMultiplier;
    }

    return ((this.size.hd + 1) / 2 + this.abilities.CON.bonus) * hpMultiplier;
  };

  set hpTarget(value) {
    this.hd = Math.round(value / this.hpPerHd());
  }

  get hp() {
    return Math.floor(this.hd * this.hpPerHd());
  }
}
