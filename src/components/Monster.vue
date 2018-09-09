<template>
  <article class="monster">
    <!--<h2 class="monster-name">{{monster.name}}</h2>--> <!--TODO show this but only if there's text. Otherwise we get the same name twice in a row-->

    <!--XXX text here-->

    <Statblock :monster="monsterComputed"/>

    <div class="description"/> <!--XXX div doesn't seem quite right... maybe just have a bunch of sections, with no wrapper? Might even pass them in with slots, idk-->
  </article>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Statblock from "./Statblock";
import { stateKeys } from "../store/monster/index";
import { mapVuexMap } from "../util";

console.log(
  "keys",
  stateKeys.monster,
  stateKeys.monster.ac,
  "monster/" + stateKeys.monster.ac,
  stateKeys.monster.speed,
  stateKeys.monster.speed.land
);

let mapVuexMapState = mapVuexMap(mapState, stateKeys.monster);
let mapVuexMapGetters = mapVuexMap(mapGetters, stateKeys.monster.speed, stateKeys.monster.ac);
console.log("mvm1", mapVuexMapState, mapVuexMapGetters);
//console,.log("ac", )

export default {
  name: "Monster",
  components: { Statblock },
  computed: {
    ...mapVuexMapState,
    ...mapVuexMapGetters,
    monsterComputed: function() {
      const a = {
        ...this.monster,
        speed: this[stateKeys.monster.speed],
        ac: this[stateKeys.monster.ac]
      }; // TODO abstract out an API that'll do this merge thing for me
      console.log("mc", this, a);
      return a;
    }
  }
};
</script>

<style lang="scss">
</style>
