<template>
    <form class="stats" @input="setMonster(monster)">
      <!--FIXME name and v-model are basically duplicates. Have only one or the other. Maybe by means of slot-scope?-->
      <fieldset>
        <builder-input name="name" label="Name"
                       v-model="monster.name">
          Check "Proper Name" if this is a specific, named creature; otherwise leave it alone.
        </builder-input>

        <builder-checkbox name="isProperName" label="Proper name"
                          v-model="monster.isProperName"><!--XXX add label-right if we decide to not use the toggle-button format-->
          <p>All this does is add a "the" in front of the monster's name in certain situations, if this is unchecked.</p>
          <p>e.g. <q>...when a creature misses <em>the</em> goblin with an attack...</q> vs <q>...when a creature misses Gorsnak Hogtooth with an attack...</q></p>
        </builder-checkbox>
      </fieldset>

      <div class="form-group">
        <fieldset class="tags">
          <legend>Tags</legend>

          <builder-select name="size" label="Size"
                          v-model="monster.size"
                          :options="SIZES"/>
          <builder-select name="type" label="Type"
                          v-model="monster.type"
                          :options="TYPES"/>
          <builder-input name="subtypes" label="Subtypes"
                         v-model="monster.subtypes"
                         :options="SUBTYPES"/> <!--TODO replace with a multiselect sort of thing-->
        </fieldset>

        <!--TODO the layout between these isn't great still-->

        <builder-radio name="alignment" label="Alignment"
                       v-model="monster.alignment"
                       :options="ALIGNMENTS" />
      </div>

      <div>
        <fieldset class="abilities">
          <legend>Ability Scores</legend>

          <ul>
            <li v-for="(ability, index) in ABILITIES" :key="index">
              <builder-numeric :name="ability.label" :label="ability.label | capitalize"
                               v-model="monster.abilities[index].score"
                               :min="1" :max="30" />
              <output>{{formatBonus(monster.abilities[index].bonus)}}</output>
            </li> <!--FIXME updating Con when we have an hp target doesn't change our number of HD -->
          </ul>

          <!--TODO add expected/actual average ability scores for your cr-->
          <!--or perhaps something more like, your ability scores are typical for a creature of CR X. And then you just compare that to your actual CR.-->
        </fieldset>

        <builder-checkboxes name="saves" label="Saving Throw Proficiencies"
                            v-model="monster.saves"
                            :options="ABILITIES"/>
      </div>

      <fieldset class="hp">
        <legend>Hit Points</legend>

        <!--TODO better label than "Target hit points"-->
        <builder-numeric name="hp" label="Target hit points"
                         v-model="monster.hpTarget" :min="1" />
        <builder-numeric name="hd" label="Hit Dice" label-right
                         v-model="monster.hd" :min="1" />
        <div>Actual hit points: <output>{{monster.hp}}</output></div>
        <!--TODO grey out (or empty?) whichever input isn't taking the lead right now-->
        <!--FIXME if HD input is empty, actual hp is calculated as NaN-->
        <!--TODO HD input should be another in-between number, like target hp. -->
      </fieldset>
      
      
      <fieldset>
        <legend>Speed</legend>
        <div class="speed">
          <builder-numeric name="speed" label="Land speed"
                           v-model="monster.speed.land"
                           :min="0" :step="5"/>
          <button class="form-control" type="button" @click="resetSpeed">Reset to default</button>
          
          <builder-numeric name="speed-fly" label="Fly"
                           v-model="monster.speed.fly"
                           :min="0" :step="5"/>
          <builder-checkbox name="canHover"  label="Hover"
                            v-model="monster.canHover"
                            class="left"/> <!--that's a dumb class make it better-->
  
          <builder-numeric name="speed-swim" label="Swim"
                           v-model="monster.speed.swim" :min="0" :step="5"/>
  
          <builder-numeric name="speed-burrow" label="Burrow"
                           v-model="monster.speed.burrow"
                           :min="0" :step="5"
                           :style="{gridColumn: 1}"/>
        </div>
      </fieldset>
    </form>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { ALIGNMENTS, SIZES, TYPES, SUBTYPES, ABILITIES } from "../constants";
import { formatBonus } from "../util";
import { SET_MONSTER } from "../store/mutations";
import BuilderInput from "./form/BuilderInput";
import BuilderSelect from "./form/BuilderSelect";
import BuilderRadio from "./form/BuilderRadio";
import BuilderLabel from "./form/BuilderLabel";
import BuilderNumeric from "./form/BuilderNumeric";
import BuilderCheckbox from "./form/BuilderCheckbox";
import BuilderCheckboxes from "./form/BuilderCheckboxes";
import ControlInfo from "./ControlInfo";

export default {
  name: "Stats",
  components: {
    ControlInfo,
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
    formatBonus,
    ...mapMutations({ setMonster: SET_MONSTER }),
    resetSpeed: () => {
      console.log("reset speed"); // TODO implement
    }
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
    flex-flow: row nowrap;
  }

  .tags {
    display: flex;
    flex-flow: column nowrap;
    margin-right: 10px;

    label {
      display: inline-flex;
      justify-content: space-between;
      align-items: baseline;
      width: 100%;
    }
    :last-of-type label {
      // FIXME we should really be referring to the .subtypes control by class instead of int his roundabout way... but currently we aren't putting classes on that correctly.
      &,
      input {
        display: block;
      }
    }
  }

  .alignment {
    ul {
      display: inline-grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 2px;
      //width: 7em; // XXX arbitrary

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
      width: 2.3em;
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

    .left {
      justify-self: left;
    }
  }
}
</style>
