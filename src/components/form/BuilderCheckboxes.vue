<!--TODO still very incomplete-->

<template>
  <fieldset @change="onChange">
    <legend v-if="!!label">{{label}}</legend>
    <ul>
      <li v-for="option in options">
        <!--FIXME can't get this thing to work. Maybe that's ok though? And we don't need builder-label actually? Hmm-->
        <!--<builder-checkbox :name="name" :label="option.label"
          :value="option.id" :checked="shouldBeChecked(option.id)"/>-->
        
        <label>
          <input :name="name" type="checkbox"
            :value="option.id" :checked="shouldBeChecked(option.id)"/>
          
          {{option.label | capitalize}}
        </label>
      </li>
    </ul>
  </fieldset>
</template>
<script>
import BuilderCheckbox from "./BuilderCheckbox";

export default {
  name: "BuilderCheckboxes",
  components: { BuilderCheckbox },
  props: {
    name: { type: String, required: true },
    label: String,
    options: [Array, Object],
    value: Array
  },
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
    }
  },
  data() {
    return { checkedVals: [] };
  }
};
</script>
