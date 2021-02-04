<template>
  <!-- <v-slide-y-transition> -->
  <v-fab-transition>
    <v-btn
      v-show="show"
      transition="scale-transition"
      :class="$style.floatingButton"
      color="black"
      dark
      fixed
      bottom
      right
      fab
      large
      title="Обратный звонок"
      @click="handleOffer"
    >
      <svg-icon name="order" style="width: 24px; height: 24px" />
    </v-btn>
  </v-fab-transition>
  <!-- </v-slide-y-transition> -->
</template>
<style lang="scss" scoped module>
.floatingButton {
  width: 64px;
  height: 64px;
  &:before {
    content: "";
    width: 76px;
    height: 76px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    z-index: -1;
  }
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    background: transparent;
    border: 3px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    animation: z-widget-simple-btn-pulse infinite 2s linear;
  }
}
@keyframes z-widget-simple-btn-pulse {
  0% {
    width: 70px;
    height: 70px;
  }
  50% {
    width: 100px;
    height: 100px;
  }
  100% {
    width: 70px;
    height: 70px;
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