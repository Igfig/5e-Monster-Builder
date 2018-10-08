<template>
  <builder-label :label="label"
                 :right="labelRight">
    <!--suppress HtmlFormInputWithoutLabel -->
    <select :name="name"
            :value="getId(value)"
            @input="selected"
            @focus="onFocus">
      <builder-options :options="optionsGrouped[undefined]" :is-selected="isSelected"/>
      
      <optgroup v-for="optgroup of optgroups"
                :key="getId(optgroup)"
                :label="getLabel(optgroup)">
        <builder-options :options="optionsGrouped[optgroup]" :is-selected="isSelected"/>
      </optgroup>
    </select>
    
  </builder-label>
</template>

<script>
import _ from "lodash";
import { selectControl } from "./mixins";
import { OrderedDict } from "../../classes/ordered_dict";
import BuilderLabel from "./BuilderLabel";
import BuilderOptions from "./BuilderOptions";

export default {
  name: "BuilderOptgroupSelect",
  components: { BuilderLabel, BuilderOptions },
  mixins: [selectControl([Object, String])],
  props: {
    optgroups: { type: [Array, OrderedDict], required: true },
    optgroupMatcher: { type: [String, Function], required: true } // TODO I bet we can find a decent fallback actually, rather than having it be required
  },
  computed: {
    optionsGrouped() {
      return _.groupBy(this.options, this.optgroupMatcher);
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
