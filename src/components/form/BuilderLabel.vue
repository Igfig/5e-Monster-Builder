<template>
  <label :class="classObject">
    <span class="label-holder">{{ label }}</span>
    <slot />
  </label>
</template>

<script>
export default {
  name: "BuilderLabel",
  props: {
    className: { type: String, default: null },
    label: { type: String, required: true },
    right: { type: Boolean, default: false }
  },
  data() {
    return {
      classObject: {
        "form-control": true,
        "label-right": this.right,
        "label-left": !this.right,
        [this.className]: !!this.className
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
