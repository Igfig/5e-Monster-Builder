//import { dictify } from "../util"; // TODO get this to work
import { dictify } from "../util/misc";

// FIXME currently if you want to import from util/index, you have to do it this way which is dumb.
// import d from "../util";
// const dictify = d.dictify;

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
  "shapechanger",
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
