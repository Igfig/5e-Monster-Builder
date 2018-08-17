<template>
    <fieldset :class="className">
      <legend v-if="!!label">{{label}}</legend>
      <control-info :info="info">
      <ul>
        <li v-for="option in options"
            :key="get(option)"
            class="radio-label">
          <builder-label-separate
              :forInput="getId(option)"
              :label="getLabel(option)">
            <!--suppress HtmlFormInputWithoutLabel -->
            <input
                type="radio"
                :name="name"
                :id="getId(option)"
                :selected="value === option"
                @input="onInput(option)"
            /> <!--TODO find a way to work with the built-in :checked selector-->
          </builder-label-separate>
        </li>
      </ul>
      </control-info>
    </fieldset>
</template>

<script>
import { get } from "../../util";
import { control, options } from "./mixins";
import BuilderLabelSeparate from "./BuilderLabelSeparate";
import ControlInfo from "../ControlInfo";

export default {
  name: "BuilderRadio",
  mixins: [control([Object, String, Boolean]), options(true)],
  components: { ControlInfo, BuilderLabelSeparate },
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
    get,
    getId(option) {
      // XXX should this naybe be computed instead? So it'll recalculate less often
      return this.name + "-" + this.get(option).toLowerCase();
    },
    getLabel(option) {
      return this.customLabel ? this.customLabel(option) : get(option, "label");
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  display: none;
}
</style>
