//import { ordered, compare } from "../util"; // TODO get this to work
import { ordered, compare } from "../util/misc";

// FIXME currently if you want to import from util/index, you have to do it this way which is dumb.
/*import d from "../util";
const dictify = d.dictify;
// const { dictify } = d; // Even this doesn't work!*/

export const SIZES = ordered(
  {
    TINY: {
      label: "tiny",
      hd: 4,
      weaponDice: 1,
      reach: 5,
      speed: 10
    },
    SMALL: {
      label: "small",
      hd: 6,
      weaponDice: 1,
      reach: 5,
      speed: 20
    },
    MEDIUM: {
      label: "medium",
      hd: 8,
      weaponDice: 1,
      reach: 5,
      speed: 30
    },
    LARGE: {
      label: "large",
      hd: 10,
      weaponDice: 2,
      reach: 10,
      speed: 40
    },
    HUGE: {
      label: "huge",
      hd: 12,
      weaponDice: 3,
      reach: 10,
      speed: 50
    },
    GARGANTUAN: {
      label: "gargantuan",
      hd: 20,
      weaponDice: 4,
      reach: 15,
      speed: 60
    }
  },
  compare("hd")
);

export const TYPES = ordered({
  ABERRATION: "aberration",
  BEAST: "beast",
  CELESTIAL: "celestial",
  CONSTRUCT: "construct",
  DRAGON: "dragon",
  ELEMENTAL: "elemental",
  FEY: "fey",
  FIEND: "fiend",
  GIANT: "giant",
  HUMANOID: "humanoid",
  MONSTROSITY: "monstrosity",
  OOZE: "ooze",
  PLANT: "plant",
  UNDEAD: "undead"
});

// XXX this probably wants to be more complex actually, since some of these come with specific stat effects. e.g. all devils are immune to fire and poison
export const SUBTYPES = ordered({
  DEMON: "demon",
  DEVIL: "devil",
  DROW: "drow",
  DWARF: "dwarf",
  ELF: "elf",
  GNOLL: "gnoll",
  GNOME: "gnome",
  GOBLINOID: "goblinoid",
  HALF_ORC: "half-orc",
  HALF_ELF: "half-elf",
  HALFLING: "halfling",
  HUMAN: "human",
  KOBOLD: "kobold",
  ORC: "orc",
  SHAPECHANGER: "shapechanger",
  YUGOLOTH: "yugoloth"
});

export const ALIGNMENTS = ordered(
  {
    LG: { label: "LG", text: "lawful good", order: 1 },
    NG: { label: "NG", text: "neutral good", order: 2 },
    CG: { label: "CG", text: "chaotic good", order: 3 },
    LN: { label: "LN", text: "lawful neutral", order: 4 },
    N: { label: "N", text: "true neutral", order: 5 },
    CN: { label: "CN", text: "chaotic neutral", order: 6 },
    LE: { label: "LE", text: "lawful evil", order: 7 },
    NE: { label: "NE", text: "neutral evil", order: 8 },
    CE: { label: "CE", text: "chaotic evil", order: 9 },
    UNALIGNED: { label: "Unaligned", text: "unaligned", order: 10 },
    ANY: { label: "Any", text: "any alignment", order: 11 }
  },
  compare("order")
);
