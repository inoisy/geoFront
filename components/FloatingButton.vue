<template>
    <div :class="$style.floatingButtonWrapper">
        <v-btn
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
    </div>
</template>
<style lang="scss" scoped module>
.floatingButtonWrapper {
  bottom: 16px;
  right: 16px;
  position: fixed;
  animation: pulse-black infinite 2s linear;
  border-radius: 50%;
  .floatingButton {
    width: 64px;
    height: 64px;
    transform: perspective(1px) translateZ(0);
    border: thin solid rgba($white, 0.7) !important;
    animation: pulse-white infinite 2s linear;
  }
}
@keyframes pulse-white {
  0% {
    box-shadow: 0 0 0 0 rgba($white, 0.7);
  }
  50% {
    box-shadow: 0 0 0 5px rgba($white, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba($white, 0);
  }
}
@keyframes pulse-black {
  0% {
    box-shadow: 0 0 0 0 rgba($black, 0.7);
  }
  50% {
    box-shadow: 0 0 0 11px rgba($black, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba($black, 0);
  }
}
</style>
<script>
export default {
    // data() {
    //   return { show: false };
    // },
    // mounted() {
    //   this.show = true;
    // },
    methods: {
        handleOffer() {
            this.$store.dispatch('showDialog', {
                name: '',
                isShow: true,
            });
            return true;
        },
    },
};
</script>
