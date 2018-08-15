<template>
  <control-info :info="info">
    <builder-label :label="label" :right="labelRight">
      <!--suppress HtmlFormInputWithoutLabel -->
      <input :name="name" type="number" :value="value"
             :min="min" :max="max" :step="step"
             @input="onInput"/>
    </builder-label>
  </control-info>
</template>

<script>
import { control } from "./mixins";
import BuilderLabel from "./BuilderLabel";
import ControlInfo from "../ControlInfo";

export default {
  name: "BuilderNumeric",
  mixins: [control(Number)],
  components: { ControlInfo, BuilderLabel },
  props: {
    min: Number,
    max: Number,
    step: Number
  },
  methods: {
    onInput(event) {
      this.$emit("input", parseInt(event.target.value));
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
