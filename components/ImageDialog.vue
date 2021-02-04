<template>
  <v-dialog :value="show" @click:outside="close">
    <v-card :class="$style.dialogImgWrapper">
      <div>
        <v-img
          :class="$style.dialogImg"
          :src="$config.imageBaseUrl + img"
          :alt="alt"
          contain
        />
      </div>

      <v-btn
        class="close-btn"
        fab
        outlined
        style="position: absolute; top: 16px; right: 16px; z-index: 10"
        @click="close"
      >
        <svg-icon name="close" style="width: 24px; height: 24px" />
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped module>
.dialogImgWrapper {
  .dialogImg {
    max-height: calc(100vh - 64px);
    @include md {
      max-height: calc(90vh - 24px);
    }
  }
}
</style>