<template>
	<article class="monster">
		<!--<h2 class="monster-name">{{monster.name}}</h2>--> <!--TODO show this but only if there's text. Otherwise we get the same name twice in a row-->
		
    <!--XXX text here-->
    
		<figure class="statblock"> <!--XXX not 100% sure that this is a figure... could be an article, or an article in a figure-->
		  <h3 class="monster-name">{{monster.name | capitalize}}<span v-if="!monster.name">New Monster</span></h3>
      
      <p>{{monster.size.label | capitalize}} {{getLabel(monster.type)}}<span v-if="!!monster.subtype">
        ({{getLabel(monster.subtype)}})</span>, <!--FIXME should really support multiple subtypes-->
        {{monster.alignment.text | lowercase}}
      </p>
      
      <hr />
      
      <dl>
        <div>
          <dt>Armor Class</dt>
          <dd>{{monster.ac}}</dd> <!--TODO include source-->
        </div>
        
        <div>
        <dt>Hit Points</dt>
          <dd>{{monster.hp}} ({{monster.hd}}d{{monster.size.hd}}<span v-if="monster.abilities.CON.bonus !== 0"> + {{monster.hd * monster.abilities.CON.bonus}}</span>)</dd>
        </div>

        <div>
        <dt>Speed</dt>
          <dd>{{monster.speed.land}} ft.
            <span v-if="monster.speed.fly">, fly {{monster.speed.fly}} ft. <span v-if="monster.speed.fly">(hover)</span></span>
            <span v-if="monster.speed.swim">, swim {{monster.speed.swim}} ft.</span>
            <span v-if="monster.speed.burrow">, burrow {{monster.speed.burrow}} ft.</span>
          </dd>
        </div>
      </dl>
      
      <hr />
      
      <dl class="abilities">
        <template v-for="ability in monster.abilities">
          <dt>{{ability.name | uppercase}}</dt>
          <dd>{{ability.score}} ({{formatBonus(ability.bonus)}})</dd>
        </template>
      </dl>
      
      <hr />
      
      
		</figure>
		
		<div class="description"></div> <!--XXX div doesn't seem quite right... maybe just have a bunch of sections, with no wrapper? Might even pass them in with slots, idk-->
	</article>
</template>

<script>
import { mapState } from "vuex";
import { formatBonus, getLabel } from "../util";

export default {
  name: "monster",
  computed: mapState(["monster"]),
  methods: {
    formatBonus,
    getLabel
  }
};
</script>

<style lang="scss">
.monster {
  text-align: left;
  // TODO this should have a fixed minimum dimension (maybe a max too), such that the ability scores won't cause a line-break or resize when a bonus hits +10 (i.e. one extra character wide)

  dt {
    font-weight: bold;
  }

  dd {
    margin: 0;
  }

  dl > div > * {
    display: inline;
  }

  .abilities {
    // TODO alternate styles for gridless browsers
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 10px; // XXX arbitrary
    text-align: center;

    > dd {
      grid-row: 2;
    }
  }
}
</style>
