<template>
  <article class="monster">
    <!--<h2 class="monster-name">{{monster.name}}</h2>--> <!--TODO show this but only if there's text. Otherwise we get the same name twice in a row-->
  
    <!--XXX text here-->

    <Statblock :monster="monster"/>

    <div class="description"/> <!--XXX div doesn't seem quite right... maybe just have a bunch of sections, with no wrapper? Might even pass them in with slots, idk-->
  </article>
</template>

<script>
import Statblock from "./Statblock";
import store from "../store";
//import { keys } from "../store/monster/index";
import _ from "lodash";
import { Monster } from "../store/monster/classes";
import { MONSTER } from "../store/keys";
import { createStoreInterface } from "../util";

const si = createStoreInterface(Monster, MONSTER)(store);
console.log("si", si);

si.name = "burt";
si.hd = 3;
//si.attacks.add();
console.log("type", si.type);

export default {
  name: "Monster",
  components: { Statblock },
  computed: {
    monster() {
      console.log("calc", this);
      // TODO maybe some kind of function that builds this structure?
      return _.merge({}, store.state.monster, store.getters.monster);
      // FIXME also wait are we running a full merge every time we read the value of monster? That's actually terrible now that I think about it.
      /* XXX But of course if we do it outside, then the object doesn't update.
         We could have an object that each of its leaves is a getter that pulls from store... isn't that what we were doing originally?
              (That does have the issue that it doesn't update if you add a new property to the store, instead of just updating an existing one... hmm)
         We could keep the two trees separate within an object, and each time we try to pull from the object we do _.get(getters, path, val, _.get(state, path, val)) so as to always get the correct value? That'd make getting a bit slower, but updating much faster. Of course, we do a lot more getting than updating. Hmm
         Mutations might be easier than we think to add though... after all, the getters are also only top level.
         
         You know what though, we should probably leave this as it is for now. (The state/getters, I mean; mutations still need to be added properly.) Because this does work really well, and it hasn't impacted performance yet. When it does, we can revisit.
         */
    }
  }
};
</script>

<style lang="scss">
</style>
