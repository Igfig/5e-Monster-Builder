<template>
  <builder-hidden-input-label :label="label" :checked="checked">
    <!--TODO pressing enter or space while the label is selected should toggle the input.-->

    <!--suppress HtmlFormInputWithoutLabel -->
    <input :name="name" type="checkbox"
           :value="value"
           :checked="checked"
           @input="onInput" @focus="onFocus"
    />
  </builder-hidden-input-label>
</template>

<script>
import { control } from "./mixins";
import BuilderHiddenInputLabel from "./BuilderHiddenInputLabel";

export default {
  name: "BuilderCheckbox",
  mixins: [control([String, Object])],
  components: { BuilderHiddenInputLabel },
  props: {
    checked: Boolean
  },
  model: {
    prop: "checked",
    event: "input"
  },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.checked);
    }
  }
};
</script>
