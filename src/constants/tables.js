export const SIZES = {
  TINY: {
    hd: 4,
    weaponDice: 1,
    reach: 5,
    speed: 10
  },
  SMALL: {
    hd: 6,
    weaponDice: 1,
    reach: 5,
    speed: 20
  },
  MEDIUM: {
    hd: 8,
    weaponDice: 1,
    reach: 5,
    speed: 30
  },
  LARGE: {
    hd: 10,
    weaponDice: 2,
    reach: 10,
    speed: 40
  },
  HUGE: {
    hd: 12,
    weaponDice: 3,
    reach: 10,
    speed: 50
  },
  GARGANTUAN: {
    hd: 20,
    weaponDice: 4,
    reach: 15,
    speed: 60
  }
};

export const ARMOUR = {
  NONE: { name: "", ac: 10, maxDex: 10 },
  PADDED: { name: "Padded armour", ac: 11, maxDex: 10 },
  LEATHER: { name: "Leather armour", ac: 11, maxDex: 10 },
  STUDDED: { name: "Studded leather", ac: 12, maxDex: 10 },
  MAGE: { name: "Mage armour", ac: 13, maxDex: 10 },

  HIDE: { name: "Hide armor", ac: 12, maxDex: 2 },
  CHAIN_SHIRT: { name: "Chain shirt", ac: 13, maxDex: 2 },
  SCALE: { name: "Scale mail", ac: 14, maxDex: 2 },
  BREASTPLATE: { name: "Breastplate", ac: 14, maxDex: 2 },
  HALF_PLATE: { name: "Half plate", ac: 15, maxDex: 2 },

  RING: { name: "Ring mail", ac: 14, maxDex: 0 },
  CHAIN: { name: "Chain mail", ac: 16, maxDex: 0 },
  BANDED: { name: "Banded mail", ac: 17, maxDex: 0 },
  PLATE: { name: "Plate", ac: 18, maxDex: 0 }
};

export const SHIELDS = {
  NONE: { name: "", ac: 0 },
  DUAL: { name: "Dual-wielding", ac: 1 },
  SHIELD: { name: "Shield", ac: 2 }
};
