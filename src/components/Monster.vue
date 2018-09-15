<template>
  <article class="monster">
    <!--<h2 class="monster-name">{{monster.name}}</h2>--> <!--TODO show this but only if there's text. Otherwise we get the same name twice in a row-->

    <!--XXX text here-->

    <Statblock :monster="monster"/>

    <div class="description"/> <!--XXX div doesn't seem quite right... maybe just have a bunch of sections, with no wrapper? Might even pass them in with slots, idk-->
  </article>
</template>

<script>
import { mapGetters, mapState } from "vuex";
//import { mapState } from "vuex";
import Statblock from "./Statblock";
import store from "../store";
//import { monster } from "../store";
import { keys } from "../store/monster/index";
import { mapVuexMap, genericSetter } from "../util";
import { Monster } from "../store/monster/classes";
import _ from "lodash";
// import { Api } from "../util";

/*//
const state = mapState({ monster: keys.monster.toString() });

_.merge(state, { monster: {} });

//console.log('FOO', foo);


console.log("state", state);

const api = new Api(store, keys.monster);
console.log("api", api);*/

console.log("keys", keys);

const state = mapVuexMap(mapState, keys.monster);
console.log("store", store);
console.log("monster", state);

//const getters = mapVuexMap(mapGetters, ...Object.keys(Monster.getters));
const flatGetters = mapVuexMap(mapGetters, ...Object.keys(store.getters));

function unflattenGetters(getters) {
  const computed = {};

  for (const key of Object.keys(getters)) {
    const context = key.split("/");
    const branch = context.slice(0, context.length - 1);
    const leaf = context[context.length - 1];
    if (!_.has(computed, branch)) {
      _.set(computed, branch, {});
    }

    const loc = _.get(computed, branch);

    loc[leaf] = key;

    Object.defineProperty(loc, leaf, {
      readable: true,
      enumerable: true,
      get: () => getters[key] // XXX this is unsafe if obj gets replaced
      //get: () => _.get(store.state, newContext) // XXX this is unsafe if obj is removed
    });
  }

  return computed;
}

const unflattenedGetters = unflattenGetters(store.getters);

//console.log("getters", Monster.getters, flatGetters, unflattenedGetters);

function buildStateTree(obj, context = []) {
  const computed = {};

  for (const [key, value] of Object.entries(obj)) {
    const newContext = [...context, key];

    if (typeof value === "object" && !_.isNull(value)) {
      computed[key] = buildStateTree(value, newContext);
    } else {
      Object.defineProperty(computed, key, {
        readable: true,
        enumerable: true,
        get: () => obj[key] // XXX this is unsafe if obj gets replaced
        //get: () => _.get(store.state, newContext) // XXX this is unsafe if obj is removed
      });
    }
  }

  return computed;
}

function buildGettersTree(obj, getters, context = []) {
  const computed = {};

  for (const [key, value] of Object.entries(obj)) {
    const newContext = [...context, key];
    const path = newContext.join("/");

    computed[key] =
      typeof value === "object" ? buildGettersTree(value, getters, newContext) : getters[path];
  }

  return computed;
}

const builtState = buildStateTree(store.state.monster);
//console.log("built state", builtState);

const getters = buildGettersTree(Monster.getters, flatGetters, ["monster"]);
//const getters = buildStateTree(store.getters.monster);

//console.log("real getters", getters);

const merged = _.merge({ monster: builtState }, unflattenedGetters); //{ monster: getters });

//console.log("m", merged);

function buildTree(keyTree, store, context = []) {
  const tree = {};

  const entries = Object.entries(keyTree);
  //console.log("entries", entries);

  for (const [key, value] of entries) {
    const newContext = [...context, key];

    //debugger;

    //if (typeof value === "object" && !_.isNil(value) && !Array.isArray(value)) {
    if (value.size() > 0) {
      tree[key] = buildTree(value, store, newContext);
    } else {
      const get = value._getter
        ? () => store.getters[value.toString()] // FIXME hmm speed.land is showing undefined? Maybe that's correct idk
        : value._state
          ? () => _.get(store.state, newContext)
          : () => undefined;

      Object.defineProperty(tree, key, {
        readable: false,
        enumerable: true,
        get,
        set: value._mutation ? () => store.mutations[value.toString()] : genericSetter(newContext)
      });
    }
  }
  return tree;
}

const builtTree = buildTree(keys.monster, store, ["monster"]);
console.log("built", builtTree);

const computed = {
  //...merged,
  monster() {
    return builtTree;
  },
  //...api,*/
  /*...mapVuexMap(
   mapGetters,
   keys.monster.speed,
   keys.monster.ac
   // keys.monster.bar.gar
   ),*/
  monsterComputed: function() {
    console.log("component", this);

    // TODO abstract out an API that'll do this merge thing for me
    //return {};
    return {
      ...this.monster
      /*speed: this[keys.monster.speed],
       ac: this[keys.monster.ac]*/
      // bar: { gar: this[keys.monster.bar.gar] }
    };
  }
};
console.log("comp", computed);
computed.monsterComputed();
export default {
  name: "Monster",
  components: { Statblock },
  computed
};
</script>

<style lang="scss">
</style>
