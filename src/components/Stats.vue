<template>
    <form class="stats" @input="setMonster(monster)">
      <!--TODO unify the various input components by means of mixins-->
      <!--FIXME name and v-model are basically duplicates. Have only one or the other. Maybe by means of slot-scope?-->
      <fieldset class="form-group">
        <builder-input name="name" v-model="monster.name" label="Name"/>
        <builder-checkbox name="isProperName" v-model="monster.isProperName" label="Proper name" labelRight/>
      </fieldset>

      <fieldset class="form-group">
        <builder-select name="size" v-model="monster.size" label="Size" :options="SIZES"/> <!--FIXME this springs back to Tiny whenever you change it!!-->
        <builder-select name="type" v-model="monster.type" label="Type" :options="TYPES"/>
        <builder-input name="subtype" v-model="monster.subtype" label="Subtype" :options="SUBTYPES"/>
      </fieldset>

      <builder-radio name="alignment"
                     label="Alignment"
                     v-model="monster.alignment"
                     :options="ALIGNMENTS" />

      <fieldset class="form-group"> <!--TODO make a grid-->
        <ul>
          <li v-for="(ability, index) in ABILITIES" :key="index">
            <builder-numeric :name="ability.label" :label="ability.label | capitalize"
                             v-model="monster.abilities[index].score"
                             :min="1" :max="30" :step="1"/>
          </li>
        </ul>
      </fieldset>


      <fieldset class="form-group">
        <builder-numeric name="speed" v-model="monster.speed.land" label="Speed" :min="0" :step="5"/>
        <button class="form-control" @click="resetSpeed">Reset to default</button>

        <br>

        <builder-numeric name="speed-fly" v-model="monster.speed.fly" label="Fly" :min="0" :step="5"/>
        <builder-checkbox name="canHover" v-model="monster.speed.canHover" label="Hover"/>

        <br>

        <builder-numeric name="speed-swim" v-model="monster.speed.swim" label="Swim" :min="0" :step="5"/>

        <br>

        <builder-numeric name="speed-burrow" v-model="monster.speed.burrow" label="Burrow" :min="0" :step="5"/>
      </fieldset>
      
      
      <builder-checkboxes name="saves" v-model="monster.saves" label="Saving Throw Proficiencies" :options="ABILITIES"/>
    </form>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { ALIGNMENTS, SIZES, TYPES, SUBTYPES, ABILITIES } from "../constants";
import BuilderInput from "./form/BuilderInput";
import BuilderSelect from "./form/BuilderSelect";
import BuilderRadio from "./form/BuilderRadio";
import BuilderLabel from "./form/BuilderLabel";
import BuilderCheckbox from "./form/BuilderCheckbox";
import { SET_MONSTER } from "../mutations";
import BuilderNumeric from "./form/BuilderNumeric";
import BuilderCheckboxes from "./form/BuilderCheckboxes";

export default {
  name: "Stats",
  components: {
    BuilderCheckboxes,
    BuilderNumeric,
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
      ALIGNMENTS,
      ABILITIES
    };
  },
  computed: mapState(["monster"]),
  methods: {
    resetSpeed: () => {
      console.log("reset speed"); // TODO
    },
    ...mapMutations({ setMonster: SET_MONSTER })
  }
};
</script>

<style lang="scss">
.stats .alignment {
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
