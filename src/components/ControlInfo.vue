<template>
  <slot @focus="setCurrentInfo()"/>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { CURRENT_INFO } from "../store/keys";
import { SET_CURRENT_INFO } from "../store/mutations";

export default {
  name: "ControlInfo",
  props: { text: { type: String, reqired: true } },
  computed: mapState([CURRENT_INFO]),
  methods: { ...mapMutations({ setCurrentInfo: SET_CURRENT_INFO }) }
};
</script>
