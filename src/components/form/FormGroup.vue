<template>
  <div
    class="form-control"
    tabindex="0"
    @focus="setCurrentInfo(info)">
    <!--XXX not sure about the tab index being 0... it would be nice if we could generate a good order somehow-->
    <!--FIXME the info doesn't appear correctly if you click on a focusable element nested inside this -->
    <!--XXX honestly I'm not sure we're ever actually going to use this, and if we do I'm even less sure that it should be a matter of focus (rather than say just a regular click handler)-->
    <slot/>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { SET_CURRENT_INFO } from "../../store/mutations";

export default {
  name: "ControlInfo",
  props: { info: { type: Array, required: false, default: () => [] } }, //TODO should be made required at some point probably
  methods: {
    ...mapMutations({ setCurrentInfo: SET_CURRENT_INFO })
  }
};
</script>
