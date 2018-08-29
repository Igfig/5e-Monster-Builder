<!--TODO implement optgroups somehow-->
<template>
  <builder-label :label="label" :right="labelRight">
    <!--suppress HtmlFormInputWithoutLabel -->
    <select :name="name"
            :value="getId(value)"
            @input="selected" @focus="onFocus">
      <option v-for="option of options"
              :value="getId(option)"
              :selected="isSelected(option)">{{getLabel(option)}}</option>
    </select>
  </builder-label>
</template>

<script>
import { get } from "../../util";
import { optionsControl } from "./mixins";
import BuilderLabel from "./BuilderLabel";

export default {
  name: "BuilderSelect",
  mixins: [optionsControl([Object, String, Boolean])],
  components: { BuilderLabel },
  methods: {
    isSelected(option) {
      return this.value === option || this.value === this.getId(option);
    }
  },
  data() {
    return {
      selected: event => {
        // XXX this is pretty similar to the onInput method, should we just use that instead?
        const val = event.target.value;
        this.$emit("input", get(this.options, val, val));
      }
    };
  }
};
</script>
