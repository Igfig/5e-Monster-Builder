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
    LG: { id: "LG", label: "lawful good", order: 1 },
    NG: { id: "NG", label: "neutral good", order: 2 },
    CG: { id: "CG", label: "chaotic good", order: 3 },
    LN: { id: "LN", label: "lawful neutral", order: 4 },
    N: { id: "N", label: "true neutral", order: 5 },
    CN: { id: "CN", label: "chaotic neutral", order: 6 },
    LE: { id: "LE", label: "lawful evil", order: 7 },
    NE: { id: "NE", label: "neutral evil", order: 8 },
    CE: { id: "CE", label: "chaotic evil", order: 9 },
    UNALIGNED: { id: "Unaligned", label: "unaligned", order: 10 },
    ANY: { id: "Any", label: "any alignment", order: 11 }
  },
  compare("order")
);
