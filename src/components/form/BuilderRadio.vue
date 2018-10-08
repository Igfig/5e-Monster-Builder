<template>
  <fieldset>
    <legend v-if="!!label">{{ label }}</legend>
    <ul
      :style="styles"
      class="radio">
      <li 
        v-for="option in options" 
        :key="getId(option)">

        <builder-hidden-input-label
          :label="getLabel(option)"
          :checked="isChecked(option)">

          <!--suppress HtmlFormInputWithoutLabel -->
          <input
            :name="name"
            :checked="isChecked(option)"
            type="radio"
            @input="onInput(option)"
            @focus="onFocus"
          >
        </builder-hidden-input-label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
import { optionsControl, boxes } from "./mixins";
import BuilderHiddenInputLabel from "./BuilderHiddenInputLabel";

export default {
  name: "BuilderRadio",
  components: { BuilderHiddenInputLabel },
  mixins: [optionsControl([Object, String, Boolean]), boxes],
  methods: {
    onInput(option) {
      this.$emit("input", option);
    },
    // XXX can we rework these so they won't recalculate every time we rerender? Maybe some kind of object dict instead of a function. ...wait it's already just an object, these are just getters basically
    isChecked(option) {
      return this.value === option;
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/tools";
.radio {
  @extend %pressable-grid;
}
</style>
