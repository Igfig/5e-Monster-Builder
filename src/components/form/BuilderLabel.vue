<template>
  <label :class="classObject">
    <span class="label-holder">{{ label }}</span>
    <slot />
  </label>
</template>

<script>
import { component as Fragment } from "vue-fragments";

export default {
  name: "BuilderLabel",
  components: { Fragment },
  props: {
    className: String,
    label: { type: String, required: true },
    right: { type: Boolean }
  },
  data() {
    return {
      classObject: {
        [this.className]: !!this.className,
        "label-right": this.right,
        "label-left": !this.right
      }
    };
  }
};
</script>

<style lang="scss">
$margin: 5px;

.label-left > .label-holder {
  order: -1;
  margin-right: $margin;
}
.label-right > .label-holder {
  order: 1;
  margin-left: $margin;
}
</style>
