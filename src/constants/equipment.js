import { compare, objectFromKeys, Ordered } from "../util/misc";
import { ABILITIES } from "./stats";
import { HeavyArmor, LightArmor, MedArmor, UnarmoredDefense } from "../util/armor";

// FIXME need to skip Dex
const unarmoredDefenses = objectFromKeys(
  ABILITIES,
  id => `UNARMORED_${id}`,
  (id, ability) => new UnarmoredDefense(ability)
);

export const ARMOR = new Ordered(
  {
    HIDE: new MedArmor(12, "Hide armor"),
    CHAIN_SHIRT: new MedArmor(13, "Chain shirt"),
    SCALE: new MedArmor(14, "Scale mail"),
    BREASTPLATE: new MedArmor(14, "Breastplate"),
    HALF_PLATE: new MedArmor(15, "Half plate"),

    // FIXME order is coincidental, not properly sorted
    NONE: new LightArmor(10, ""),
    PADDED: new LightArmor(11, "Padded armor"),
    LEATHER: new LightArmor(11, "Leather armor"),
    STUDDED: new LightArmor(12, "Studded leather"),
    MAGE: new LightArmor(13, "Mage armor"),

    RING: new HeavyArmor(14, "Ring mail"),
    CHAIN: new HeavyArmor(16, "Chain mail"),
    BANDED: new HeavyArmor(17, "Banded mail"),
    PLATE: new HeavyArmor(18, "Plate"),

    ...unarmoredDefenses
  },
  compare("weight", "baseAC")
);

export const SHIELDS = new Ordered({
  NONE: { label: "", ac: 0 },
  SHIELD: { label: "Shield", ac: 2 }
});
