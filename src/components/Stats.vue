<template>
    <form class="stats">
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
          <builder-datalist name="subtypes" label="Subtypes"
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
                            :options="ABILITIES"
                            :width="ABILITIES.length"/>
      </div>

      <fieldset class="hp">
        <legend>Hit Points</legend>

        <!--TODO better label than "Target hit points"-->
        <builder-numeric name="hp" label="Target hit points"
                         v-model="hpTarget" :min="1" :placeholder="monster.hp"
                         @focus="focusHp" @input="inputHp"/>
        <!--TODO would be nice if clicking up and down started us from the values marked in the placeholders instead of 0-->
        <builder-numeric name="hd" label="Hit Dice" label-right
                         v-model="hdSet" :min="1" :placeholder="monster.hd"
                         @focus="focusHd" @input="inputHd"/>
        <!--FIXME if HD input is empty, actual hp is calculated as NaN-->

        <div>
          <builder-checkbox name="hasMaxHp" label="Maximize hp"
                            v-model="monster.hasMaxHp"/>
          <builder-checkbox name="isInjured" label="Injured" label-right
                            v-model="monster.isInjured"/>
        </div>

        <div>Actual hit points: <output>{{monster.hp}}</output></div>
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
import { mapMutations, mapState } from "vuex";
import { ABILITIES, ALIGNMENTS, SIZES, SUBTYPES, TYPES } from "../constants";
import { MONSTER } from "../store/keys";
import { formatBonus } from "../util";
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
      hpTarget: undefined,
      hdSet: 1, // TODO better name, this one invites confusion with the setHd method
      hpTargetActive: false // we use this to tell which of hpTarget and hdSet was manually updated. The other will be automatically updated as a result of the first one's update, and we don't want that to roll back around and hit the first one again.
    };
  },
  computed: {
    ...mapState([MONSTER])
  },
  watch: {
    hpTarget: function(val) {
      if (this.hpTargetActive) {
        this.hdSet = undefined;
        this.setHd(Math.max(1, Math.round(val / this.monster.hpPerHd()))); // TODO copied from monster.set:hpTarget, needs to be unified somehow
      }
    },
    hdSet: function(val) {
      if (!this.hpTargetActive) {
        this.hpTarget = undefined;
        this.setHd(val);
      }
    }
  },
  methods: {
    formatBonus,
    /*getHd() {
      return this.hdSet || this.hpTarget;
    },*/
    ...mapMutations({
      setHd: "monster/hd" // TODO extract to constants
    }),
    focusHp(e) {
      console.log("hpf", "[", e.target.value, "]");
      if (!this.hpTargetActive) {
        console.log("fhp");
        // we're switching from specifying HD to hp
        this.hpTargetActive = true;
        // so set the value to current hp
        this.hpTarget = this.monster.hp;
        // and then the watcher will take care of the rest
      }
    },
    focusHd(e) {
      console.log("hdf", "[", e.target.value, "]");
      if (this.hpTargetActive) {
        console.log("fhd");
        // we're switching from specifying hp to HD
        this.hpTargetActive = false;
        // so set the value to current HD
        this.hdSet = this.monster.hd;
        // and then the watcher will take care of the rest
      }
    },
    inputHp(val) {
      console.log("hpi", val, this.monster.hp, this.hpTarget);
      if (!this.hpTargetActive) {
        console.log("ihp");
        // we're switching from specifying HD to hp
        this.hpTargetActive = true;
        // so set the value to current hp
        this.hpTarget = this.monster.hp;
        // and then the watcher will take care of the rest
      }
    },
    inputHd(val) {
      console.log("hdi", val, this.monster.hd, this.hdSet);
      if (this.hpTargetActive) {
        console.log("ihd");
        // we're switching from specifying hp to HD
        this.hpTargetActive = false;
        // so set the value to current HD
        this.hdSet = this.monster.hd;
        // and then the watcher will take care of the rest
      }
    },
    resetSpeed() {
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
      //width: 7em; // XXX arbitrary
      // first 9 alignment buttons are in a grid, later ones are full-width
    }
    li {
      &:nth-of-type(n + 10) {
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
