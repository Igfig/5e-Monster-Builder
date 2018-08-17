<!--XXX This is mostly used for hidden inputs, where only the label is seen. Unfortunately we can't quite hide the input from here... or at least it'd be a bit complicated. Have another look at the idea later though-->

<template>
  <fragment>
    <slot/>
    <label :class="classObject" :for="forInput">{{ label }}</label>
  </fragment>
</template>

<script>
import { component as Fragment } from "vue-fragments";

export default {
  name: "BuilderLabelSeparate",
  components: { Fragment },
  props: {
    forInput: { type: String }, // TODO perhaps we should just take a boolean or a name, and generate the id ourselves
    className: String,
    label: { type: String, required: true }
  },
  data() {
    return {
      classObject: {
        [this.className]: !!this.className
      }
    };
  }
};
</script>
