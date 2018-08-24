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
    step: Number
  },
  methods: {
    onInput(event) {
      const value = parseInt(event.target.value) || this.props.min || 0;
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss">
input[type="number"] {
  width: 2.3em; // XXX pretty arbitrary
  padding-right: 0;
}
</style>
