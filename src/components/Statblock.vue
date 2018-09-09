<template>
  <figure class="statblock"> <!--XXX not 100% sure that this is a figure... could be an article, or an article in a figure-->
    <h3 class="monster-name">{{ monster.name | capitalize }}<span v-if="!monster.name">New Monster</span>
    </h3>

    <p>{{ monster.size.label | capitalize }} {{ getLabel(monster.type) }}<span v-if="!!monster.subtypes">
      ({{ getLabel(monster.subtypes) }})</span>, <!--FIXME should really support multiple subtypes-->{{ monster.alignment.text | lowercase }}
    </p>

    <hr>

    <dl>
      <div>
        <dt>Armor Class</dt>
        <dd>{{ monster.ac }}
        <span v-if="monster.armor.text">({{ monster.armor.text }})</span></dd> <!--TODO include other sources, like the shield or natural.-->
      </div>

      <div>
        <dt>Hit Points</dt>
        <dd>{{ monster.hp }} ({{ monster.hd }}d{{ monster.size.hd }}<span v-if="monster.abilities.CON.mod !== 0">{{ formatBonus(monster.hd * monster.abilities.CON.mod) }}</span>)
        </dd>
      </div>

        <div>
        <dt>Speed</dt>
        <dd>{{ monster.speed.land }} ft.
          <span v-if="monster.speed.burrow">, burrow {{ monster.speed.burrow }}
            ft.</span><span v-if="monster.speed.climb">, climb {{ monster.speed.climb }}
              ft.</span><span v-if="monster.speed.fly">,fly {{ monster.speed.fly }}
                ft.<span v-if="monster.canHover">
                  (hover)</span></span><span v-if="monster.speed.swim">, swim {{ monster.speed.swim }} ft.</span>
        </dd>
      </div>

      <!--XXX idea for improved block: line for senses? Including passives-->
    </dl>

    <hr>

    <dl class="abilities">
      <template 
        v-for="ability in monster.abilities">
        <dt :key="ability.name">{{ ability.name | uppercase }}</dt>
        <dd :key="ability.name">{{ ability.score }} ({{ formatBonus(ability.mod) }})</dd>
      </template>
    </dl>

    <hr>

    <dl>
      <div v-if="monster.saves.length > 0">
        <dt>Saving Throws</dt>
        <dd>
          <span
            v-for="ability in ABILITIES"
            v-if="monster.saves.includes(ability.id)"
            :key="ability.name">
            {{ ability.text | capitalize }}
            {{ formatBonus(monster.abilities[ability.id].mod + monster.proficiency) }}<span class="list-separator">,</span>
          </span>
          <!--TODO comma separate-->
        </dd>
      </div>

      <div>
        <dt>Challenge</dt>
        <dd>{{ monster.cr }}</dd>
      </div>
    </dl>

  </figure>
</template>

<script>
import { formatBonus, getLabel } from "../util";
import { ABILITIES } from "../constants";

export default {
  name: "Statblock",
  props: {
    monster: { type: Object, required: true }
  },
  data() {
    return {
      ABILITIES
    };
  },
  methods: {
    formatBonus,
    getLabel
  }
};
</script>
<style lang="scss">
$statblock-width: 350px;

.statblock {
  width: $statblock-width; // XXX could be a little more flexible
  text-align: left;

  dt {
    font-weight: bold;
  }

  dd {
    margin: 0;
  }

  dl > div {
    $body-indent: 0.666em;
    padding-left: $body-indent;
    text-indent: -$body-indent;

    > * {
      display: inline;
    }
  } // TODO need to deal with abilities containing multiple paragraphs

  .abilities {
    // TODO alternate styles for gridless browsers
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 5px; // XXX arbitrary but works well with the 350px width
    text-align: center;

    > dd {
      grid-row: 2;
    }
  }
}

:last-child > .list-separator {
  display: none;
}
</style>
