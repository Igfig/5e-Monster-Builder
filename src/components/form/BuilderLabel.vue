<template>
  <fragment>
    <slot/>
    <label :style="style" :for="forInput">{{ label }}</label>
  </fragment>
</template>

<script>
import { component as Fragment } from "vue-fragments";

export default {
  name: "BuilderLabel",
  components: { Fragment },
  props: {
    forInput: { type: String },
    label: { type: String },
    right: { type: Boolean }
  },
  data() {
    return {
      style: { order: this.right ? 1 : -1 }
    };
  }
};
</script>
