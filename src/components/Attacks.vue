<template>
  <div>
    <button @click="addAttack">add attack</button>
    <ul class="attack-builders">
      <li v-for="(attack, key) in monster.attacks" :key="key">
        <AttackBuilder :value="attack"/> <!--TODO can we find a more elegant way to pass in the attack object? Using v-model breaks it-->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AttackBuilder from "./AttackBuilder";
import { keys } from "../store/monster/index";
//import { mapVuexMap } from "../util";
import { MONSTER } from "../store/keys";

export default {
  name: "Attacks",
  components: { AttackBuilder },
  computed: {
    //...mapVuexMap(mapState, keys.monster)
    ...mapState([MONSTER])
  },
  methods: {
    // ...mapVuexMap(mapMutations, keys.monster.attacks.add),
    addAttack() {
      this[keys.monster.attacks.add]();
    }
  }
};
</script>

<style lang="scss">
@import "../styles/tools/sizes.tools";

$spacing: 5px;

.attack-builders {
  column-width: $column-width;
  margin-top: $spacing;

  > li {
    box-sizing: border-box;
    margin-bottom: $spacing;
    padding: $spacing;
    border: 1px solid black;
    break-inside: avoid;
  }
}
</style>
