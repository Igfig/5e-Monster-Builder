<template>
  <article class="monster">
    <!--<h2 class="monster-name">{{monster.name}}</h2>--> <!--TODO show this but only if there's text. Otherwise we get the same name twice in a row-->

    <!--XXX text here-->

    <Statblock :monster="monsterComputed"/>

    <div class="description"/> <!--XXX div doesn't seem quite right... maybe just have a bunch of sections, with no wrapper? Might even pass them in with slots, idk-->
  </article>
</template>

<script>
//import { mapGetters, mapState } from "vuex";
import { mapState } from "vuex";
import Statblock from "./Statblock";
import store from "../store";
import { keys } from "../store/monster/index";
//import { Api, mapVuexMap } from "../util";
import { Api } from "../util";

//const state = mapVuexMap(mapState, keys.monster);
const state = mapState({ monster: keys.monster.toString() });

_.merge(state, { monster: {} });

//console.log('FOO', foo);

console.log("store", store);
console.log("state", state);

const api = new Api(store, keys.monster);
console.log("api", api);

let computed = {
  ...state,
  ...api,
  /*...mapVuexMap(
   mapGetters,
   keys.monster.speed,
   keys.monster.ac
   // keys.monster.bar.gar
   ),*/
  monsterComputed: function() {
    console.log("foopi", this);

    // TODO abstract out an API that'll do this merge thing for me
    //return {};
    return {
      ...this.monster
      /*speed: this[keys.monster.speed],
       ac: this[keys.monster.ac]*/
      // bar: { gar: this[keys.monster.bar.gar] }
    };
  }
};
export default {
  name: "Monster",
  components: { Statblock },
  computed
};
</script>

<style lang="scss">
</style>
