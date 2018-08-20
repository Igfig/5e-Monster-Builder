<template>
  <builder-label :class-name="name" :label="label" :right="labelRight">
    <!--suppress HtmlFormInputWithoutLabel -->
    <input :name="name" :type="type"
           :value="value"
           :list="datalistId"
           @input="onInput" @focus="onFocus"/>

    <datalist :id="datalistId">
      <option v-for="option in options" :data-value="option">{{getLabel(option)}}</option> <!--can't specify values because they show up in the dropdown. Wouldn't really want to anyway, because the input is an arbitrary string. That said TODO have a way to find any additional info for if the subtype does match a list.-->
      <!--Also TODO allow multiselect. There's a neat component out there called v-multiselect that might be appropriate-->
    </datalist>
  </builder-label>
</template>

<script>
import { optionsControl } from "./mixins";
import BuilderLabel from "./BuilderLabel";

export default {
  name: "BuilderDatalist",
  mixins: [optionsControl([Object, String])],
  components: { BuilderLabel },
  props: {
    type: { type: String, default: "text" }
  },
  data() {
    return {
      datalistId: `${this.name}-list`
    };
  }
};
</script>
