<template>
  <final-form :submit="updateState">
    <form class="stats" slot-scope="props" @input="props.handleSubmit">
      <!--TODO unify the various input components by means of mixins-->

      <div>
        <builder-input name="name" label="Name" type="text"/>
        <builder-input name="isProperName" label="Proper name" type="checkbox" labelRight/> <!--FIXME this seems to only ever return a value of "on", regardless of state-->
      </div>

      <br>

      <builder-select name="size" label="Size" :options="SIZES" :default="SIZES.MEDIUM"/>
      <builder-select name="type" label="Type" :options="TYPES" :default="TYPES.HUMANOID"/>
      <builder-datalist name="subtype" label="Subtype" :options="SUBTYPES"/>

      <br>

      <builder-radio className="alignment"
                     name="alignment"
                     :options="ALIGNMENTS"
                     :default="ALIGNMENTS.UNALIGNED"
                     :customLabel="option => option.label || option"/>
    </form>
  </final-form>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { FinalForm } from "vue-final-form";
import { ALIGNMENTS, SIZES, TYPES, SUBTYPES } from "../constants";
import BuilderInput from "./form/BuilderInput";
import BuilderSelect from "./form/BuilderSelect";
import BuilderRadio from "./form/BuilderRadio";
import BuilderDatalist from "./form/BuilderDatalist";
import BuilderLabel from "./form/BuilderLabel";

export default {
  name: "Stats",
  components: {
    BuilderRadio,
    BuilderSelect,
    BuilderInput,
    BuilderDatalist,
    BuilderLabel,
    FinalForm
  },
  data() {
    return { formState: {}, SIZES, TYPES, SUBTYPES, ALIGNMENTS };
  },
  computed: mapState(["monster"]),
  methods: {
    updateState(state) {
      console.log("state", state, state.name);
      this.formState = state;
      // TODO update the store with these values. Don't really need the separate formState, actually...
    },
    ...mapMutations([]) // TODO
  }
};
</script>
<style lang="scss">
.stats .alignment {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 6em;

  // first 9 alignment buttons are in a grid, later ones are full-width
  > :nth-of-type(n + 10) {
    grid-column: 1 / -1;
  }

  html.no-cssgrid & {
    display: flex;
    flex-flow: row wrap;

    width: 7em;
    > label {
      flex: 1 1 30%;
    }
  }
}
</style>
