<template>
  <div :class="className">
    <label v-if="!!label">{{label}}</label> <!--FIXME Not sure label is the right element here, since it doesn't really connect to an input-->
    <builder-label
        v-for="option in options"
        hideInput
        :key="get(option)"
        :forInput="getId(option)"
        :label="getLabel(option)">
      <!--suppress HtmlFormInputWithoutLabel -->
      <input
          type="radio"
          :name="name"
          :id="getId(option)"
          :value="option"
          :selected="get(option) === get(value)"
          v-model="value"
      /> <!--TODO find a way to work with the built-in :checked selector-->
    </builder-label>
  </div>
</template>

<script>
import BuilderLabel from "./BuilderLabel";
import { get } from "../../util";

export default {
  name: "BuilderRadio",
  props: {
    className: { type: String },
    name: { type: String, required: true },
    label: { type: String },
    options: { type: [Array, Object], required: true },
    default: { type: [String, Object] },
    labelRight: { type: Boolean },
    customLabel: { type: Function }
  },
  components: { BuilderLabel },
  data() {
    return {
      value: this.default || "",
      get,
      getId: option => {
        return this.name + "-" + this.get(option).toLowerCase();
      },
      getLabel: option => (this.customLabel ? this.customLabel(option) : get(option, "label"))
    };
  }
};
</script>

<style lang="scss">
</style>
