<template>
    <fieldset :class="name">
      <legend v-if="!!label">{{label}}</legend>
      <ul class="radio" :style="styles">
        <li v-for="option in options">

          <builder-hidden-input-label
              :label="getLabel(option)"
              :checked="isChecked(option)">

            <!--suppress HtmlFormInputWithoutLabel -->
            <input type="radio" :name="name"
                :checked="isChecked(option)"
                @input="onInput(option)" @focus="onFocus"
            />
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
  mixins: [optionsControl([Object, String, Boolean]), boxes],
  components: { BuilderHiddenInputLabel },
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
.radio {
  // TODO unify with BuilderCheckboxes style

  display: inline-grid;
  grid-gap: 2px;

  li,
  label {
    display: block;
    margin: 0;
  }
}
</style>
