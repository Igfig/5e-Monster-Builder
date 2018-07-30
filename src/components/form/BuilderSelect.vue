<template>
  <builder-label :forInput="name" :label="label" :right="labelRight">
    <select :name="name" :id="name" v-model="value">
      <option v-for="option in options" :value="option">{{getLabel(option)}}</option>
    </select>
  </builder-label>
</template>

<script>
import BuilderLabel from "./BuilderLabel";
import { get } from "../../util";

export default {
  name: "BuilderSelect",
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    options: { type: [Array, Object], required: true },
    default: { type: [Object, String] },
    labelRight: { type: Boolean },
    customLabel: { type: Function }
  },
  components: { BuilderLabel },
  data() {
    return {
      value: this.default || "",
      getLabel: option => (this.customLabel ? this.customLabel(option) : get(option, "label"))
    };
  }
};
</script>
