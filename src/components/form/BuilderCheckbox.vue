<template>
  <builder-hidden-input-label
    :class="{'boolean-icons': icons}"
    :label="label"
    :checked="checked">
    <!--TODO pressing enter or space while the label is selected should toggle the input. Space works, Enter doesn't.-->

    <!--suppress HtmlFormInputWithoutLabel -->
    <input
      :name="name"
      :value="value"
      :checked="checked"
      type="checkbox"
      @input="onInput"
      @focus="onFocus"
    >
  </builder-hidden-input-label>
</template>

<script>
import { control } from "./mixins";
import BuilderHiddenInputLabel from "./BuilderHiddenInputLabel";

export default {
  name: "BuilderCheckbox",
  components: { BuilderHiddenInputLabel },
  mixins: [control([String, Object])],
  model: {
    prop: "checked",
    event: "input"
  },
  props: {
    checked: { type: Boolean, default: false },
    icons: { type: Boolean, default: true }
  },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.checked);
    }
  }
};
</script>
