<template>
  <!--XXX note that this template is very temporary. This component is being used only for the reactivity we get from Vue; it should never display anything. Probably it'll go in the store or something.-->
  <div>
    <dl>
      <dt>Hit Points</dt>
      <dd>{{ hp }} ({{ hd }}d{{ size.hd }}<span v-if="abilityScores.CON.mod !== 0">{{ formatBonus(hd * abilityScores.CON.mod) }}</span>)
      </dd>
    </dl>
    
    <dl class="abilities">
      <!--<template v-for="ability in ABILITIES">
        <dt :key="`${ability.id}-name`">{{ ability.label | uppercase }}</dt>
        <dd :key="`${ability.id}-score`">{{ abilityScores[ability.id].score }}</dd>
        &lt;!&ndash;<dd :key="`${ability.id}-score`">{{ abilityScores[ability].score }} ({{ formatBonus(abilityScores[ability].mod) }})</dd>&ndash;&gt;
      </template>-->
    
      <!--XXX actually the "ability in ABILITIES" structure is safer due to ordering... we could try and do an OrderedDict sort of thing here I guess? Hrm-->
      <template v-for="ability in abilityScores">
        <dt :key="`${ability.id}-name`">{{ ability.label | uppercase }}</dt>
        <!--<dd :key="`${abilityScore.ability.id}-score`">{{ abilityScore.score }}</dd>-->
        <dd :key="`${ability.id}-score`">{{ ability.score }} ({{ formatBonus(ability.mod) }})</dd>
      </template>
    </dl>
  </div>
</template>

<script>
import { ABILITIES, ALIGNMENTS, ARMOR, SIZES, TYPES } from "../constants";
import { formatBonus, mapObject, scoreFor } from "../util";
import { AbilityScore } from "./monster";

export default {
  name: "MonsterNew",
  data() {
    return {
      ABILITIES,

      name: "",
      isProperName: false,

      size: SIZES.MEDIUM,
      type: TYPES.HUMANOID,
      subtypes: null,
      alignment: ALIGNMENTS.UNALIGNED,

      hd: 1,
      hasMaxHp: false,
      isInjured: false,

      naturalAC: 10,
      customAC: 0,
      customAcText: "",
      armor: ARMOR.NONE,
      hasShield: false,
      extraAcAbility: null,

      abilityScores: mapObject(
        ABILITIES,
        ability => ability.id,
        ability => new AbilityScore(ability)
      ),
      saves: [],

      speed: {
        // XXX wondering if maybe this ought to be a vue component too... needs a simpler interface than what I've been doing, then
        land: undefined,
        fly: undefined,
        swim: undefined,
        climb: undefined,
        burrow: undefined
      },
      canHover: false
    };
  },
  computed: {
    /*ac() {
      return /!*this.armor.acWithDex(this) + *!/this.shieldAC + this.extraAbilityAC + this.customAC;
    }*/
    hpPerHd() {
      const hpMultiplier = this.isInjured ? 0.5 : 1;
      const baseHpPerHd = this.hasMaxHp ? this.size.hd : (this.size.hd + 1) / 2;
      return Math.max(1, baseHpPerHd + this.abilityScores.CON.mod) * hpMultiplier;
    },
    hp() {
      return Math.max(1, Math.floor(this.hd * this.hpPerHd));
    }
  },
  methods: {
    formatBonus,
    scoreFor
  }
};
</script>
