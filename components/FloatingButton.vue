<template>
  <!-- <v-slide-y-transition> -->
  <div :class="$style.floatingButtonWrapper">
    <v-fab-transition>
      <v-btn
        v-show="show"
        transition="scale-transition"
        :class="$style.floatingButton"
        color="black"
        dark
        fab
        large
        title="Обратный звонок"
        @click="handleOffer"
      >
        <svg-icon name="order" />
      </v-btn>
    </v-fab-transition>
  </div>

  <!-- </v-slide-y-transition> -->
</template>
<style lang="scss" scoped module>
@keyframes pulse {
  0% {
    // transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba($white, 0.7);
  }

  50% {
    // transform: scale(1);
    box-shadow: 0 0 0 11px rgba($white, 0);
  }

  100% {
    // transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba($white, 0);
  }
}
@keyframes btn-pulse {
  0% {
    width: 64px;
    height: 64px;
  }
  50% {
    width: 90px;
    height: 90px;
  }
  100% {
    width: 64px;
    height: 64px;
  }
}
.floatingButtonWrapper {
  bottom: 16px;
  right: 16px;
  position: fixed;
  .floatingButton {
    width: 64px;
    height: 64px;
    transform: perspective(1px) translateZ(0);
    border: thin solid $white !important;
    animation: pulse infinite 2s linear;
    // &:before {
    //   content: "";
    //   width: 64px;
    //   height: 64px;
    //   position: absolute;
    //   left: 50%;
    //   top: 50%;
    //   transform: translate(-50%, -50%);
    //   background: rgba($white, 0.5);
    //   border-radius: 50%;
    //   // z-index: -1;
    //   animation: btn-pulse infinite 2s linear;
    //   border: 3px solid rgba(0, 0, 0, 0.2);
    // }
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 64px;
      height: 64px;
      background: transparent;
      border: 3px solid rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      animation: btn-pulse infinite 2s linear;
    }
  }
}
</style>
<script>
export default {
  data() {
    return { show: false };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    handleOffer() {
      this.$store.dispatch("showDialog", {
        name: "",
        isShow: true,
      });
      return true;
    },
  },
};
</script>