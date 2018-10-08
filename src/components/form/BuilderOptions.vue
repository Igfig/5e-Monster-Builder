<template>
  <option v-for="option of options"
          :key="getId(option)"
          :value="getId(option)"
          :selected="isSelected">{{ getLabel(option) }}
  </option>
</template>

<script>
export default {
  name: "BuilderOptions",
  props: {
    options: { type: Array, required: true },
    isSelected: { type: Function, required: true }
  }
};
</script>
