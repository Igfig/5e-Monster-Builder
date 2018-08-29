<template>
  <builder-label :label="label" :right="labelRight">
    <!--suppress HtmlFormInputWithoutLabel -->
    <input :name="name" type="number" :value="value"
           :min="min" :max="max" :step="step"
           :placeholder="placeholder"
           @input="onInput" @focus="onFocus"/>
  </builder-label>
</template>

<script>
import { control } from "./mixins";
import BuilderLabel from "./BuilderLabel";

export default {
  name: "BuilderNumeric",
  mixins: [control(Number)],
  components: { BuilderLabel },
  props: {
    min: Number,
    max: Number,
    default: Number,
    step: Number
  },
  methods: {
    onInput(event) {
      const value =
        parseInt(event.target.value) ||
        this.default || // if value is unparseable (probably because it's empty), use the default
        undefined; // or if there is none, return undefined.
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss">
// TODO either scope this better or move it to a global
input[type="number"] {
  width: 2.6em; // XXX pretty arbitrary, but enough for 2 digits in this font.
  padding-right: 0;
  text-align: right;
}
</style>
