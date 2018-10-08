<template>
  <builder-label :label="label"
                 :right="labelRight">
    <!--suppress HtmlFormInputWithoutLabel -->
    <select :name="name"
            :value="getId(value)"
            @input="selected"
            @focus="onFocus">
        <option
          v-for="option of optionsGrouped[undefined]"
          :key="getId(option)"
          :value="getId(option)"
          :selected="isSelected(option)">{{ getLabel(option) }}</option>
      <!--TODO extract this option thing to a template so we can reuse it-->
      
      <optgroup v-for="optgroup of optgroups"
                :key="getId(optgroup)"
                :label="getLabel(optgroup)">
        <option
          v-for="option of optionsGrouped[optgroup]"
          :key="getId(option)"
          :value="getId(option)"
          :selected="isSelected(option)">{{ getLabel(option) }}</option>
      </optgroup>
    </select>
    
  </builder-label>
</template>

<script>
import _ from "lodash";
import { get } from "../../util";
import { optionsControl } from "./mixins";
import { OrderedDict } from "../../classes/ordered_dict";
import BuilderLabel from "./BuilderLabel";

export default {
  name: "BuilderOptgroupSelect",
  components: { BuilderLabel },
  mixins: [optionsControl([Object, String, Boolean])],
  data() {
    return {
      selected: event => {
        // XXX this is pretty similar to the onInput method, should we just use that instead?
        const val = event.target.value;
        this.$emit("input", get(this.options, val, val));
      }
    };
  },
  props: {
    optgroups: { type: [Array, OrderedDict], required: true },
    optgroupMatcher: { type: [String, Function], required: true } // TODO I bet we can find a decent fallback actually
  },
  computed: {
    optionsGrouped() {
      const groupBy = _.groupBy(this.options, this.optgroupMatcher);
      console.log(groupBy);
      return groupBy;
    }
  },
  methods: {
    isSelected(option) {
      return this.value === option || this.value === this.getId(option);
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/tools";

.form-control select {
  @extend %control;
  @extend %control-border;
  padding: $control-box-spacing; // select seems to have about 2px of side padding built in already
}
</style>
