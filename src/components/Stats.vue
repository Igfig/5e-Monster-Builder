<template>
  <form class="stats">
    <!--FIXME name and v-model are basically duplicates. Have only one or the other. Maybe by means of slot-scope?-->
    <fieldset>
      <builder-input
        v-model="monster.name"
        label="Name">
        Check "Proper Name" if this is a specific, named creature; otherwise leave it alone.
      </builder-input>

      <builder-checkbox
        v-model="monster.isProperName"
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
          label="Size">
          A monster's size affects its base speed, which die it uses for hit dice, and the number of dice of damage it deals with manufactured weapons.
        </builder-select>
        <builder-select
          v-model="monster.type"
          :options="TYPES"
          label="Type">
          A monster's type usually doesn't have a mechanical effect. However, do note that humanoids are rarely larger than Medium, and giants are rarely smaller than Large.
          <!--TODO info on each individual option-->
        </builder-select>
        <builder-datalist
          v-model="monster.subtypes"
          :options="SUBTYPES"
          class="subtypes"
          label="Subtypes"> <!--TODO replace with a multiselect sort of thing-->
        </builder-datalist>
      </fieldset>

      <builder-radio
        v-model="monster.alignment"
        :options="ALIGNMENTS"
        class="alignment"
        label="Alignment" />
    </div>

    <div>
      <fieldset class="abilities">
        <legend>Ability Scores</legend>

        <ul class="form-no_control_margins">
          <li v-for="ability in ABILITIES"
              :key="ability.id">
            <builder-numeric
              :label="ability.label"
              v-model="monster.abilityScores[ability.id].score"
              :min="1"
              :max="30" />
            <output>{{ formatBonus(scoreFor(ability).mod) }}</output>
          </li>
        </ul>

        <!--TODO add expected/actual average ability scores for your cr-->
        <!--or perhaps something more like, your ability scores are typical for a creature of CR X. And then you just compare that to your actual CR.-->
      </fieldset>

      <builder-checkboxes
        v-model="monster.saves"
        :options="ABILITIES"
        :width="ABILITIES.length"
        label="Saving Throw Proficiencies">
        Most monsters don't need any saving throw proficiencies, unless
        <ol class="list-letter">
          <li>it needs to be tough in a specific way that its ability scores don't already reflect. e.g. a weak creature that lives on windy cliffs might be proficient in Strength saves to represent its skill at latching onto surfaces.</li>
          <li>it's an NPC emulating a character class; give it the save proficiencies of the appropriate class.</li>
          <li>it's a boss monster, in which case give it proficiency in any saves it isn't already good at.</li>
        </ol>
      </builder-checkboxes>
    </div>

    <fieldset class="hp">
      <legend>Hit Dice and Hit Points</legend>

      <builder-numeric
        v-model="monster.hd"
        :min="1"
        :default="1"
        label="Hit Dice"/>
      
      <br />
      <div class="form-control">Calculated hit points:&nbsp;<output>{{ monster.hp }}</output></div>
      
      <details>
        <summary>Advanced</summary>
      <builder-checkbox
        v-model="monster.hasMaxHp"
        label="Maximize hp"/>
      <builder-checkbox
        v-model="monster.isInjured"
        label="Injured"
        label-right/>
      </details>
    </fieldset>

    <fieldset class="ac">
      <legend>Armor Class</legend>

      <!--TODO fiddle some more with styling here-->
      
      <builder-optgroup-select
        v-model="monster.armor"
        :options="ARMOR"
        :optgroups="ARMOR_WEIGHTS"
        optgroup-matcher="weight"
        label="Armor"/> <!--TODO some way to handle those cases where unarmored defense actually permits some degree of armour. Like the swashbuckler's Suave Defense.-->
  
      <builder-checkbox
        v-model="monster.hasShield"
        label="Shield"/>
      
      <br />
      <builder-numeric
        v-if="monster.armor === ARMOR.NONE"
        v-model="monster.naturalAC"
        :min="10"
        :default="10"
        label="Natural AC" />
      
      <details>
        <!--FIXME opening this bumps the previous fieldset into a different column, which looks bad. -->
        <summary>Advanced</summary>
      
        <builder-select
          v-model="monster.extraAcAbility"
          :options="acAbilities"
          label="Add ability score to AC:"/>
        <!--TODO invalidate if the selectd ability score is +0 or less-->
        <!--TODO choosing this adds an Unarmored Defense trait-->
        <!--TODO allow custom name for the trait that grants this-->
        <!--TODO dynamically select what types of armour the trait is compatible with, based on what the character is wearing-->
        <!--TODO custom armor weight overide, e.g. for barbarians who could wear a shield but currently aren't-->
        <!--TODO selection of an Unarmored Defense trait on Traits page should update all this-->
        
        <builder-numeric
          v-model="monster.customAC"
          :min="0"
          :default="0"
          label="Custom AC bonus" />
        <!--TODO: if one of these isn't 0/empty, the other has to be too or we'll show a validation error.-->
        <builder-input
          v-model="monster.customAcText"
          label="Custom AC text" />
      </details>
      
    </fieldset>

    <fieldset>
      <legend>Speed</legend>
      <div class="speed form-no_control_margins"> <!--We have this separate div because for some reason fieldset doesn't work right with grids. It just displays everything in one column.-->
        <builder-numeric
          v-model="monster.speed.land"
          :placeholder="monster.size.speed"
          :min="0"
          :step="5"
          label="Land speed"/>

        <builder-numeric
          v-model="monster.speed.fly"
          :min="0"
          :step="5"
          label="Fly"/>
        <builder-checkbox
          v-model="monster.canHover"
          label="Hover"
          class="left"/> <!--"left" as in "left-aligned" TODO generalize -->

        <builder-numeric
          v-model="monster.speed.swim"
          :min="0"
          :step="5"
          label="Swim"/>

        <builder-numeric
          v-model="monster.speed.climb"
          :min="0"
          :step="5"
          label="Climb"/>

        <builder-numeric
          v-model="monster.speed.burrow"
          :min="0"
          :step="5"
          label="Burrow"/>
      </div>
    </fieldset>
    
  </form>
</template>

<script>
import {
  ABILITIES,
  ALIGNMENTS,
  ARMOR,
  ARMOR_WEIGHTS,
  SHIELDS,
  SIZES,
  SUBTYPES,
  TYPES
} from "../constants";
import _ from "lodash";
import { formatBonus, mapStore, scoreFor } from "../util";
import BuilderInput from "./form/BuilderInput";
import BuilderRadio from "./form/BuilderRadio";
import BuilderLabel from "./form/BuilderLabel";
import BuilderSelect from "./form/BuilderSelect";
import BuilderNumeric from "./form/BuilderNumeric";
import BuilderDatalist from "./form/BuilderDatalist";
import BuilderCheckbox from "./form/BuilderCheckbox";
import BuilderCheckboxes from "./form/BuilderCheckboxes";
import BuilderOptgroupSelect from "./form/BuilderOptgroupSelect";
import { MONSTER } from "../store/keys";

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
    BuilderOptgroupSelect,
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
      ARMOR_WEIGHTS,
      SHIELDS
    };
  },
  computed: {
    ...mapStore(MONSTER),
    acAbilities() {
      const filtered = _.without(ABILITIES, ABILITIES.DEX); // removing DEX because that already gets added to AC! We don't want to add it twice
      return [null, ...filtered]; // null for when we don't want to add any abilities to AC
    }
  },
  methods: {
    formatBonus,
    scoreFor,
    weight(value) {
      return value.weight;
    }
  }
};
</script>

<style lang="scss">
@import "../styles/tools/sizes.tools";

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
