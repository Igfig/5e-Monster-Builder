<template>
  <div class="form-control">
    <builder-label :label="label" :right="labelRight">
      <!--suppress HtmlFormInputWithoutLabel -->
      <select :name="name" :value="get(value)" @input="selected">
        <option v-for="option in options"
                :value="get(option)"
                :selected="value === get(option)">{{get(option, "label")}}</option>
        <!--XXX For some reason you straight-up can't pass objects as values to an option-->
      </select>
    </builder-label>
  </div>
</template>

<script>
import { get } from "../../util";
import BuilderLabel from "./BuilderLabel";
import { control, options } from "./mixins";

export default {
  name: "BuilderSelect",
  mixins: [control([Object, String, Boolean]), options(true)],
  components: { BuilderLabel },
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
