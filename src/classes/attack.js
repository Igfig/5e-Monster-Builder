import _ from "lodash";
import { ABILITIES } from "../constants";
import { diceAverage, formatBonus } from "../util";

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
      return monster.abilityScores[this.ability.id].mod;
    }
    return 0;
  }

  getAttack(monster) {
    return monster.proficiency + monster.abilityScores[this.ability.id].mod;
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
