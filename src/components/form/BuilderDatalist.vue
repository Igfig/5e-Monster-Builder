<template>
  <!--TODO option to multiselect-->
  <!--TODO this still only deals in ids, not the actual objects, because option values (and not just labels) show up in the dropdown-->
  <builder-label :forInput="name" :label="label" :right="labelRight">
    <input type="text" :name="name" :id="name" v-model="value" :list="datalist">
    <datalist :id="datalist">
      <option v-for="option in options">{{getLabel(option)}}</option>
    </datalist>
  </builder-label>
</template>

<script>
import BuilderLabel from "./BuilderLabel";
import { get } from "../../util";

export default {
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    default: { type: [Object, String] },
    options: { type: Array, required: true },
    labelRight: { type: Boolean },
    customLabel: { type: Function }
  },
  name: "BuilderDatalist",
  components: { BuilderLabel },
  data() {
    return {
      value: this.default ? this.default.label : "",
      datalist: `${this.name}-list`,
      getLabel: option => (this.customLabel ? this.customLabel(option) : get(option, "label"))
    };
  }
};
</script>
