import { objectFromKeys } from "../util/misc";
import { ABILITIES } from "./stats";
import { HeavyArmor, LightArmor, MedArmor, UnarmoredDefense } from "../util/armor";
import { Ordered, compare } from "../util/ordered_dict";

const unarmoredKey = ability => `UNARMORED_${ability.id}`;

const unarmoredDefenses = objectFromKeys(ABILITIES, unarmoredKey, ability => {
  return new UnarmoredDefense(ability);
});
delete unarmoredDefenses[unarmoredKey(ABILITIES.DEX)]; // you can't have Dex-based unarmored defense. That'd be double Dex!

export const ARMOR = new Ordered(
  {
    // FIXME order is quasi-coincidental, not properly sorted
    // XXX actually I wonder if this even wants to be a regular Ordered? Since we want to split it... maybe it should actually be a dict of Ordereds (or an Ordered of Ordereds?) so we don't have to construct the tree each time?
    // XXX or maybe we should just build the tree once and keep it in this file here
    NONE: new LightArmor(10, ""),
    PADDED: new LightArmor(11, "Padded armor"),
    LEATHER: new LightArmor(11, "Leather armor"),
    STUDDED: new LightArmor(12, "Studded leather"),
    MAGE: new LightArmor(13, "Mage armor"),

    HIDE: new MedArmor(12, "Hide armor"),
    CHAIN_SHIRT: new MedArmor(13, "Chain shirt"),
    SCALE: new MedArmor(14, "Scale mail"),
    BREASTPLATE: new MedArmor(14, "Breastplate"),
    HALF_PLATE: new MedArmor(15, "Half plate"),

    RING: new HeavyArmor(14, "Ring mail"),
    CHAIN: new HeavyArmor(16, "Chain mail"),
    BANDED: new HeavyArmor(17, "Banded mail"),
    PLATE: new HeavyArmor(18, "Full plate"),

    0: new LightArmor(11, "Padded armor"), // XXX temp
    1: new LightArmor(11, "Padded armor"),

    ...unarmoredDefenses
  },
  compare("weight", "baseAC")
);

// FIXME aw heck defining the iterator only works when we do for...of, not for...in or Object.keys()
/*console.log(Object.keys(ARMOR));

for (const a in ARMOR) {
  console.log(a, ARMOR[a]);
}*/
/*for (const a of ARMOR) {
  console.log(a);
}*/

export const SHIELDS = new Ordered({
  NONE: { label: "", ac: 0 },
  SHIELD: { label: "Shield", ac: 2 }
});
