export const control = value => ({
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    labelRight: Boolean,
    value
  }
});
export const options = (required = false) => ({
  props: {
    options: {
      type: [Array, Object],
      required
    }
  }
});
