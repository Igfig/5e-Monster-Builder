<template>
  <fragment>
    <option v-for="option of options"
            :key="get(option)"
            :value="get(option)"
            :selected="isSelected(option)">{{ getLabel(option) }}
    </option>
  </fragment>
</template>

<script>
import { component as Fragment } from "vue-fragments";
import { get, getLabel } from "../../util";

export default {
  name: "BuilderOptions",
  components: { Fragment },
  props: {
    options: {
      type: Array,
      required: true
    },
    isSelected: { type: Function, required: true }
  },
  methods: { get, getLabel }
};
</script>
