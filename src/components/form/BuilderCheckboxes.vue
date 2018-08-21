<template>
  <fieldset @input="onInput">
    <legend v-if="!!label">{{label}}</legend>
    <ul class="checkboxes" :style="styles">
      <li v-for="option in options">
        <builder-checkbox :name="name" :label="option.label | capitalize"
                          :value="getId(option)" :checked="isChecked(option)"
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
  mixins: [optionsControl(Array), boxes],
  components: { BuilderCheckbox, BuilderHiddenInputLabel },
  model: {
    prop: "checkedVals",
    event: "input"
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
  },
  data() {
    return {
      checkedVals: []
    };
  }
};
</script>

<style lang="scss">
.checkboxes {
  // TODO unify with BuilderRadio style

  display: inline-grid;
  //grid-template-columns: repeat(3, 1fr); // FIXME this is only really valid in some cases
  grid-gap: 2px;

  li,
  label {
    display: block;
    margin: 0;
  }
}
</style>
