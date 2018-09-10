<template>
  <builder-label
    :label="label"
    :right="labelRight">
    <!--suppress HtmlFormInputWithoutLabel -->
    <input
      :name="name"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      :placeholder="placeholder"
      type="number"
      @input="onInput"
      @focus="onFocus">
  </builder-label>
</template>

<script>
import _ from "lodash";
import { control } from "./mixins";
import BuilderLabel from "./BuilderLabel";

export default {
  name: "BuilderNumeric",
  components: { BuilderLabel },
  mixins: [control(Number)],
  props: {
    min: Number,
    max: Number,
    default: Number,
    step: Number
  },
  methods: {
    onInput(event) {
      const rawValue = parseInt(event.target.value);
      const value =
        !_.isNaN(rawValue) && !_.isNil(rawValue) //  These checks allow for values of 0
          ? rawValue
          : this.default || undefined; // if value is unparseable (probably because it's empty), use the default. If there is no default, return undefined.
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss">
.form-control input[type="number"] {
  width: 2.6em; // XXX pretty arbitrary, but enough for 2 digits in this font.
  padding-right: 0;
  text-align: right;
}
</style>
