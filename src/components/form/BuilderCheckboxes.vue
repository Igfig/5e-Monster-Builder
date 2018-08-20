<template>
  <fieldset @input="onChange">
    <legend v-if="!!label">{{label}}</legend>
    <ul class="checkboxes" :style="{gridTemplateColumns: `repeat(${width}, 1fr)`}">
      <li v-for="option in options">
        <builder-checkbox :name="name" :label="option.label | capitalize"
                          :value="getId(option)" :checked="shouldBeChecked(option)"
                          @focus="onFocus"/>
      </li>
    </ul>
  </fieldset>
</template>

<script>
import { optionsControl } from "./mixins";
import BuilderCheckbox from "./BuilderCheckbox";
import BuilderHiddenInputLabel from "./BuilderHiddenInputLabel";

export default {
  name: "BuilderCheckboxes",
  mixins: [optionsControl(Array)],
  components: { BuilderCheckbox, BuilderHiddenInputLabel },
  model: {
    prop: "checkedVals",
    event: "input"
  },
  props: {
    width: { type: Number, default: 3 }
  },
  methods: {
    onChange(event) {
      const { checked, value: key } = event.target;

      if (checked) {
        this.checkedVals.push(key);
      } else {
        this.checkedVals.splice(this.checkedVals.indexOf(key), 1);
      }

      /*
      // turn the unsorted list of ids into a sorted list of objects
       // TODO there is probably a more efficient way to do this.
       // XXX Also we don't always need it sorted now that I think about it? So commenting out
      const result = Object.keys(this.options)
        .filter(k => this.checkedVals.includes(k))
        .map(k => this.options[k]);*/

      this.$emit("input", this.checkedVals);
    },

    shouldBeChecked(option) {
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
  display: inline-grid;
  //grid-template-columns: repeat(3, 1fr); // FIXME this is only really valid in some cases
  //grid-template-columns: repeat(3, auto);
  grid-gap: 2px;

  label {
    display: block;
  }
}
</style>
