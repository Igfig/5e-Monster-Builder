<template>
  <final-field :name="name">
    <builder-label :forInput="props.name" :label="label" :right="labelRight" slot-scope="props">
      <!--suppress HtmlFormInputWithoutLabel -->
      <input :type="type" :name="props.name" :id="props.name" v-on="props.events" />
      <!--FIXME id should really get namespaced somehow. Or at least add a hash?-->
    </builder-label>
  </final-field>
</template>

<script>
import { FinalField } from "vue-final-form";
import BuilderLabel from "./BuilderLabel";

export default {
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, required: true },
    default: { type: [Object, String] },
    value: { type: [Object, String] },
    labelRight: { type: Boolean }
  },
  name: "BuilderInput",
  components: { BuilderLabel, FinalField },
  data() {
    return {
      //value: this.default || ""
    };
  }
};
</script>
