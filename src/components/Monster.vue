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

export default {
  name: "Monster",
  components: { Statblock },
  computed: {
    monster() {
      // TODO maybe some kind of function that builds this structure?
      return _.merge({}, store.state.monster, store.getters.monster);
    }
  }
};
</script>

<style lang="scss">
</style>
