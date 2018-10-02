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
import AttackBuilder from "./AttackBuilder";
import { MONSTER } from "../store/keys";
import { mapStore } from "../util";
import store from "../store";

export default {
  name: "Attacks",
  components: { AttackBuilder },
  computed: mapStore(MONSTER, store),
  methods: {
    addAttack() {
      //this[keys.monster.attacks.add](); // XXX maybe
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
