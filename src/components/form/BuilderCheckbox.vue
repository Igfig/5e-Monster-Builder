<template>
  <control-info :info="info">
    <builder-hidden-input-label :forInput="inputId" :label="label" :checked="checked">

      <!--suppress HtmlFormInputWithoutLabel -->
      <input :name="name" type="checkbox"
             :id="inputId"
             :checked="checked"
             :selected="checked"
             @change="onChange"/> <!--XXX :selected is there since vue doesn't really work with the built-in checked property-->
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
