<template>
  <section :class="$style.firstSection">
    <v-container
      :class="[$style.firstSectionInner, noIcon && 'noIcon']"
      grid-list-lg
      fill-height
    >
      <v-row align="center">
        <v-col cols="12">
          <v-breadcrumbs
            :class="$style.breadcrumbs"
            class="mb-8"
            divider="/"
            :items="breadcrumbs"
            style=""
          >
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item
                :to="item.to"
                :class="$style.breadcrumbsItem"
                nuxt
                exact
                :title="item.text"
                class="breadcrumbs-item"
              >
                {{ item.text }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </v-col>
      </v-row>
      <v-row style="position: relative">
        <v-col :class="$style.textWrapper" class="text-wrapper">
          <h1 :class="$style.header" class="mb-6">{{ header }}</h1>
          <div :class="$style.subheader" class="mb-8" v-html="subheader"></div>
          <v-btn class="mb-0" outlined large @click="handleOffer">
            Заказать работы
          </v-btn>
        </v-col>

        <div v-if="icon && icon.url" :class="$style.iconWrapper">
          <img
            :class="$style.icon"
            :src="imageBaseUrl + icon.url"
            :alt="header"
          />
        </div>
      </v-row>
    </v-container>
  </section>
</template>
<style lang="scss" >
.breadcrumbs-item {
  a {
    color: white;
  }
}
</style>
<style lang="scss" scoped>
.noIcon {
  // color: red;
  // .firstSectionInner {
  .text-wrapper {
    max-width: 100% !important;
  }
  // }
}
</style>
<style lang="scss" scoped module>
.firstSection {
  @include bg(
    linear-gradient(180deg, rgba(0, 0, 0, 0.68) 0%, rgba(0, 0, 0, 0) 100%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)),
    url(~assets/images/bg1.jpg)
  );
  min-height: 370px;

  .firstSectionInner {
    padding-bottom: 110px;
    padding-top: 25px;

    .textWrapper {
      //  max-width: 70%;
    }
    .iconWrapper {
      position: absolute;
      right: 12px;
      bottom: 0;
      display: table;
      // transform: translate(0, -50%);
      // width: 15%;
      .icon {
        opacity: 0.3;
        max-width: 100%;
        width: 100%;
        height: auto;
        -webkit-filter: invert(100%); /* safari 6.0 - 9.0 */
        filter: invert(100%);
      }
    }
  }
  .breadcrumbs {
    //   position: absolute;
    //   top: 10px;
    padding-left: 0px;
  }
  > div {
    min-height: inherit;
  }
  .header {
    font-weight: 600;
    font-size: 2.5rem;
    line-height: 125%;
  }
  .subheader {
    line-height: 150%;
  }
  @include sm {
    .firstSectionInner {
      .textWrapper {
        max-width: 70%;
      }
      .iconWrapper {
        width: 25%;
        // top: 20px;
      }
    }
  }
  @include md {
    .firstSectionInner {
      .textWrapper {
        max-width: 70%;
      }
      .iconWrapper {
        width: 27%;
        // right: 0;
        // top: 50%;
        // transform: translate(0, -50%);
      }
    }
  }
  @include lg {
    .firstSectionInner {
      .textWrapper {
        max-width: 70%;
      }
      .iconWrapper {
        width: 20%;
      }
    }
  }
}
</style>
<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
    header: {
      type: String,
      default: "",
    },
    subheader: {
      type: String,
      default: "",
    },
    icon: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      imageBaseUrl: this.$config.imageBaseUrl,
    };
  },
  computed: {
    noIcon() {
      return !(this.icon && this.icon.url);
    },
  },
  methods: {
    handleOffer() {
      this.$store.dispatch("showDialog", {
        name: this.header,
        isShow: true,
      });
      return true;
    },
  },
};
</script>
