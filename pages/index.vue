<template>
  <div class="white text--black">
    <section :class="$style['first-section']">
      <v-container grid-list-lg fill-height class="py-12">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="10" md="10" lg="7">
            <h1 :class="$style.header" class="mb-5 text-center">
              {{ page.header }}
            </h1>
            <p :class="$style.subheader" class="text-center mb-6">
              {{ page.subheader }}
            </p>
            <v-btn
              id="main-screen-btn"
              class="mx-auto d-flex"
              x-large
              outlined
              @click="handleOffer"
            >
              Оставить заявку
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section>
      <v-container grid-list-lg style="position: relative">
        <v-row
          justify="center"
          align="center"
          :class="$style.serviceCardWrapper"
        >
          <v-col
            v-for="(service, i) in services"
            :key="`service-card-${i}`"
            class="mb-3"
            cols="12"
            sm="10"
            md="4"
          >
            <v-card
              :to="`/services/${service.slug}`"
              :class="$style.serviceCard"
              class="px-6 py-4"
              light
            >
              <div
                :class="$style.serviceImgWrapper"
                class="d-flex align-center mb-2"
              >
                <img
                  :src="
                    service.icon
                      ? imageBaseUrl + service.icon.url
                      : require('~/assets/icons/no-camera.svg')
                  "
                  :alt="service.name"
                  class="d-block mx-auto"
                  width="55px"
                  height="55px"
                />
              </div>
              <h2 :class="$style.serviceCardHeader" class="mb-2">
                {{ service.name }}
              </h2>
              <p :class="$style.serviceCardDescription">
                {{ service.description }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section>
      <v-container grid-list-lg class="pt-12">
        <template v-for="(service, i) in services">
          <v-row
            v-if="service.info"
            :key="`service-text-${i}`"
            :class="$style.serviceFeatureRow"
            class="mb-12"
            justify="center"
          >
            <v-col
              :class="$style.serviceFeatureTextWrapper"
              cols="12"
              sm="10"
              md="6"
              class=""
            >
              <h2 :class="$style.serviceFeatureHeader">
                {{ service.info.header }}
              </h2>
              <div
                :class="$style.serviceFeatureContent"
                class="mb-5"
                v-html="service.info.content"
              ></div>
              <div>
                <v-btn
                  class="mb-3 mr-2 d-inline-flex"
                  :to="`/services/${service.slug}`"
                  outlined
                  light
                >
                  Подробнее
                </v-btn>
                <v-btn
                  class="mb-3 mr-2 d-inline-flex"
                  outlined
                  light
                  @click="handleOffer(service)"
                >
                  Заказать
                </v-btn>
              </div>
            </v-col>
            <v-col
              :class="$style.serviceFeatureImgWrapper"
              cols="12"
              sm="10"
              md="6"
            >
              <v-img
                :class="$style.serviceFeatureImg"
                :src="
                  service.info.img
                    ? imageBaseUrl + service.info.img.url
                    : require('~/assets/icons/no-camera.svg')
                "
                :alt="service.name"
                aspect-ratio="1.555"
                max-height="500px"
                gradient="to top right, rgba(0,0,0,0), rgba(0,0,0,.4)"
            /></v-col>
          </v-row>
        </template>
      </v-container>
    </section>
    <section :class="$style.stepsWrapper">
      <v-container grid-list-lg>
        <v-row>
          <v-col cols="12">
            <h2
              :class="$style.pageHeader"
              class="mb-10 text-center text-md-left"
            >
              Этапы работ
            </h2>
          </v-col>
        </v-row>

        <v-row class="justify-center">
          <v-col
            v-for="(step, i) in page.steps"
            :key="`step${i}`"
            :class="$style.steps"
            cols="10"
            md="3"
          >
            <div :class="$style.stepImageWrapper" class="mb-4">
              <img
                :class="$style.stepImage"
                :src="
                  step.icon
                    ? imageBaseUrl + step.icon.url
                    : require('~/assets/icons/no-camera.svg')
                "
                :alt="step.header"
              />
              <img
                :class="$style.stepPath"
                src="~assets/icons/path.svg"
                alt=""
              />
            </div>

            <h3 :class="$style.stepsHeader" class="mb-2">{{ step.header }}</h3>
            <p :class="$style.stepsText" class="mb-3 text-center text-md-left">
              {{ step.content }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section :class="$style.benefitsWrapper">
      <v-container grid-list-lg>
        <!-- {{ page.benefits }} -->
        <v-row>
          <v-col cols="12">
            <h2
              :class="$style.pageHeader"
              class="mb-10 text-center text-md-left"
            >
              Наши преимущества
            </h2>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col
            v-for="(benefit, i) in page.benefits"
            :key="`benefit-${i}`"
            :class="$style.benefitItem"
            cols="12"
            sm="10"
            md="6"
          >
            <!-- {{ benefit }} -->
            <div :class="$style.benefitsImageWrapper">
              <img
                :class="$style.benefitsImage"
                :src="
                  benefit.icon
                    ? imageBaseUrl + benefit.icon.url
                    : require('~/assets/icons/no-camera.svg')
                "
                :alt="benefit.header"
              />
            </div>
            <div :class="$style.benefitsTextWrapper">
              <h3 :class="$style.benefitsHeader">{{ benefit.header }}</h3>
              <p :class="$style.benefitsText">{{ benefit.content }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
<style lang="scss" scoped module>
.benefitsWrapper {
  color: #18191f;

  > div {
    padding-top: 65px;
    padding-bottom: 65px;
  }
  .benefitItem {
    display: flex;
    .benefitsImageWrapper {
      background-color: #ececec;
      display: inline-flex;
      border-radius: 50%;
      width: 72px;
      min-width: 72px;
      height: 72px;
      align-items: center;
      justify-content: center;
      margin-right: 24px;
      .benefitsImage {
        width: 44px;
        height: 44px;
      }
    }
    .benefitsTextWrapper {
      .benefitsHeader {
        font-weight: 600;
        font-size: 18px;
        line-height: 125%;
        margin-bottom: 16px;
      }
      .benefitsText {
        font-weight: normal;
        font-size: 14px;
        font-weight: 300;
      }
    }
  }
  @include md {
    .benefitItem {
      .benefitsTextWrapper {
        .benefitsHeader {
          font-size: 1.5rem;
        }
        .benefitsText {
          font-size: 1rem;
        }
      }
    }
  }
}
.pageHeader {
  font-weight: 600;
  font-size: 2.9rem;
  line-height: 125%;
}
.first-section {
  min-height: 610px;
  > div {
    min-height: inherit;
  }
  @include bg(
    linear-gradient(180deg, rgba(0, 0, 0, 0.68) 0%, rgba(0, 0, 0, 0) 100%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)),
    url(~assets/images/bg.jpg)
  );
  background-position: 80%;
}
.header {
  font-size: 2rem;
  // font-weight: normal;
  line-height: 125%;
}
.subheader {
  font-size: 1rem;
}
.serviceCardWrapper {
  margin-top: -50px;
}
.serviceCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;

  width: 100%;
  color: #18191f;
  text-align: center;
  // transition-duration: 2s;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.24) !important;
  // transition: all;
  box-sizing: inherit;
  transition-property: all;
  transition-duration: 0.6s;
  transition-timing-function: ease;
  &:hover {
    box-shadow: 4px 4px 25px 4px rgba(0, 0, 0, 0.25) !important;
    transform: translateY(-5px);
    transform-origin: center;
    // transition-duration: 2s;
  }
  .serviceImgWrapper {
    min-height: 80px;
  }
  .serviceCardHeader {
    font-weight: 500;
    font-size: 22px;
    text-transform: uppercase;
    color: #18191f;
  }
  .serviceCardDescription {
    font-weight: normal;
    font-size: 12px;
    line-height: 150%;

    margin: 0;
    color: #18191f;
    font-weight: 300;
  }
  @include sm {
    .serviceCardDescription {
      font-size: 14px;
    }
  }
  @include md {
    .serviceImgWrapper {
      min-height: 100px;
    }
    .serviceCardDescription {
      font-size: 16px;
    }
  }
}

.serviceFeatureRow {
  .serviceFeatureImgWrapper {
    display: flex;
    align-items: center;
    .serviceFeatureImg {
      border-radius: 3px;
      box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 100%;
      display: block;
    }
  }
  .serviceFeatureTextWrapper {
    color: #18191f;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .serviceFeatureHeader {
      font-weight: 600;
      font-size: 32px;
      margin-bottom: 24px;
      line-height: 125%;
    }
    .serviceFeatureContent {
      font-weight: 300;
      font-size: 16px;
      line-height: 150%;
    }
  }
  &:nth-child(odd) {
    flex-direction: row-reverse;
  }
  @include md {
    .serviceFeatureImgWrapper {
      padding-left: 8.33333%;
    }
    // padding-left: 8.33333%;
    &:nth-child(odd) {
      .serviceFeatureImgWrapper {
        padding-right: 8.33333%;
        padding-left: 12px;
      }
    }
  }
}

