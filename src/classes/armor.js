import { ARMOR_WEIGHTS } from "../constants/categories";

class Armor {
  constructor(ac, text, weight = undefined) {
    this.ac = ac;
    this.text = text.toLowerCase(); // this is what shows up in the statblock
    this.label = text || "No/natural armor"; // this is what appears on the input // TODO move string
    this.weight = weight;
    this.maxDex = 10;
  }

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

export class NaturalArmor extends Armor {
  constructor(...props) {
    super(undefined, ...props, ARMOR_WEIGHTS.NATURAL); // i.e. we're ignoring the 'ac' prop
  }
  acWithDex(monster) {
    return monster.naturalAC + this.dexBonus(monster);
  }
}

export class LightArmor extends Armor {
  constructor(...props) {
    super(...props, ARMOR_WEIGHTS.LIGHT);
  }
}

export class MedArmor extends Armor {
  constructor(...props) {
    super(...props, ARMOR_WEIGHTS.MEDIUM);
    // noinspection JSUnusedGlobalSymbols
    this.maxDex = 2;
  }
}

export class HeavyArmor extends Armor {
  constructor(...props) {
    super(...props, ARMOR_WEIGHTS.HEAVY);
  }
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
