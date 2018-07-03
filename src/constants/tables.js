import { dictify } from "../util/misc";

export const SIZES = dictify([
  {
    id: "TINY",
    label: "tiny",
    hd: 4,
    weaponDice: 1,
    reach: 5,
    speed: 10
  },
  {
    id: "SMALL",
    label: "small",
    hd: 6,
    weaponDice: 1,
    reach: 5,
    speed: 20
  },
  {
    id: "MEDIUM",
    label: "medium",
    hd: 8,
    weaponDice: 1,
    reach: 5,
    speed: 30
  },
  {
    id: "LARGE",
    label: "large",
    hd: 10,
    weaponDice: 2,
    reach: 10,
    speed: 40
  },
  {
    id: "HUGE",
    label: "huge",
    hd: 12,
    weaponDice: 3,
    reach: 10,
    speed: 50
  },
  {
    id: "GARGANTUAN",
    label: "gargantuan",
    hd: 20,
    weaponDice: 4,
    reach: 15,
    speed: 60
  }
]);

export const TYPES = dictify([
  "aberration",
  "beast",
  "celestial",
  "construct",
  "dragon",
  "elemental",
  "fey",
  "fiend",
  "giant",
  "humanoid",
  "monstrosity",
  "ooze",
  "plant",
  "undead"
]);

// XXX this probably wants to be more complex actually, since some of these come with specific stat effects. e.g. all devils are immune to fire and poison
export const SUBTYPES = dictify([
  "demon",
  "devil",
  "drow",
  "dwarf",
  "elf",
  "gnoll",
  "gnome",
  "goblinoid",
  "half-orc",
  "half-elf",
  "halfling",
  "human",
  "kobold",
  "orc",
  "yugoloth"
]);

export const ALIGNMENTS = dictify([
  { id: "LG", label: "lawful good" },
  { id: "NG", label: "neutral good" },
  { id: "CG", label: "chaotic good" },
  { id: "LN", label: "lawful neutral" },
  { id: "N", label: "true neutral" },
  { id: "CN", label: "chaotic neutral" },
  { id: "LE", label: "lawful evil" },
  { id: "NE", label: "neutral evil" },
  { id: "CE", label: "chaotic evil" },
  "Unaligned",
  { id: "Any", label: "any alignment" }
]);

// TODO add optgroups. Maybe via a groupBy prop?
export const ARMOUR = dictify([
  { id: "NONE", label: "", ac: 10, maxDex: 10 },
  { id: "PADDED", label: "Padded armour", ac: 11, maxDex: 10 },
  { id: "LEATHER", label: "Leather armour", ac: 11, maxDex: 10 },
  { id: "STUDDED", label: "Studded leather", ac: 12, maxDex: 10 },
  { id: "MAGE", label: "Mage armour", ac: 13, maxDex: 10 },

  { id: "HIDE", label: "Hide armor", ac: 12, maxDex: 2 },
  { id: "CHAIN_SHIRT", label: "Chain shirt", ac: 13, maxDex: 2 },
  { id: "SCALE", label: "Scale mail", ac: 14, maxDex: 2 },
  { id: "BREASTPLATE", label: "Breastplate", ac: 14, maxDex: 2 },
  { id: "HALF_PLATE", label: "Half plate", ac: 15, maxDex: 2 },

  { id: "RING", label: "Ring mail", ac: 14, maxDex: 0 },
  { id: "CHAIN", label: "Chain mail", ac: 16, maxDex: 0 },
  { id: "BANDED", label: "Banded mail", ac: 17, maxDex: 0 },
  { id: "PLATE", label: "Plate", ac: 18, maxDex: 0 }

  // TODO can we add functions for unarmored defense?
  // state => ({id:"UNARMORED", label:"Unarmored", ac: abilBonus(state.dex), maxDex: 10})
]);

export const SHIELDS = dictify([
  { id: "NONE", label: "", ac: 0 },
  { id: "SHIELD", label: "Shield", ac: 2 }
]);
