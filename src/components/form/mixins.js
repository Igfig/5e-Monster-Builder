import { mapMutations, mapState } from "vuex";
import { findByProperty, get } from "../../util";
import { CURRENT_INFO } from "../../store/keys";
import { SET_CURRENT_INFO } from "../../store/mutations";
import { DEFAULT_INFO_DISPLAY } from "../../constants";

export const control = value => ({
  // "value" is an array of the types of values you can model from this kind of control
  props: {
    name: {
      type: String,
      default() {
        return `${this.$options.name}_${this._uid}`;
      }
    },
    label: { type: String, required: true },
    labelRight: Boolean,
    placeholder: value, // i.e. the placeholder has to be of the same types as the valid values. FIXME this could get a bit weird with controls that take objects and arrays...
    value
  },
  computed: mapState([CURRENT_INFO]),
  methods: {
    ...mapMutations({ setCurrentInfo: SET_CURRENT_INFO }),
    onInput(event) {
      this.$emit("input", event.target.value);
    },
    onFocus(event) {
      this.$emit("focus", event); // just in case we need it for something else
      return this.info
        ? this.setCurrentInfo({ title: this.label, body: this.info })
        : this.setCurrentInfo(DEFAULT_INFO_DISPLAY);
    }
  },
  data() {
    return {
      info: this.$slots.default
    };
  }
});

// a control that can take a list of options, like select, checkboxes, or a datalist. Extends 'control'.
export const optionsControl = (value, required = true) => ({
  mixins: [control(value)],
  props: {
    optionLabeler: Function,
    options: {
      type: [Array, Object],
      required
    }
  },
  methods: {
    // XXX feel like these methods might be better in computed or data... but I get errors when I put them there. So maybe not
    getId(option) {
      return get(option, "id");
    },
    getLabel(option) {
      return this.optionLabeler ? this.optionLabeler(option) : get(option, "label");
    }
  }
});

export const selectControl = value => ({
  mixins: [optionsControl(value)],
  data() {
    return {
      selected: event => {
        const val = event.target.value;
        const trueValue = get(this.options, val, findByProperty(this.options, val));
        this.$emit("input", trueValue);
      }
    };
  },
  methods: {
    isSelected(option) {
      return this.value === option || this.value === this.getId(option);
    }
  }
});

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
