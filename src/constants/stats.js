import { OrderedDict, compare } from "../classes/ordered_dict";

export const ABILITIES = new OrderedDict(
  {
    STR: { order: 0, label: "Str", text: "strength" },
    DEX: { order: 1, label: "Dex", text: "dexterity" },
    CON: { order: 2, label: "Con", text: "constitution" },
    INT: { order: 3, label: "Int", text: "intelligence" },
    WIS: { order: 4, label: "Wis", text: "wisdom" },
    CHA: { order: 5, label: "Cha", text: "charisma" }
  },
  compare("order")
);
