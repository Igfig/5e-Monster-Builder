import { ordered, compare } from "../util/misc";

export const ABILITIES = ordered(
  {
    // XXX somewhat tempted to make the keys lowercase actually, so that when we get the corresponding entries from the store they won't be monster.abilities.STR.score or whatever
    STR: { order: 0, label: "str", text: "strength" },
    DEX: { order: 1, label: "dex", text: "dexterity" },
    CON: { order: 2, label: "con", text: "constitution" },
    INT: { order: 3, label: "int", text: "intelligence" },
    WIS: { order: 4, label: "wis", text: "wisdom" },
    CHA: { order: 5, label: "cha", text: "charisma" }
  },
  compare("order")
);
