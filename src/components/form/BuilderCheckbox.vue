<template>
  <control-info :info="$slots">
    <builder-label :forInput="inputId" :label="label" :right="true">

      <!--suppress HtmlFormInputWithoutLabel -->
      <input :name="name" :id="inputId" type="checkbox"
             :checked="checked" :selected="checked"
             @change="onChange"/> <!--XXX :selected is there since vue doesn't really work with the built-in checked property-->
      <!--XXX wait a second, why don't we wrap it in an input and put a style or prop on the label programmatically instead of making it go through the html's order -->
    </builder-label>
  </control-info>
</template>

<script>
import { control } from "./mixins";
import BuilderLabel from "./BuilderLabel";
import ControlInfo from "../ControlInfo";

export default {
  name: "BuilderCheckbox",
  mixins: [control([String, Object])],
  components: { ControlInfo, BuilderLabel },
  props: {
    checked: Boolean
  },
  model: {
    prop: "checked",
    event: "change"
  },
  computed: {
    inputId() {
      return this.name + (this.value ? "-" + this.value : "");
    }
  },
  methods: {
    onChange(event) {
      this.$emit("change", event.target.checked);
    }
  }
};
</script>
