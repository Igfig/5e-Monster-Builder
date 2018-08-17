<template>
    <fieldset :class="className">
      <legend v-if="!!label">{{label}}</legend>
      <control-info :info="info">
      <ul>
        <li v-for="option in options"
            class="radio-label">

          <builder-hidden-input-label
              :label="getLabel(option)"
              :checked="checked(option)">

            <!--suppress HtmlFormInputWithoutLabel -->
            <input
                type="radio"
                :name="name"
                :selected="checked(option)"
                @input="onInput(option)"
            /> <!--TODO find a way to work with the built-in :checked selector-->
          </builder-hidden-input-label>
        </li>
      </ul>
      </control-info>
    </fieldset>
</template>

<script>
import { get } from "../../util";
import { control, options } from "./mixins";
import BuilderHiddenInputLabel from "./BuilderHiddenInputLabel";
import ControlInfo from "../ControlInfo";

export default {
  name: "BuilderRadio",
  mixins: [control([Object, String, Boolean]), options(true)],
  components: { ControlInfo, BuilderHiddenInputLabel },
  props: {
    customLabel: { type: Function }
  },
  computed: {
    className() {
      return this.name; // TODO namespace?
    }
  },
  methods: {
    onInput(value) {
      // this method has to be in function notation, not lambda. Lambdas break it.
      this.$emit("input", value);
    },
    // XXX can we rework these so they won't recalculate every time we rerender? Maybe some kind of object dict instead of a function. ...wait it's already just an object, these are just getters basically
    getLabel(option) {
      return this.customLabel ? this.customLabel(option) : get(option, "label");
    },
    checked(option) {
      return this.value === option;
    }
  }
};
</script>
