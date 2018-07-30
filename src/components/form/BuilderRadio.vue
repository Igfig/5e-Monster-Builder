<template>
  <fieldset :class="className">
    <legend v-if="!!label">{{label}}</legend>
    <ul>
      <li v-for="option in options"
          :key="get(option)">
        <builder-label
            :forInput="getId(option)"
            :label="getLabel(option)">
          <!--suppress HtmlFormInputWithoutLabel -->
          <input
              type="radio"
              :name="name"
              :id="getId(option)"
              :value="option"
              :selected="get(option) === get(value)"
              v-model="value"
          /> <!--TODO find a way to work with the built-in :checked selector-->
        </builder-label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
import BuilderLabel from "./BuilderLabel";
import { get } from "../../util";

export default {
  name: "BuilderRadio",
  props: {
    className: { type: String },
    name: { type: String, required: true },
    label: { type: String },
    options: { type: [Array, Object], required: true },
    default: { type: [String, Object] },
    labelRight: { type: Boolean },
    customLabel: { type: Function }
  },
  components: { BuilderLabel },
  data() {
    return {
      value: this.default || "",
      get,
      getId: option => {
        return this.name + "-" + this.get(option).toLowerCase();
      },
      getLabel: option => (this.customLabel ? this.customLabel(option) : get(option, "label"))
    };
  }
};
</script>

<style lang="scss" scoped>
input {
  display: none;
}
</style>
