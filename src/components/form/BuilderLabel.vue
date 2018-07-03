<template>
  <label><span :style="style">{{ label }}</span> <slot /></label>
</template>

<script>
export default {
  name: "BuilderLabel",
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

<style scoped>
label {
  display: flex;
  flex-flow: row nowrap;
}
</style>
