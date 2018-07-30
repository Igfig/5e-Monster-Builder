<template>
  <div class="form-control">
    <final-field :name="name">
      <builder-label :forInput="inputId" :label="label" :right="labelRight" slot-scope="props">
        <fragment v-if="isSelect">
          <!--suppress HtmlFormInputWithoutLabel -->
          <select :name="name" :id="inputId" v-model="value" v-on="props.events"> <!--XXX should we really be using v-model here? Or alternatively, can we use that and skip v-on?-->
            <option v-for="option in options" :value="option">{{getLabel(option)}}</option>
          </select>
        </fragment>

        <fragment v-else>
          <!--suppress HtmlFormInputWithoutLabel -->
          <input :type="type" :name="props.name" :id="inputId" v-on="props.events" :list="datalistId"/>
          <datalist v-if="showDatalist" :id="datalistId">
            <option v-for="option in options">{{getLabel(option)}}</option> <!--XXX have to use the option key rather than its value proper (an object), because the value shows up in the dropdown.-->
            <!--TODO make sure the output is the actual value object, not the key-->
          </datalist>
        </fragment>
      </builder-label>
    </final-field>
  </div>
</template>

<script>
import { component as Fragment } from "vue-fragments";
import { FinalField } from "vue-final-form";
import BuilderLabel from "./BuilderLabel";
import { get } from "../../util";

export default {
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, default: "text" },
    default: { type: [Object, String], default: "" },
    labelRight: { type: Boolean },
    options: { type: [Array, Object] },
    customLabel: { type: Function } // TODO probably remove
  },
  name: "BuilderInput",
  components: { BuilderLabel, FinalField, Fragment },
  data() {
    return {
      value: this.default || "", // TODO are you sure this works right
      inputId: this.name, // TODO should really get namespaced somehow. Or at least add a hash?
      datalistId: `${this.name}-list`,
      showDatalist: this.type !== "select" && !!this.options,
      isSelect: this.type === "select",
      getLabel: option => (this.customLabel ? this.customLabel(option) : get(option, "label"))
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
