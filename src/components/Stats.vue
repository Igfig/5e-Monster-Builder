<template>
    <form class="stats" @input="setMonster(monster)">
      <!--FIXME name and v-model are basically duplicates. Have only one or the other. Maybe by means of slot-scope?-->
      <fieldset>
        <builder-input name="name" v-model="monster.name" label="Name">
          Check "Proper Name" if this is a specific, named creature; otherwise leave it alone.
        </builder-input>

        <builder-checkbox name="isProperName" v-model="monster.isProperName" label="Proper name" label-right> <!--XXX I guess we don't actually need label-right if our checkboxes are all of the checkless variety... I'm not sure that's actually what I want, though-->
          <p>All this does is add a "the" in front of the monster's name in certain situations, if this is unchecked.</p>
          <p>e.g. <q>...when a creature misses <em>the</em> goblin with an attack...</q> vs <q>...when a creature misses Gorsnak Hogtooth with an attack...</q></p>
        </builder-checkbox>
      </fieldset>
      
      <fieldset>
        <builder-select name="size" v-model="monster.size" label="Size" :options="SIZES"/> <!--FIXME this springs back to Tiny whenever you change it!!-->
        <builder-select name="type" v-model="monster.type" label="Type" :options="TYPES"/>
        <builder-input name="subtype" v-model="monster.subtype" label="Subtype" :options="SUBTYPES"/>
      </fieldset>

      <builder-radio name="alignment"
                     label="Alignment"
                     v-model="monster.alignment"
                     :options="ALIGNMENTS" />

      <fieldset class="abilities"> <!--TODO make a grid-->
        <legend>Ability scores</legend>
        
        <ul>
          <li v-for="(ability, index) in ABILITIES" :key="index">
            <builder-numeric :name="ability.label" :label="ability.label | capitalize"
                             v-model="monster.abilities[index].score"
                             :min="1" :max="30" />
            <output>{{formatBonus(monster.abilities[index].bonus)}}</output>
          </li> <!--FIXME updating Con when we have an hp target doesn't change our number of HD -->
        </ul>
      </fieldset>

      <fieldset>
        <!--TODO better label than "Target hit points"-->
        <builder-numeric name="hp" label="Target hit points"
                         v-model="monster.hpTarget" :min="1" />
        <builder-numeric name="hd" label="Hit Dice" label-right
                         v-model="monster.hd" :min="1" />
        <div>Actual hit points: <output>{{monster.hp}}</output></div>
        <!--TODO grey out (or empty?) whichever input isn't taking the lead right now-->
        <!--TODO if both inputs are empty, actual hp is calculated as NaN-->
      </fieldset>
      
      
      <fieldset>
        <legend>Speed</legend>
        <div class="speed">
          <builder-numeric name="speed" v-model="monster.speed.land" label="Land speed" :min="0" :step="5"/>
          <button class="form-control" type="button" @click="resetSpeed">Reset to default</button>
          
          <builder-numeric name="speed-fly" v-model="monster.speed.fly" label="Fly" :min="0" :step="5"/>
          <builder-checkbox name="canHover" v-model="monster.canHover" label="Hover" class="left"/>
  
          <builder-numeric name="speed-swim" v-model="monster.speed.swim" label="Swim" :min="0" :step="5"/>
  
          <builder-numeric name="speed-burrow" v-model="monster.speed.burrow" label="Burrow" :min="0" :step="5" :style="{gridColumn: 1}"/>
        </div>
      </fieldset>
      
      
      <builder-checkboxes name="saves" v-model="monster.saves" label="Saving Throw Proficiencies" :options="ABILITIES"/>
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
      console.log("reset speed"); // TODO
    }
  }
};
</script>

<style lang="scss">
.stats .alignment {
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
.stats .abilities {
  ul {
    display: inline-grid;
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
  input {
    width: 2.3em;
    flex: 0 0 0;
  }
  output {
    width: 1.7em;
    text-align: left;
  }
}
.stats .speed {
  display: inline-grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 5px;
  justify-items: right;

  .left {
    justify-self: left;
  }
}
</style>
