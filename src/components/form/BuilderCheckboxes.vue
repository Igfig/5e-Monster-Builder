<template>
  <fieldset @change="onChange">
    <legend v-if="!!label">{{label}}</legend>
    <control-info :info="info">
    <ul class="checkboxes">
      <li class="form-control" v-for="option in options">
        <!--FIXME can't get this thing to work. Maybe that's ok though? And we don't need builder-label actually? Hmm-->
        <!--<builder-checkbox :name="name" :label="option.label"
          :value="option.id" :checked="shouldBeChecked(option.id)"/>-->
  
        <builder-hidden-input-label
          :label="option.label | capitalize"
          :checked="shouldBeChecked(option.id)">
          
          <!--suppress HtmlFormInputWithoutLabel -->
          <input :name="name" type="checkbox"
            :value="option.id"
            :checked="shouldBeChecked(option.id)"
            :selected="shouldBeChecked(option.id)"/>
        </builder-hidden-input-label>
      </li>
    </ul>
    </control-info>
  </fieldset>
</template>

<script>
import { control, options } from "./mixins";
import BuilderCheckbox from "./BuilderCheckbox";
import BuilderHiddenInputLabel from "./BuilderHiddenInputLabel";
import ControlInfo from "../ControlInfo";

export default {
  name: "BuilderCheckboxes",
  mixins: [control(Array), options(true)],
  components: { ControlInfo, BuilderCheckbox, BuilderHiddenInputLabel },
  model: {
    prop: "checkedVals",
    event: "change"
  },
  methods: {
    onChange(event) {
      const { checked, value: key } = event.target;

      if (checked) {
        this.checkedVals.push(key);
      } else {
        this.checkedVals.splice(this.checkedVals.indexOf(key), 1);
      }

      /*
      // turn the unsorted list of ids into a sorted list of objects
       // TODO there is probably a more efficient way to do this.
       // XXX Also we don't always need it sorted now that I think about it? So commenting out
      const result = Object.keys(this.options)
        .filter(k => this.checkedVals.includes(k))
        .map(k => this.options[k]);*/

      this.$emit("change", this.checkedVals);
    },
    shouldBeChecked(key) {
      return this.checkedVals.includes(key);
    },
    getId(option) {
      return this.name + "-" + option.id;
    }
  },
  data() {
    return { checkedVals: [] };
  }
};
</script>

<style lang="scss">
.checkboxes {
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr); // FIXME this is only really valid in some cases
  grid-gap: 2px;

  > .form-control {
    margin: 0;
  }

  label {
    width: 100%;
  }
}
</style>
