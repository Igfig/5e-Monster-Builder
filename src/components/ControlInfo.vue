<template>
  <div class="form-control" @click="setCurrentInfo(info)">
    <slot/>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { component as Fragment } from "vue-fragments";
import { CURRENT_INFO } from "../store/keys";
import { SET_CURRENT_INFO } from "../store/mutations";

export default {
  name: "ControlInfo",
  components: { Fragment },
  props: { info: { type: String, required: true } },
  computed: mapState([CURRENT_INFO]),
  methods: { ...mapMutations({ setCurrentInfo: SET_CURRENT_INFO }) }
};
</script>
