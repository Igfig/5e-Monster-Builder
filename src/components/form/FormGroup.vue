<template>
  <div class="form-control" tabindex="0" @focus="setCurrentInfo(info)">
    <!--XXX not sure about the tab index being 0... it would be nice if we could generate a good order somehow-->
    <!--FIXME the info doesn't appear correctly if you click on a focusable element nested inside this -->
    <!--FIXME I really hate that this is yet another div that doesn't do anything on its own. Rather we put all the bits on the next element down. Maybe we can use a mixin somehow?-->
    <slot/>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { component as Fragment } from "vue-fragments";
import { SET_CURRENT_INFO } from "../../store/mutations";

export default {
  name: "ControlInfo",
  components: { Fragment },
  props: { info: { type: Array, required: false } }, //TODO should be made required at some point probably
  methods: {
    ...mapMutations({ setCurrentInfo: SET_CURRENT_INFO })
  }
};
</script>
