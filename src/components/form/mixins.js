import { mapState, mapMutations } from "vuex";
import { get } from "../../util";
import { CURRENT_INFO } from "../../store/keys";
import { SET_CURRENT_INFO } from "../../store/mutations";

export const control = value => ({
  // "value" is an array of the types of values you can model from this kind of control
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    labelRight: Boolean,
    value
  },
  computed: { ...mapState([CURRENT_INFO]) },
  methods: {
    ...mapMutations({ setCurrentInfo: SET_CURRENT_INFO }),
    onInput(event) {
      this.$emit("input", event.target.value);
    },
    onFocus() {
      return this.setCurrentInfo(this.info);
    }
  },
  data() {
    return {
      info: this.$slots.default
    };
  }
});

// a control that can take a list of options, like select, checkboxes, or a datalist. Extends 'control'.
// TODO is there a better way to extend an object/function like this?
export const optionsControl = (value, required = true) => {
  const base = control(value);

  return {
    ...base,
    props: {
      ...base.props,
      optionLabeler: Function,
      options: {
        type: [Array, Object],
        required
      }
    },
    methods: {
      ...base.methods,
      // XXX feel like these methods might be better in computed or data... but I get errors when I put them there. So maybe not
      getId(option) {
        return get(option, "id");
      },
      getLabel(option) {
        return this.optionLabeler ? this.optionLabeler(option) : get(option, "label");
      }
    }
  };
};

export const boxes = {
  props: {
    width: { type: Number, default: 3 }
  },
  data() {
    return {
      styles: { gridTemplateColumns: `repeat(${this.width}, 1fr)` }
    };
  }
};
