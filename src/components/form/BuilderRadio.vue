<template>
    <fieldset :class="name">
      <legend v-if="!!label">{{label}}</legend>
      <ul class="radio" :style="{gridTemplateColumns: `repeat(${width}, 1fr)`}">
        <li v-for="option in options">

          <builder-hidden-input-label
              :label="getLabel(option)"
              :checked="checked(option)">

            <!--suppress HtmlFormInputWithoutLabel -->
            <input type="radio" :name="name"
                :checked="checked(option)"
                @input="onInput(option)" @focus="onFocus"
            />
          </builder-hidden-input-label>
        </li>
      </ul>
    </fieldset>
</template>

<script>
import { optionsControl } from "./mixins";
import BuilderHiddenInputLabel from "./BuilderHiddenInputLabel";

export default {
  name: "BuilderRadio",
  mixins: [optionsControl([Object, String, Boolean])],
  components: { BuilderHiddenInputLabel },
  props: {
    width: { type: Number, default: 3 }
  },
  methods: {
    onInput(option) {
      this.$emit("input", option);
    },
    // XXX can we rework these so they won't recalculate every time we rerender? Maybe some kind of object dict instead of a function. ...wait it's already just an object, these are just getters basically
    checked(option) {
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
