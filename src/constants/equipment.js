import { mapObject } from "../util/misc";
import { ABILITIES } from "./stats";
import { HeavyArmor, LightArmor, MedArmor, UnarmoredDefense } from "../util/armor";
import { OrderedDict, compare } from "../util/ordered_dict";

const unarmoredKey = ability => `UNARMORED_${ability.id}`;

const unarmoredDefenses = mapObject(ABILITIES, unarmoredKey, ability => {
  return new UnarmoredDefense(ability);
});
delete unarmoredDefenses[unarmoredKey(ABILITIES.DEX)]; // you can't have Dex-based unarmored defense. That'd be double Dex!

export const ARMOR = new OrderedDict(
  {
    // XXX maybe this should actually be an OrderedDict of OrderedDicts so we don't have to construct the tree of weights each time we use it?
    // XXX or maybe we should just build the tree once below, and keep it in this file here
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

    ...unarmoredDefenses
  },
  compare("weight", "baseAC")
);

export const SHIELDS = new OrderedDict({
  NONE: { label: "", ac: 0 },
  SHIELD: { label: "Shield", ac: 2 }
});
