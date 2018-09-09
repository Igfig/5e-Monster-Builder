import { Monster } from "./classes";
import { MONSTER } from "../keys";
import { createStoreModule } from "../../util";

export const { module, keys } = createStoreModule(Monster, MONSTER);
export default module;
