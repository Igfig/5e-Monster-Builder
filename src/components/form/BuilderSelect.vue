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
      <BuilderOptions :options="options" :is-selected="isSelected"/>
    </select>
  </builder-label>
</template>

<script>
import { selectControl } from "./mixins";
import BuilderLabel from "./BuilderLabel";
import BuilderOptions from "./BuilderOptions";

export default {
  name: "BuilderSelect",
  components: { BuilderOptions, BuilderLabel },
  mixins: [selectControl([Object, String, Boolean])]
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
