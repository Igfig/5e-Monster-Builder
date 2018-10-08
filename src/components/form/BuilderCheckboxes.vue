<template>
  <fieldset @input="onInput">
    <legend v-if="!!label">{{ label }}</legend>
    <ul
      :style="styles"
      class="checkboxes">
      <li 
        v-for="option in options" 
        :key="getId(option)">
        <builder-checkbox
          :name="name"
          :label="option.label"
          :value="getId(option)"
          :checked="isChecked(option)"
          :icons="false"
          @focus="onFocus"/>
      </li>
    </ul>
  </fieldset>
</template>

<script>
import { optionsControl, boxes } from "./mixins";
import BuilderCheckbox from "./BuilderCheckbox";
import BuilderHiddenInputLabel from "./BuilderHiddenInputLabel";

export default {
  name: "BuilderCheckboxes",
  components: { BuilderCheckbox, BuilderHiddenInputLabel },
  mixins: [optionsControl(Array), boxes],
  model: {
    prop: "checkedVals",
    event: "input"
  },
  data() {
    return {
      checkedVals: []
    };
  },
  methods: {
    onInput(event) {
      const { checked, value: key } = event.target;

      if (checked) {
        this.checkedVals.push(key);
      } else {
        this.checkedVals.splice(this.checkedVals.indexOf(key), 1);
      }

      this.$emit("input", this.checkedVals);
    },

    isChecked(option) {
      const key = this.getId(option);
      return this.checkedVals.includes(key);
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/tools";
.checkboxes {
  @extend %pressable-grid;
}
</style>
