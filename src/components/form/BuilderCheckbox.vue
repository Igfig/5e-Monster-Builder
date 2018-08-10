<template>
  <div class="form-control">
    <builder-label :forInput="inputId" :label="label" :right="true">

      <!--suppress HtmlFormInputWithoutLabel -->
      <input :name="name" :id="inputId" type="checkbox"
             :checked="checked" :selected="checked"
             @change="onChange"/> <!--XXX :selected is there since vue doesn't really work with the built-in checked property-->
    </builder-label>
  </div>
</template>

<script>
import BuilderLabel from "./BuilderLabel";
import { control } from "./mixins";

export default {
  name: "BuilderCheckbox",
  mixins: [control([String, Object])],
  components: { BuilderLabel },
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
