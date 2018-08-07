<template>
  <div class="form-control">
    <builder-label :forInput="inputId" :label="label" :right="labelRight">
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
  computed: {
    inputId() {
      // TODO should really get namespaced somehow. Or at least add a hash?
      return this.name;
    }
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
  width: 3em; // XXX extremely arbitrary
}
</style>
