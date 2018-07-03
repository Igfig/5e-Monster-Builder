<template>
  <fragment>
    <slot />
    <label :for="forInput">{{ label }}</label>
  </fragment>
</template>

<script>
import { component as Fragment } from "vue-fragments";

export default {
  name: "BuilderLabel",
  components: { Fragment },
  props: {
    forInput: { type: String },
    label: { type: String }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
:not(label) {
  display: none;
}
</style>
