<template>
  <builder-label :forInput="name" :label="label" :right="labelRight">
    <input :type="type" :name="name" :id="name" v-model="value" />
  </builder-label>
</template>

<script>
import BuilderLabel from "./BuilderLabel";

export default {
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, required: true },
    default: { type: [Object, String] },
    labelRight: { type: Boolean }
  },
  name: "BuilderInput",
  components: { BuilderLabel },
  data() {
    return {
      value: this.default || ""
    };
  }
};
</script>
