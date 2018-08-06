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

export default {
  name: "BuilderNumeric",
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    labelRight: Boolean,
    value: { type: Number },
    min: Number,
    max: Number,
    step: { type: Number, default: 1 }
  },
  computed: {
    inputId() {
      // TODO should really get namespaced somehow. Or at least add a hash?
      return this.name;
    }
  },
  components: { BuilderLabel },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style lang="scss">
input[type="number"] {
  width: 3em; // XXX extremely arbitrary
}
</style>
