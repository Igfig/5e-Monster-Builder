import { ARMOR_WEIGHTS } from "../constants/categories";

export class Armor {
  constructor(ac, label, text = undefined) {
    this.ac = ac;
    this.label = label; // this is what appears on the input
    this.text = text || label.toLowerCase(); // this is what shows up in the statblock
  }
  maxDex = 10;
  weight = undefined;

  acWithDex(monster) {
    return this.ac + this.dexBonus(monster);
  }
  dexBonus(monster) {
    return Math.min(this.maxDex, monster.abilityScores.DEX.mod);
  }

  toString() {
    return this.label;
  }
}

export class CustomArmor extends Armor {
  constructor(...props) {
    super(undefined, ...props); // i.e. we're ignoring the 'ac' prop
  }

  acWithDex(monster) {
    return monster.naturalAC + this.dexBonus(monster);
  }
}

export class LightArmor extends Armor {
  weight = ARMOR_WEIGHTS.LIGHT;
}

export class MedArmor extends Armor {
  // noinspection JSUnusedGlobalSymbols
  maxDex = 2; // for use with dexBonus
  weight = ARMOR_WEIGHTS.MEDIUM;
}

export class HeavyArmor extends Armor {
  // noinspection JSUnusedGlobalSymbols
  maxDex = 0; // not that this actually gets used, but it's nice to have
  weight = ARMOR_WEIGHTS.HEAVY;

  dexBonus() {
    return 0;
  }
}

/*export class UnarmoredDefense extends Armor {
  constructor(ability) {
    super(10, `Unarmored Defense (${ability.label})`, ARMOR_WEIGHTS.UNARMORED_DEFENSE);
    this.text = "unarmored defense";
    this.ability = ability;
  }

  acWithDex(monster) {
    return this.ac + monster.abilityScores.DEX.mod + monster.abilityScores[this.ability.id].mod;
  }
}*/
export class ArmorWeight {
  constructor(order, label = "") {
    this.order = order;
    this.label = label;
  }

  valueOf() {
    return this.order;
  }

  toString() {
    return this.label;
  }
}
