<!--TODO still very incomplete-->

<template>
  <fieldset>
    <legend v-if="!!label">{{label}}</legend>
    <ul>
      <li v-for="option in options">
        <builder-checkbox :label="option.label" :value="option"
          :labelRight="labelRight" :name="name" @input="onInput"/>
      </li>
    </ul>
  </fieldset>
</template>
<script>
import BuilderCheckbox from "./BuilderCheckbox";

export default {
  name: "BuilderCheckboxes",
  components: { BuilderCheckbox },
  props: {
    inputId: {},
    label: {},
    labelRight: {},
    name: { type: String, required: true },
    onInput: {},
    options: { Array },
    value: Array
  },

  methods: {
    onInput(event) {
      this.$emit("input", event.target.checked);
    }
  }
};
</script>