.stepsWrapper {
  background-color: #ececec;
  color: #18191f;

  .steps {
    // &:nth-child(even)
    margin-bottom: 50px;
    align-items: center;
    // justify-content: center;
    display: flex;
    flex-direction: column;
    &:first-child .stepPath {
      display: none;
    }
    &:last-child {
      margin-bottom: 0px;
    }
    .stepsHeader {
      font-weight: bold;
      font-size: 18px;
    }
    .stepsText {
      font-size: 14px;
      font-weight: 300;
    }
    .stepImageWrapper {
      display: flex;
    }
    .stepPath {
      position: absolute;
      //   transform: translate(0, -15px) rotate(-163.15deg);
      transform: translate(-50px, -65px) rotate(108deg) scale(-0.4);
    }

    &:nth-child(even) .stepPath {
      transform: translate(-75px, -65px) rotate(-96deg) scale(-0.4);
    }
  }
  > div {
    padding-top: 80px;
    padding-bottom: 75px;
  }

  @include md {
    .steps {
      .stepsHeader {
        font-weight: bold;
        font-size: 20px;
      }
      .stepsText {
        font-size: 16px;
      }
      align-items: flex-start;
      margin-bottom: 0px;
      // .stepImageWrapper {
      // padding-left: 16px;
      // }
      .stepPath {
        position: relative;
        transform: translate(0, 0) rotate(0) scale(0.8);
        margin-left: 3px;
      }

      &:first-child .stepPath {
        display: block;
      }
      &:nth-child(even) .stepPath {
        transform: translate(0, -22px) rotate(-166deg) scale(0.8);
        // transform: translate(-131px, -76px) rotate(441.85deg) scale(-0.4);
      }
      &:last-child .stepPath {
        display: none;
      }
    }
  }
  @include lg {
    // .stepsWrapper {
    .steps {
      .stepPath {
        margin-left: 40px;
        transform: translate(0, 0) rotate(0) scale(1);
      }
      &:nth-child(even) .stepPath {
        transform: translate(0, -22px) rotate(-166deg) scale(1);
      }
    }
    // }
  }
}

