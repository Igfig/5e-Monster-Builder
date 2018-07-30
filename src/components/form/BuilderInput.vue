<template>
  <div class="form-control">
    <final-field :name="name">
      <builder-label :forInput="props.name" :label="label" :right="labelRight" slot-scope="props">
        <!--suppress HtmlFormInputWithoutLabel -->
        <input :type="type" :name="props.name" :id="props.name" v-on="props.events" :list="datalistId"/><!--FIXME id should really get namespaced somehow. Or at least add a hash?-->

        <datalist v-if="!!options" :id="datalistId">
          <option v-for="option in options">{{getLabel(option)}}</option>
        </datalist>
      </builder-label>
    </final-field>
  </div>
</template>

<script>
import { FinalField } from "vue-final-form";
import BuilderLabel from "./BuilderLabel";
import { get } from "../../util";

export default {
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, default: "text" },
    default: { type: [Object, String] },
    value: { type: [Object, String] }, // this is for things like radios and checkboxes I guess?
    labelRight: { type: Boolean },
    options: { type: [Array, Object] },
    customLabel: { type: Function } // TODO probably remove
  },
  name: "BuilderInput",
  components: { BuilderLabel, FinalField },
  data() {
    return {
      datalistId: `${this.name}-list`,
      //value: this.default || "" // TODO
      getLabel: option => get(option, "label")
    };
  }
};
</script>

<style lang="scss" scoped>
.form-control {
  display: inline-flex;
  flex-flow: row nowrap;
}
</style>
