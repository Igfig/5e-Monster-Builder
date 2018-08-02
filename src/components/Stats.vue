<template>
    <form class="stats">
      <!--TODO unify the various input components by means of mixins-->
      <!--FIXME name and v-model are basically duplicates. Have only one or the other. Maybe by means of slot-scope?-->
      <div>
        <builder-input name="name" v-model="formState.name" label="Name"/>
        <builder-checkbox name="isProperName" v-model="formState.isProperName" label="Proper name" labelRight/> <!--FIXME this seems to only ever return a value of "on", regardless of state-->
      </div>

      <br>

      <div>
        <builder-select name="size" v-model="formState.size" label="Size" :options="SIZES"/>
        <builder-select name="type" v-model="formState.type" label="Type" :options="TYPES"/>
        <builder-input name="subtype" v-model="formState.subtype" label="Subtype" :options="SUBTYPES"/>
      </div>

      <br>

      <builder-radio name="alignment"
                     label="Alignment"
                     v-model="formState.alignment"
                     :options="ALIGNMENTS" />
    </form>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { ALIGNMENTS, SIZES, TYPES, SUBTYPES } from "../constants";
import BuilderInput from "./form/BuilderInput";
import BuilderSelect from "./form/BuilderSelect";
import BuilderRadio from "./form/BuilderRadio";
import BuilderLabel from "./form/BuilderLabel";
import BuilderCheckbox from "./form/BuilderCheckbox";

const DEFAULT_FORM_STATE = {
  alignment: ALIGNMENTS.UNALIGNED,
  size: SIZES.MEDIUM,
  type: TYPES.HUMANOID
};

export default {
  name: "Stats",
  components: {
    BuilderCheckbox,
    BuilderRadio,
    BuilderInput,
    BuilderSelect,
    BuilderLabel
  },
  data() {
    return {
      formState: DEFAULT_FORM_STATE,
      SIZES,
      TYPES,
      SUBTYPES,
      ALIGNMENTS
    };
  },
  computed: mapState(["monster"]),
  methods: {
    updateState(state) {
      console.log("state", state, state.name, state.size);

      // const st = { ...state };
      // console.log(st);
      // this.formState = st;
      console.log("fs", this.formState);
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
