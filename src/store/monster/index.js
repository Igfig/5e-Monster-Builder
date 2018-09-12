import { Monster } from "./classes";
import { MONSTER } from "../keys";
import { createStoreModule } from "../../util";

export const { module, keys } = createStoreModule(Monster, MONSTER);
// FIXME there's kind of a problem with this: we don't actually want to use this structure in our final design, do we? We just want to do a mapState, a mapGetters, and a mapMutations and then merge them together into one object. Right? And that would want three separate lists.                               Hm although then we do run into name collisions.                                                          Ugh we probably could put a nested object into component.computed though                                   fuck ok let's just come back to this later

export default module;
