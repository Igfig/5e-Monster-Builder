<template>
  <div class="form-control" tabindex="0" @focus="setCurrentInfo(info)" @click="log">
    <!--XXX not sure about the tab index being 0... it would be nice if we could generate a good order somehow-->
    <!--FIXME the info doesn't appear correctly if you click on a focusable element nested inside this -->
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
  props: { info: { type: [String, Array, Function, Object], required: true } }, //FIXME error if info is not a string
  computed: mapState([CURRENT_INFO]),
  methods: {
    ...mapMutations({ setCurrentInfo: SET_CURRENT_INFO }),
    log() {
      console.log(this.$slots, this.children);
    }
  }
};
</script>
