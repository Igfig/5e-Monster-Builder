<template>
  <form class="stats">
    <!--FIXME name and v-model are basically duplicates. Have only one or the other. Maybe by means of slot-scope?-->
    <fieldset>
      <builder-input
        v-model="monster.name"
        name="name"
        label="Name">
        Check "Proper Name" if this is a specific, named creature; otherwise leave it alone.
      </builder-input>

      <builder-checkbox
        v-model="monster.isProperName"
        name="isProperName"
        label="Proper name"><!--XXX add label-right if we decide to not use the toggle-button format-->
        <p>All this does is add a "the" in front of the monster's name in certain situations, if this is unchecked.</p>
        <p>e.g. <q>...when a creature misses <em>the</em> goblin with an attack...</q> vs <q>...when a creature misses Gorsnak Hogtooth with an attack...</q></p>
      </builder-checkbox>
    </fieldset>

    <div class="form-group">
      <fieldset class="tags">
        <legend>Tags</legend>

        <builder-select
          v-model="monster.size"
          :options="SIZES"
          name="size"
          label="Size"/>
        <builder-select
          v-model="monster.type"
          :options="TYPES"
          name="type"
          label="Type"/>
        <builder-datalist
          v-model="monster.subtypes"
          :options="SUBTYPES"
          name="subtypes"
          label="Subtypes"/> <!--TODO replace with a multiselect sort of thing-->
      </fieldset>

      <builder-radio
        v-model="monster.alignment"
        :options="ALIGNMENTS"
        name="alignment"
        label="Alignment" />
    </div>

    <div>
      <fieldset class="abilities">
        <legend>Ability Scores</legend>

        <ul class="form-no_control_margins">
          <li
            v-for="(ability, index) in ABILITIES"
            :key="index">
            <builder-numeric
              :name="ability.label | lowercase"
              :label="ability.label"
              v-model="monster.abilities[index].score"
              :min="1"
              :max="30" />
            <output>{{ formatBonus(monster.abilities[index].mod) }}</output>
          </li> <!--FIXME updating Con when we have an hp target doesn't change our number of HD -->
        </ul>

        <!--TODO add expected/actual average ability scores for your cr-->
        <!--or perhaps something more like, your ability scores are typical for a creature of CR X. And then you just compare that to your actual CR.-->
      </fieldset>

      <builder-checkboxes
        v-model="monster.saves"
        :options="ABILITIES"
        :width="ABILITIES.length"
        name="saves"
        label="Saving Throw Proficiencies"/>
    </div>

    <fieldset class="hp">
      <legend>Hit Dice and Hit Points</legend>

      <builder-numeric
        v-model="monster.hd"
        :min="1"
        :default="1"
        name="hd"
        label="Hit Dice"/>

      <builder-checkbox
        v-model="monster.hasMaxHp"
        name="hasMaxHp"
        label="Maximize hp"/>
      <builder-checkbox
        v-model="monster.isInjured"
        name="isInjured"
        label="Injured"
        label-right/>

      <div>Calculated hit points: <output>{{ monster.hp }}</output></div>
    </fieldset>

    <fieldset class="ac">
      <legend>Armor Class</legend>
      <!--TODO highlight the one of the two that's currently the best-->
      <builder-numeric
        v-model="monster.naturalAC"
        :min="10"
        :default="10"
        name="naturalAC"
        label="Natural Base AC"/>
      <br>

      <builder-select
        v-model="monster.armor"
        :options="ARMOR"
        name="armor"
        label="Armor"/> <!--TODO something with optgroups-->
      <builder-select
        v-model="monster.shield"
        :options="SHIELDS"
        name="shield"
        label="Shield"
        label-right/> <!--XXX wondering if this should actually be a checkbox? Or some kind of custom input... I'm just wondering about how I'd build the Fire Giant Juggernaut with its double shields.-->
    </fieldset>

    <fieldset>
      <legend>Speed</legend>
      <div class="speed form-no_control_margins"> <!--We have this separate div because for some reason fieldset doesn't work right with grids. It just displays everything in one column.-->
        <builder-numeric
          v-model="landSpeed"
          :placeholder="monster.size.speed"
          :min="0"
          :step="5"
          name="speed"
          label="Land speed"/>

        <builder-numeric
          v-model="monster.speed.fly"
          :min="0"
          :step="5"
          name="speed-fly"
          label="Fly"/>
        <builder-checkbox
          v-model="monster.canHover"
          name="canHover"
          label="Hover"
          class="left"/> <!--"left" as in "left-aligned" TODO generalize -->

        <builder-numeric
          v-model="monster.speed.swim"
          :min="0"
          :step="5"
          name="speed-swim"
          label="Swim"/>

        <builder-numeric
          v-model="monster.speed.climb"
          :min="0"
          :step="5"
          name="speed-climb"
          label="Climb"/>

        <builder-numeric
          v-model="monster.speed.burrow"
          :min="0"
          :step="5"
          name="speed-burrow"
          label="Burrow"/>
      </div>
    </fieldset>
  </form>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { ABILITIES, ALIGNMENTS, ARMOR, SHIELDS, SIZES, SUBTYPES, TYPES } from "../constants";
