<template>
  <control-info :info="info">
    <builder-label :label="label" :right="labelRight">
      <!--suppress HtmlFormInputWithoutLabel -->
      <select :name="name" :value="get(value)" @input="selected">
        <option v-for="option in options"
                :value="get(option)"
                :selected="value === get(option)">{{get(option, "label")}}</option>
        <!--XXX For some reason you straight-up can't pass objects as values to an option-->
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
    get
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
