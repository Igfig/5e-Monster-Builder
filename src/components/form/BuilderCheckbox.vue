<template>
  <control-info :info="info">
    <builder-hidden-input-label :label="label" :checked="checked">

      <!--suppress HtmlFormInputWithoutLabel -->
      <input :name="name" type="checkbox"
             :value="value"
             :checked="checked"
             @change="onChange"/>
    </builder-hidden-input-label>
  </control-info>
</template>

<script>
import { control } from "./mixins";
import BuilderHiddenInputLabel from "./BuilderHiddenInputLabel";
import ControlInfo from "../ControlInfo";

export default {
  name: "BuilderCheckbox",
  mixins: [control([String, Object])],
  components: { ControlInfo, BuilderHiddenInputLabel },
  props: {
    checked: Boolean
  },
  model: {
    prop: "checked",
    event: "change"
  },
  methods: {
    onChange(event) {
      this.$emit("change", event.target.checked);
    }
  }
};
</script>
