<template>
  <div class="form-control">
    <builder-label :forInput="inputId" :label="label" :right="labelRight">

      <!--suppress HtmlFormInputWithoutLabel -->
      <input :name="name" :id="inputId" type="checkbox"
             :checked="checked"
             @change="onChange"/>
    </builder-label>
  </div>
</template>

<script>
import BuilderLabel from "./BuilderLabel";

export default {
  name: "BuilderCheckbox",
  props: {
    name: { type: String, required: true },
    option: { type: String },
    label: { type: String, required: true },
    labelRight: { type: Boolean },
    checked: Boolean,
    value: String
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
  components: { BuilderLabel },
  methods: {
    onChange(event) {
      this.$emit("change", event.target.checked);
    }
  }
};
</script>
