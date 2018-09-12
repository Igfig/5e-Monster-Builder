<template>
  <div>
    <button @click="addAttack">add attack</button>
    <ul>
    <li v-for="(attack, key) in monster.attacks" :key="key">
      <AttackBuilder :value="attack"/> <!--TODO can we find a more elegant way to pass in the attack object? Using v-model breaks it-->
    </li>
  </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AttackBuilder from "./AttackBuilder";
import { Attack } from "../store/monster/classes";
import { keys } from "../store/monster/index";
import { mapVuexMap } from "../util";

export default {
  name: "Attacks",
  components: { AttackBuilder },
  computed: {
    ...mapVuexMap(mapState, keys.monster)
  },
  methods: {
    ...mapVuexMap(mapMutations, keys.monster.attacks.add),
    addAttack() {
      this[keys.monster.attacks.add](new Attack()); // FIXME this all is kinda ugly
    }
  }
};
</script>

<style lang="scss">
</style>
