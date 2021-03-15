<template>
  <v-dialog
    v-model="isShow"
    :max-width="imgWidth"
    :scrollable="false"
    :max-height="imgHeight"
  >
    <v-card :class="$style.dialogImgWrapper" dark>
      <!-- <div> -->
      <v-img
        :class="$style.dialogImg"
        :src="imgUrl"
        :alt="alt"
        contain
        :max-width="imgWidth"
        :height="imgHeight"
      />
      <!-- </div> -->
      <div :class="$style.buttonWrapper">
        <v-btn class="close-btn" fab @click="close">
          <!-- style=" z-index: 10" -->
          <svg-icon name="close" />
        </v-btn>
      </div>
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
    imgUrl: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    imgWidth: {
      type: Number,
    },
    imgHeight: {
      type: Number,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  computed: {
    isShow: {
      get() {
        return this.show;
      },
      set(val) {
        if (!val) {
          this.close();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped module>
.dialogImgWrapper {
  position: relative;
  max-height: inherit;
  .dialogImg {
    // height: 100%;
    max-height: inherit;
    width: 100%;
  }
  .buttonWrapper {
    position: absolute;
    top: 16px;
    right: 16px;
  }
  // .dialogImg {
  //   max-height: calc(100vh - 64px);
  //   @include md {
  //     max-height: calc(90vh - 24px);
  //   }
  // }
}
</style>