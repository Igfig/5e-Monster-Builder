<template>
  <control-info :info="info">
    <builder-label :label="label" :right="labelRight">
      <!--suppress HtmlFormInputWithoutLabel -->
      <select :name="name" :value="getId(value)" @input="selected">
        <option v-for="option in options"
                :value="getId(option)"
                :selected="isSelected(option)">{{getLabel(option)}}</option>
      </select>
    </builder-label>
  </control-info>
</template>

<script>
import { get } from "../../util";
import { control, options } from "./mixins";
import BuilderLabel from "./BuilderLabel";
import ControlInfo from "../ControlInfo";

export default {
  name: "BuilderSelect",
  mixins: [control([Object, String, Boolean]), options(true)],
  components: { ControlInfo, BuilderLabel },
  methods: {
    getId(option) {
      return get(option, "id");
    },
    getLabel(option) {
      return get(option, "label");
    },
    isSelected(option) {
      return this.value === option || this.value === this.getId(option);
    }
  },
  data() {
    return {
      selected: event => {
        const val = event.target.value;
        this.$emit("input", get(this.options, val, val));
      }
    };
  }
};
</script>