@include sm {
  .header {
    font-size: 36px;
  }
  .subheader {
    font-size: 18px;
  }
  .first-section {
    background-position: 70%;
  }
}
@include md {
  .first-section {
    background-position: center;
  }
}
@include lg {
  .header {
    font-size: 48px;
  }
}
</style>
<script>
import gql from "graphql-tag";

export default {
  async asyncData(ctx) {
    const client = ctx.app.apolloProvider.defaultClient;
    const { data } = await client.query({
      query: gql`
        {
          services(where: { isMain: true }) {
            name
            slug
            description
            icon {
              url
            }
            info {
              header
              content
              img {
                url
              }
            }
          }
          mainPage {
            title
            metaDescription
            content
            header
            subheader
            benefits {
              header
              content
              icon {
                url
              }
            }
            steps {
              header
              content
              icon {
                url
              }
              order
            }
          }
        }
      `,
    });
    if (!data.mainPage) {
      return ctx.error({
        statusCode: 404,
        message: "Информацию не удалось получить",
      });
    }

    // return this.arrays;
    data.mainPage.steps = data.mainPage.steps.sort((a, b) => {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
    // console.log("🚀 ~ file: index.vue ~ line 265 ~ asyncData ~ data", data);
    return {
      page: data.mainPage,
      services: data.services,
    };
  },
  data() {
    return {
      imageBaseUrl: this.$config.imageBaseUrl,
    };
  },
  methods: {
    handleOffer(service) {
      this.$store.dispatch("showDialog", {
        name: service.name,
        isShow: true,
      });
      return true;
    },
  },
  head() {
    return {
      title: this.page.title || "GeoWorks",
      titleTemplate: "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page.metaDescription,
        },
      ],
    };
  },
};
</script>
