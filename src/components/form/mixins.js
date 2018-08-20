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
      info: this.$slots.default,
      // XXX should these methods be methods or computed or data or what? I'm not really clear on the difference
      getId(option) {
        return get(option, "id");
      },
      getLabel(option) {
        return get(option, "label");
      }
    }; // XXX Ditto on whether this should be elsewhere
  }
});

// a control that can take a list of options, like select, checkboxes, or a datalist
export const options = (required = false) => ({
  // XXX maybe required should be true by default? Not sure why else you'd use it after all
  props: {
    options: {
      type: [Array, Object],
      required
    }
  }
});
