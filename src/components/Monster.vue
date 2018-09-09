<template>
  <article class="monster">
    <!--<h2 class="monster-name">{{monster.name}}</h2>--> <!--TODO show this but only if there's text. Otherwise we get the same name twice in a row-->

    <!--XXX text here-->

    <Statblock :monster="monsterComputed"/>

    <div class="description"/> <!--XXX div doesn't seem quite right... maybe just have a bunch of sections, with no wrapper? Might even pass them in with slots, idk-->
  </article>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Statblock from "./Statblock";
import { keys } from "../store/monster/index";
import { mapVuexMap } from "../util";

export default {
  name: "Monster",
  components: { Statblock },
  computed: {
    ...mapVuexMap(mapState, keys.monster),
    ...mapVuexMap(
      mapGetters,
      keys.monster.speed,
      keys.monster.ac
      // keys.monster.bar.gar
    ),
    monsterComputed: function() {
      // TODO abstract out an API that'll do this merge thing for me
      return {
        ...this.monster,
        speed: this[keys.monster.speed],
        ac: this[keys.monster.ac]
        // bar: { gar: this[keys.monster.bar.gar] }
      };
    }
  }
};
</script>

<style lang="scss">
</style>
