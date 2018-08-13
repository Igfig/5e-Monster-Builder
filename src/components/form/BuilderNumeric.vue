<template>
  <div class="form-control">
    <builder-label :label="label" :right="labelRight">
      <!--suppress HtmlFormInputWithoutLabel -->
      <input :name="name" :id="inputId"
             type="number" :value="value"
             :min="min" :max="max" :step="step"
             @input="onInput"/>
    </builder-label>
  </div>
</template>

<script>
import BuilderLabel from "./BuilderLabel";
import { control } from "./mixins";

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
