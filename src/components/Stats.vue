<template>
    <form class="stats" @input="setMonster(monster)">
      <!--TODO unify the various input components by means of mixins-->
      <!--FIXME name and v-model are basically duplicates. Have only one or the other. Maybe by means of slot-scope?-->
      <div class="form-group">
        <builder-input name="name" v-model="monster.name" label="Name"/>
        <builder-checkbox name="isProperName" v-model="monster.isProperName" label="Proper name" labelRight/>
      </div>

      <div class="form-group">
        <builder-select name="size" v-model="monster.size" label="Size" :options="SIZES"/>
        <builder-select name="type" v-model="monster.type" label="Type" :options="TYPES"/>
        <builder-input name="subtype" v-model="monster.subtype" label="Subtype" :options="SUBTYPES"/>
      </div>

      <builder-radio name="alignment"
                     label="Alignment"
                     v-model="monster.alignment"
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
import { SET_MONSTER } from "../mutations";

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
      SIZES,
      TYPES,
      SUBTYPES,
      ALIGNMENTS
    };
  },
  computed: mapState(["monster"]),
  methods: {
    ...mapMutations({ setMonster: SET_MONSTER })
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
