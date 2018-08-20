<template>
    <fieldset :class="className">
      <legend v-if="!!label">{{label}}</legend>
      <ul>
        <li v-for="option in options"
            class="radio-label">

          <builder-hidden-input-label
              :label="getLabel(option)"
              :checked="checked(option)">

            <!--suppress HtmlFormInputWithoutLabel -->
            <input type="radio" :name="name"
                :checked="checked(option)"
                @input="onInput(option)" @focus="onFocus"
            />
          </builder-hidden-input-label>
        </li>
      </ul>
    </fieldset>
</template>

<script>
import { get } from "../../util";
import { control, options } from "./mixins";
import BuilderHiddenInputLabel from "./BuilderHiddenInputLabel";

export default {
  name: "BuilderRadio",
  mixins: [control([Object, String, Boolean]), options(true)],
  components: { BuilderHiddenInputLabel },
  props: {
    customLabel: { type: Function } // XXX maybe unnecessary
  },
  computed: {
    className() {
      return this.name; // TODO namespace? nah just cut
    }
  },
  methods: {
    onInput(option) {
      this.$emit("input", option);
    },
    // XXX can we rework these so they won't recalculate every time we rerender? Maybe some kind of object dict instead of a function. ...wait it's already just an object, these are just getters basically
    checked(option) {
      return this.value === option;
    }
  },
  data() {
    return {
      getLabel(option) {
        return this.customLabel ? this.customLabel(option) : get(option, "label"); // XXX maybe unnecessary. Or move this to the 'options' mixin?
      }
    };
  }
};
</script>
