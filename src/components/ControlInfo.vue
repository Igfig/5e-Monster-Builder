<template>
  <div class="form-control" tabindex="0" @focus="setCurrentInfo(info)">
    <!--XXX not sure about the tab index being 0... it would be nice if we could generate a good order somehow-->
    <!--FIXME the info doesn't appear correctly if you click on a focusable element in the -->
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
