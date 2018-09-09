import { Monster } from "./classes";
import { MONSTER } from "../keys";
import { createStoreModule } from "../../util";

const { module, keys } = createStoreModule(Monster, MONSTER);
export const stateKeys = keys;
export default module;
