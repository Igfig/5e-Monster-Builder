export const control = value => ({
  // "value" is an array of the types of values you can model from this kind of control
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    labelRight: Boolean,
    value
  },
  data() {
    return { info: this.$slots.default }; // XXX or should this be computed or something? I don't fully get the difference.
  }
});

// a control that can take a list of options, like select, checkboxes, or a datalist
export const options = (required = false) => ({
  props: {
    options: {
      type: [Array, Object],
      required
    }
  }
});
