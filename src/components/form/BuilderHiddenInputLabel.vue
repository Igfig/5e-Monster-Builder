<template>
    <label :class="classObject" :checked="checked">
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
    className: String,
    label: { type: String, required: true },
    checked: { type: Boolean }
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
// TODO extract constants

$input-font-size: 0.9rem; //14px;

$crimson: #a11111;

$base-colour: black;
$selected-colour: $crimson;

%focus {
  // TODO unify with same mixin in App.vue
  outline: $crimson auto 5px; // XXX could maybe be made better?
}

.label-hidden_input {
  box-sizing: border-box;
  margin: 0;
  padding: 2px 4px;
  border: 1px solid $base-colour;
  color: $base-colour;
  text-align: center;
  font-size: $input-font-size;

  // &:active, //FIXME flickers a bit when you release a click
  &[checked] {
    background-color: $selected-colour;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4); //XXX not certain about this
    color: white;
  }

  &:focus-within {
    // TODO fallback or shim for browsers that don't support this selector
    @extend %focus;
  }

  ul & {
    //TODO maybe this should go elsewhere?
    padding: 5px;
  }

  input {
    //display: none;
    //visibility: hidden !important;
    height: 0 !important;
    width: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    position: absolute !important; // without this there's still space assigned
  }
}
</style>
