<template>
  <control-info :info="info">
    <builder-label :forInput="inputId" :label="label">
      <!--suppress HtmlFormInputWithoutLabel -->
      <input :name="name" :id="inputId"
             :type="type" :value="value"
             :list="datalistId" @input="onInput"/>

      <datalist v-if="!!datalistId" :id="datalistId">
        <option v-for="option in options" :data-value="option">{{get(option, "label")}}</option> <!--can't specify values because they show up in the dropdown. Wouldn't really want to anyway, because the input is an arbitrary string. That said TODO have a way to find any additional info for if the subtype does match a list.-->
        <!--Also TODO allow multiselect. There's a neat component out there called v-multiselect that might be appropriate-->
      </datalist>
    </builder-label>
  </control-info>
</template>

<script>
import { component as Fragment } from "vue-fragments";
import { get } from "../../util";
import BuilderLabel from "./BuilderLabel";
import { control, options } from "./mixins";
import ControlInfo from "../ControlInfo";

export default {
  name: "BuilderInput",
  mixins: [control([Object, String]), options()],
  components: { ControlInfo, BuilderLabel, Fragment },
  props: {
    type: { type: String, default: "text" }
  },
  computed: {
    inputId() {
      // TODO should really get namespaced somehow. Or at least add a hash?
      return this.name;
    }
  },
  methods: {
    get,
    onInput(event) {
      this.$emit("input", event.target.value);
    }
  },
  data() {
    return {
      datalistId: this.options ? `${this.name}-list` : undefined
    };
  }
};
</script>
