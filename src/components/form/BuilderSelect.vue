<template>
  <builder-label
    :label="label"
    :right="labelRight">
    <!--suppress HtmlFormInputWithoutLabel -->
    <select
      :name="name"
      :value="getId(value)"
      @input="selected"
      @focus="onFocus">
      <builder-options :options="options" :is-selected="isSelected"/>
    </select>
  </builder-label>
</template>

<script>
import { get } from "../../util";
import { optionsControl } from "./mixins";
import BuilderLabel from "./BuilderLabel";
import BuilderOptions from "./BuilderOptions";

export default {
  name: "BuilderSelect",
  components: { BuilderOptions, BuilderLabel },
  mixins: [optionsControl([Object, String, Boolean])],
  data() {
    return {
      selected: event => {
        // XXX this is pretty similar to the onInput method, should we just use that instead?
        const val = event.target.value;
        this.$emit("input", get(this.options, val, val));
      }
    };
  },
  methods: {
    isSelected(option) {
      return this.value === option || this.value === this.getId(option);
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/tools";

.form-control select {
  @extend %control;
  @extend %control-border;
  padding: $control-box-spacing; // select seems to have about 2px of side padding built in already
}
</style>
