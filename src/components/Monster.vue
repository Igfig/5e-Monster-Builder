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
import { MONSTER } from "../store/keys";
import { mapStore } from "../util";

export default {
  name: "Monster",
  components: { Statblock },
  computed: mapStore(MONSTER)
};
</script>

<style lang="scss">
</style>
