import { dictify } from "../util/misc";

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
