<template>
  <figure class="statblock"> <!--XXX not 100% sure that this is a figure... could be an article, or an article in a figure-->
  
    <!--TODO maybe clicking on any figure or block switches to the appropriate tab in the builder and focuses the associated input? Though that might get awkward when we're just displaying statblocks outside the builder... perhaps we can hang it all on a top-level event that only looks at element ids or something-->
    
    <header>
      <h3 class="monster-name">{{ monster.name | capitalize }}<span v-if="!monster.name">New Monster</span>
      </h3>
  
      <p>{{ monster.size.label | capitalize }} {{ getLabel(monster.type) }}<span v-if="!!monster.subtypes">
        ({{ getLabel(monster.subtypes) }})</span>, <!--FIXME should really support multiple subtypes-->{{ monster.alignment.text | lowercase }}
      </p>
    </header>
    
    <hr>

    <dl>
      <div>
        <dt>Armor Class</dt>
        <dd>{{ monster.ac }}
        <span v-if="monster.acText">({{ monster.acText }})</span></dd>
      </div>

      <div>
        <dt>Hit Points</dt>
        <dd>{{ monster.hp }} ({{ monster.hd }}d{{ monster.size.hd }}<span v-if="monster.abilityScores.CON.mod !== 0">{{ formatBonus(monster.hd * monster.abilityScores.CON.mod) }}</span>)
        </dd>
      </div>

        <div>
        <dt>Speed</dt>
        <dd>{{ monster.speed.land }} ft.<span v-if="monster.speed.burrow">,
          burrow {{ monster.speed.burrow }} ft.</span><span v-if="monster.speed.climb">,
          climb {{ monster.speed.climb }} ft.</span><span v-if="monster.speed.fly">,
          fly {{ monster.speed.fly }} ft.<span
            v-if="monster.canHover">(hover)</span></span><span v-if="monster.speed.swim">,
          swim {{ monster.speed.swim }} ft.</span>
        </dd>
      </div>
    </dl>

    <hr>

    <dl class="abilities">
      <template 
        v-for="abilityScore in monster.abilityScores">
        <dt :key="`${abilityScore.ability.id}-name`">{{ abilityScore.label | uppercase }}</dt>
        <dd :key="`${abilityScore.ability.id}}-score`">{{ abilityScore.score }} ({{ formatBonus(abilityScore.mod) }})</dd>
      </template>
    </dl>

    <hr>

    <dl>
      <div v-if="monster.saves.length > 0">
        <dt>Saving Throws</dt>
        <dd>
          <span
            v-for="abilityScore in monster.abilityScores"
            v-if="monster.saves.includes(abilityScore.ability.id)"
            :key="abilityScore.ability.id">
            {{ abilityScore.ability.text | capitalize }}
            {{ formatBonus(abilityScore.mod + monster.proficiency) }}<span class="list-separator">,</span>
          </span>
          <!--TODO comma separate-->
        </dd>
      </div>

      <div>
        <dt>Skills</dt>
        <dd></dd>
      </div>

      <div>
        <dt>Damage Resistances</dt>
        <dd></dd>
      </div>

      <div>
        <dt>Damage Immunities</dt>
        <dd></dd>
      </div>

      <div>
        <dt>Condition Immunities</dt>
        <dd></dd>
      </div>

      <div>
        <dt>Senses</dt>
        <dd></dd>
      </div>
      
      <div>
        <dt>Languages</dt>
        <dd></dd>
      </div>
      
      <div>
        <dt>Challenge</dt>
        <dd>{{ monster.cr }}</dd>
      </div>
    </dl>
    
    <hr>
    
    <h4 :style="{display: 'none'}">Traits</h4> <!--TODO tidier way to hide-->
    
    <h4>Actions</h4>
    
    <!--<dl>
      <div v-for="(attack, index) in monster.attacks" :key="index"> &lt;!&ndash;TODO incldue other actions too&ndash;&gt;
        <dt>{{attack.name}}</dt> &lt;!&ndash;TODO fallback attack name&ndash;&gt;
        <dd>Attack +{{attack.getAttack(monster)}}, damage {{attack.getDamageExpression(monster)}}</dd> &lt;!&ndash;TODO so much&ndash;&gt;
      </div>
    </dl>-->
    
  </figure>
</template>

<script>
import { formatBonus, getLabel } from "../util";

export default {
  name: "Statblock",
  props: {
    monster: { type: Object, required: true }
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

  p,
  dl {
    margin: 0.5em 0 0.3em; // XXX extremely tentative
  }

  header p {
    margin-top: 0;
    /*font-size: 0.9em;
    font-style: italic;*/ // XXX these make it more accurate to the books, but not sure if I prefer that
  }

  h3 {
    font-size: 1.5em;
    font-variant: small-caps;
  }
  h4 {
    font-size: 1.25em;
    margin-top: 15px; // XXX extremely tentative
    border-bottom: 1px solid black; // TODO hook up color to a variable
    line-height: 1em; // XXX tentative
    font-variant: small-caps;
  }

  hr {
    // simpler version, might go back to this
    //border: 1px solid black;

    // triangly version
    border: 1px solid transparent;
    border-right: 0 transparent;
    border-left: $statblock-width solid black;
  }

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
  } // TODO need to deal with abilityScores containing multiple paragraphs

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
