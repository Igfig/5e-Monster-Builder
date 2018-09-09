import { Monster } from "./classes";
import { MONSTER } from "../keys";
import { createStoreModule } from "../../util";

const { module, keys } = createStoreModule(Monster, MONSTER);
console.log("module", module);
console.log("keys", keys);
export const stateKeys = keys;
export default module;
