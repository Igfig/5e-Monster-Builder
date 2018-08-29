<template>
	<article class="monster">
		<!--<h2 class="monster-name">{{monster.name}}</h2>--> <!--TODO show this but only if there's text. Otherwise we get the same name twice in a row-->
		
    <!--XXX text here-->
    
    <Statblock :monster="monster"/>
		
		<div class="description"></div> <!--XXX div doesn't seem quite right... maybe just have a bunch of sections, with no wrapper? Might even pass them in with slots, idk-->
	</article>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Statblock from "./Statblock";
import { MONSTER } from "../store/keys";

export default {
  name: "Monster",
  components: { Statblock },
  computed: {
    ...mapState({ monsterState: MONSTER }),
    ...mapGetters({ speed: "monster/speed" }),
    monster: function() {
      return { ...this.monsterState, speed: this.speed };
    }
  }
};
</script>

<style lang="scss">
</style>
