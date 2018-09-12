<template>
  <article><form> <!--XXX not sure we need both of these, but they seem semantic.-->
    <BuilderInput v-model="value.name" name="name" label="Name"/>
    <BuilderNumeric v-model="value.atkOverride" name="atkOverride" label="Attack" />
    <BuilderNumeric v-model="value.dmgOverride" name="dmgOverride" label="Damage" />
  </form></article>
</template>

<script>
import BuilderInput from "./form/BuilderInput";
import BuilderNumeric from "./form/BuilderNumeric";
export default {
  name: "AttackBuilder",
  components: { BuilderNumeric, BuilderInput },
  props: {
    value: Object
  }
};
</script>

<style lang="scss">
</style>
