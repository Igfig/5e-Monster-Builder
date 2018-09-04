<template>
  <label
    :class="classObject"
    :checked="checked">
    {{ label }}
    <slot/>
  </label>

</template>

<script>
import { component as Fragment } from "vue-fragments";

export default {
  name: "BuilderHiddenInputLabel",
  components: { Fragment },
  props: {
    className: { type: String, default: null },
    label: { type: String, required: true },
    checked: { type: Boolean, default: false }
  },
  data() {
    return {
      classObject: {
        "form-control": true,
        "label-hidden_input": true,
        [this.className]: !!this.className
      }
    };
  }
};
</script>

<style lang="scss">
@import "../../styles/tools";

.label-hidden_input {
  @extend %pressable-control;

  &:focus-within {
    // so that when the invisible input inside this gets focused, this does too
    // TODO fallback or shim for browsers that don't support this selector
    @extend %control-focus;
  }

  ul & {
    //TODO maybe this should go elsewhere?
    padding: 5px;
  }

  input {
    // make it effectively invisible while still showing up on screen readers
    height: 0 !important;
    width: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    position: absolute !important; // without this there's still space assigned
  }
}
</style>
