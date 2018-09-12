<template>
  <ul>
    <li v-for="(attack, key) in attacks" :key="key">
      <AttackBuilder :value="attack"/>
    </li>
  </ul>
</template>

<script>
import AttackBuilder from "./AttackBuilder";

export default {
  name: "Attacks",
  components: { AttackBuilder },
  data() {
    return { attacks: [{}] };
  }
};
</script>

<style lang="scss">
</style>
