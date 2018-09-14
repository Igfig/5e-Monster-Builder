<template>
  <article class="attack-builder"><form> <!--XXX not sure we need both of these, but they seem semantic.-->
    <BuilderInput v-model="value.name" name="name" label="Name"/>
    <br />
    <BuilderNumeric v-model="value.attackOverride" name="atkOverride" label="Attack" />
    <BuilderNumeric v-model="value.damageOverride" name="dmgOverride" label="Damage" labelRight/>
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
.attack-builder {
}
</style>
