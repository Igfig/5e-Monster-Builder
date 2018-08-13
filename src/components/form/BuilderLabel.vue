<template>
  <fragment v-if="forInput">
    <slot/>
    <label :class="className" :for="forInput">{{ label }}</label>
  </fragment>
  <label v-else>
    <span :class="className">{{ label }}</span>
    <slot />
  </label>
</template>

<script>
import { component as Fragment } from "vue-fragments";

export default {
  name: "BuilderLabel",
  components: { Fragment },
  props: {
    forInput: { type: String }, // TODO perhaps we should just take a boolean or a name, and generate the id ourselves
    label: { type: String, required: true },
    right: { type: Boolean }
  },
  data() {
    return {
      className: this.right ? "label-right" : "label-left"
    };
  }
};
</script>

<style lang="scss">
$margin: 5px;

.label-left {
  order: -1;
  margin-right: $margin;
}
.label-right {
  order: 1;
  margin-left: $margin;
}
</style>
