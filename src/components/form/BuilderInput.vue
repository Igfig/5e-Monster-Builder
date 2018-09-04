<!--Mostly for text inputs, but this should probably work ok for any inputs we haven't defined controls for yet-->

<template>
  <builder-label
    :class-name="name"
    :label="label"
    :right="labelRight">
    <!--suppress HtmlFormInputWithoutLabel -->
    <input
      :name="name"
      :type="type"
      :value="value"
      @input="onInput"
      @focus="onFocus">
  </builder-label>
</template>

<script>
import { control } from "./mixins";
import BuilderLabel from "./BuilderLabel";

export default {
  name: "BuilderInput",
  components: { BuilderLabel },
  mixins: [control([Object, String])],
  props: {
    type: { type: String, default: "text" }
  }
};
</script>
