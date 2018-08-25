import { ABILITIES } from "../constants";
import { objectFromKeys, ordered } from "./misc";

export function unarmoredDefenses(monster) {
  return ordered(
    objectFromKeys(
      ABILITIES,
      name => ({
        label: `Unarmored Defense (${ABILITIES[name].label})`,
        ac: 10 + monster.abilities[name].mod,
        maxDex: 10
      }),
      name => `UNARMORED_${name}`
    )
  );
}
