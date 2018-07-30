//import { ordered, compare } from "../util";
import { ordered, compare } from "../util/misc";

// TODO add optgroups. Maybe via a groupBy prop? ...I guess we can group by maxDex
export const ARMOR = ordered(
  {
    NONE: { label: "", ac: 10, maxDex: 10 },
    PADDED: { label: "Padded armor", ac: 11, maxDex: 10 },
    LEATHER: { label: "Leather armor", ac: 11, maxDex: 10 },
    STUDDED: { label: "Studded leather", ac: 12, maxDex: 10 },
    MAGE: { label: "Mage armor", ac: 13, maxDex: 10 },

    HIDE: { label: "Hide armor", ac: 12, maxDex: 2 },
    CHAIN_SHIRT: { label: "Chain shirt", ac: 13, maxDex: 2 },
    SCALE: { label: "Scale mail", ac: 14, maxDex: 2 },
    BREASTPLATE: { label: "Breastplate", ac: 14, maxDex: 2 },
    HALF_PLATE: { label: "Half plate", ac: 15, maxDex: 2 },

    RING: { label: "Ring mail", ac: 14, maxDex: 0 },
    CHAIN: { label: "Chain mail", ac: 16, maxDex: 0 },
    BANDED: { label: "Banded mail", ac: 17, maxDex: 0 },
    PLATE: { label: "Plate", ac: 18, maxDex: 0 }

    // TODO can we add functions for unarmored defense? Maybe by means of a vuex getter or something
    // state => ({id:"UNARMORED", label:"Unarmored", ac: abilBonus(state.dex), maxDex: 10})
  },
  compare(["maxDex", "desc"], "ac")
);
export const SHIELDS = ordered({
  NONE: { label: "", ac: 0 },
  SHIELD: { label: "Shield", ac: 2 }
});
