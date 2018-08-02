<template>
  <fragment>
    <slot/>
    <label :class="className" :for="forInput">{{ label }}</label>
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
