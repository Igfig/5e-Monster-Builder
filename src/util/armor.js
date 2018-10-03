import { ARMOR_WEIGHTS } from "../constants/categories";

class Armor {
  constructor(ac, text, weight = undefined) {
    this.baseAC = ac;
    this.text = text.toLowerCase();
    this.label = text || "No armor";
    this.weight = weight;
  }

  getAC() {
    return this.baseAC;
  }

  toString() {
    return this.label;
  }
}

export class LightArmor extends Armor {
  constructor(...props) {
    super(...props, ARMOR_WEIGHTS.LIGHT);
  }

  getAC(monster) {
    //debugger;
    return this.baseAC + monster.abilityScores.DEX.mod;
  }
}

export class MedArmor extends Armor {
  constructor(...props) {
    super(...props, ARMOR_WEIGHTS.MEDIUM);
  }

  getAC(monster) {
    return this.baseAC + Math.min(2, monster.abilityScores.DEX.mod);
  }
}

export class HeavyArmor extends Armor {
  constructor(...props) {
    super(...props, ARMOR_WEIGHTS.HEAVY);
  }
}

export class UnarmoredDefense extends Armor {
  constructor(ability) {
    super(10, `Unarmored Defense (${ability.label})`, ARMOR_WEIGHTS.UNARMORED_DEFENSE);
    this.text = "unarmored defense";
    this.ability = ability;
  }

  getAC(monster) {
    return this.baseAC + monster.abilityScores.DEX.mod + monster.abilityScores[this.ability.id].mod;
  }
}
