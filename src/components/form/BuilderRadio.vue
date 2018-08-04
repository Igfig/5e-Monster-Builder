<template>
    <fieldset :class="className">
      <legend v-if="!!label">{{label}}</legend>
      <ul>
        <li v-for="option in options"
            :key="get(option)">
          <builder-label
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
          </builder-label>
          <!--:pick="value"
                @input="onInput"-->
        </li>
      </ul>
    </fieldset>
</template>

<script>
import BuilderLabel from "./BuilderLabel";
import { get } from "../../util";

export default {
  name: "BuilderRadio",
  props: {
    name: { type: String, required: true },
    label: { type: String },
    options: { type: [Array, Object], required: true },
    customLabel: { type: Function },
    value: { type: [Object, String, Boolean] }
  },
  components: { BuilderLabel },
  computed: {
    className() {
      return this.name; // TODO namespace?
    }
  },
  methods: {
    //foo: v => console.log("f", this.val),
    onInput(value) {
      // this method has to be in function notation, not lambda. Lambdas break it.
      this.$emit("input", value);
    },
    get, // can I put this in methods instead?
    getId(option) {
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