import { keys } from "../store/monster/index";
import { formatBonus, mapVuexMap } from "../util";
import BuilderInput from "./form/BuilderInput";
import BuilderDatalist from "./form/BuilderDatalist";
import BuilderSelect from "./form/BuilderSelect";
import BuilderRadio from "./form/BuilderRadio";
import BuilderLabel from "./form/BuilderLabel";
import BuilderNumeric from "./form/BuilderNumeric";
import BuilderCheckbox from "./form/BuilderCheckbox";
import BuilderCheckboxes from "./form/BuilderCheckboxes";

export default {
  name: "Stats",
  components: {
    BuilderCheckboxes,
    BuilderNumeric,
    BuilderCheckbox,
    BuilderRadio,
    BuilderInput,
    BuilderDatalist,
    BuilderSelect,
    BuilderLabel
  },
  data() {
    return {
      SIZES,
      TYPES,
      SUBTYPES,
      ALIGNMENTS,
      ABILITIES,
      ARMOR,
      SHIELDS,
      landSpeed: undefined
    };
  },
  computed: {
    ...mapVuexMap(mapState, keys.monster)
  },
  watch: {
    landSpeed() {
      this[keys.monster.speed.land](this.landSpeed);
    }
  },
  methods: {
    formatBonus,
    ...mapVuexMap(mapMutations, keys.monster.speed.land) // TODO hook up all the controls to mutations properly
  }
};
</script>

<style lang="scss">
$column-width: 330px;

//TODO make properly responsive

.stats {
  column-width: $column-width; // XXX kinda tempted to turn this into a grid layout with grid-auto-flow: dense just to fit it all efficiently

  > * {
    break-inside: avoid;
  }

  .form-group {
    display: flex;
    flex-flow: row wrap;
  }

  .tags {
    display: flex;
    flex-flow: column nowrap;
    margin-right: 20px; // XXX arbitrary

    label {
      display: inline-flex;
      justify-content: space-between;
      align-items: baseline;
      width: 100%;
    }
  }

  .subtypes {
    flex-flow: column nowrap;
    input {
      width: 100%;
    }
  }

  .alignment {
    ul {
      border-radius: 0.7em;
      overflow: hidden;

      html.no-cssgrid & {
        display: flex;
        flex-flow: row wrap;
        width: 7em;

        li {
          flex: 1 1 30%;
        }
      }
    }
    li {
      // first 9 alignment buttons are in a grid, later ones are full-width
      &:nth-of-type(n + 10) {
        grid-column: 1 / -1;
      }
    }
    label {
      padding-top: 7px;
      padding-bottom: 7px;
    }
  }

  .abilities {
    ul {
      display: inline-grid;
      //display: flex;
      //flex-flow: row nowrap;
      grid-template-columns: repeat(3, auto);
      text-align: right;
      grid-gap: 5px 10px;
    }
    li {
      display: grid;
      grid-template-columns: 1fr 1.7em;
      align-items: baseline;
      justify-content: end;
    }
    .form-control {
      display: flex;
      align-items: baseline;
      justify-content: flex-end;
      margin-right: 5px;
    }
    label {
      display: flex;
      align-items: baseline;
    }
    input {
      flex: 0 0 0;
    }
    output {
      width: 1.7em;
      text-align: left;
    }
  }

  .speed {
    display: inline-grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 5px;
    justify-items: right;

    input[type="number"] {
      width: 3.1em; //XXX arbitrary, but enough for 3 digits in this font.
    }

    > label {
      grid-column: 1;
    }
    .left {
      grid-column: 2;
      justify-self: left;
    }
  }
}
</style>
