<template>
  <final-form :submit="updateState">
    <form class="stats" slot-scope="props" @input="props.handleSubmit">
      <!--TODO unify the various input components by means of mixins-->

      <div>
        <builder-input name="name" label="Name"/>
        <builder-input name="isProperName" label="Proper name" type="checkbox" labelRight/> <!--FIXME this seems to only ever return a value of "on", regardless of state-->
      </div>

      <br>

      <div>
        <builder-input name="size" label="Size" type="select" :options="SIZES" :default="SIZES.MEDIUM"/>
        <builder-input name="type" label="Type" type="select" :options="TYPES" :default="TYPES.HUMANOID"/>
        <builder-input name="subtype" label="Subtype" :options="SUBTYPES"/>
      </div>

      <br>

      <builder-radio className="alignment"
                     name="alignment"
                     label="Alignment"
                     :options="ALIGNMENTS"
                     :default="ALIGNMENTS.UNALIGNED" />
    </form>
  </final-form>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { FinalForm } from "vue-final-form";
import { ALIGNMENTS, SIZES, TYPES, SUBTYPES } from "../constants";
import BuilderInput from "./form/BuilderInput";
import BuilderRadio from "./form/BuilderRadio";
import BuilderLabel from "./form/BuilderLabel";

export default {
  name: "Stats",
  components: {
    BuilderRadio,
    BuilderInput,
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
  display: contents; // XXX this'll need a fallback

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2px;
    width: 6em;

    // first 9 alignment buttons are in a grid, later ones are full-width
  }
  li {
    display: block;

    &:nth-of-type(n + 10) {
      grid-column: 1 / -1;
    }
    > label {
      display: block;
      margin: 0;
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
}
</style>
