<template>
    <div>
        <LazyHydrate when-idle>
            <default-header :header="title" :breadcrumbs="breadcrumbs" />
        </LazyHydrate>

        <section
            v-for="(service, i) in services"
            :key="`service-${i}`"
            :class="$style.servicesWrapper"
            class="sectionWrapper"
        >
            <v-container>
                <v-row align="center" no-gutters>
                    <v-col class="pa-3" cols="12">
                        <nuxt-link :to="`/services/${service.slug}`" :title="service.name">
                            <h2 :class="$style.serviceHeader" class="d-inline-block">
                                {{ service.name }}
                            </h2>
                        </nuxt-link>
                        <div v-if="service.prices" class="position-relative">
                            <prices :class="$style.prices" :content="service.prices" />
                            <v-img
                                v-if="service.icon"
                                :class="$style.servicesIcon"
                                :src="imageBaseUrl + service.icon.url"
                                :alt="service.name"
                            />
                            <v-btn
                                :class="$style.button"
                                class="callToActionButton"
                                outlined
                                light
                                title="Заказать"
                                @click="handleOffer(service)"
                            >
                                Заказать
                            </v-btn>
                        </div>
                        <div
                            v-for="child in service.child"
                            :key="child.id"
                            :class="$style.childWrapper"
                            class="position-relative"
                        >
                            <div class="mb-6">
                                <nuxt-link
                                    :class="$style.childLink"
                                    :title="child.name"
                                    :to="`/services/${service.slug}/${child.slug}`"
                                >
                                    <h2 :class="$style.childName">{{ child.name }}</h2>
                                </nuxt-link>
                            </div>

                            <prices
                                v-if="child.prices"
                                :class="$style.prices"
                                :content="child.prices"
                            />
                            <div v-else-if="child.price" :class="$style.price">
                                {{ child.price }}
                            </div>
                            <v-btn
                                :class="$style.button"
                                class="callToActionButton"
                                outlined
                                light
                                title="Заказать"
                                @click="handleOffer(child)"
                            >
                                Заказать
                            </v-btn>
                            <v-img
                                v-if="child.icon"
                                :class="$style.servicesIcon"
                                :src="imageBaseUrl + child.icon.url"
                                :alt="child.name"
                            />
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import LazyHydrate from 'vue-lazy-hydration';


const title = 'Цены';
export default {
    components: {
        LazyHydrate,
    },
    async asyncData({
        params,
        app: {
            apolloProvider: { defaultClient: apolloClient },
        },
        error,
    }) {
        const {
            data: { services },
        } = await apolloClient.query({
            variables: {
                slug: params.parent,
            },
            query: gql`
        query ServicePricesQuery {
          services(where: { isMain: true }, sort: "name:asc") {
            name
            slug
            icon {
              url
            }
            prices
            child(
              limit: 999
              where: { _or: [{ price_null: false }, { prices_null: false }] }
              sort: "prices:desc,name:asc"
            ) {
              id
              icon {
                url
              }
              name
              slug
              prices
              price
            }
          }
        }
      `,
        });

        if (!services || !services.length) {
            return error({
                statusCode: 404,
                message: 'Информацию не удалось получить',
            });
        }


        return {
            services,


        };
    },
    data() {
        return {
            title,
            imageBaseUrl: this.$config.imageBaseUrl,
            breadcrumbs: [
                {
                    text: 'Главная',
                    to: '/',
                },
                {
                    text: title,

                },
            ],
        };
    },


    head() {
        return {
            title,
            meta: [


                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: this.$config.siteUrl + this.$route.path,
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: title,
                },


            ],
            link: [
                {
                    rel: 'canonical',
                    href: this.$config.siteUrl + '/prices',
                },
            ],
        };
    },
    methods: {
        handleOffer(service) {
            this.$store.dispatch('showDialog', {
                name: service.name,
                isShow: true,
            });
            return true;
        },
    },
};
</script>
<style lang="scss" module>
    .servicesWrapper {
        padding-bottom: 6rem;

        --button-color: 93 93 93;

        &:nth-child(2n + 1) {
            background-color: #f4f4f4;

            --content-color: white;
        }

        .button {
            width: 100%;
            margin-top: 2rem;
            box-shadow: 0 2px 10px rgba(100, 100, 100, .65);

            @include sm {
                width: auto;
                min-width: 180px;
            }

            @include md {
                min-width: 220px;
            }
        }

        .childWrapper {
            .childName {
                display: inline;
                font-size: 2rem;
                line-height: 125%;
            }

            .price {
                margin-top: -10px;
                font-size: 1.7rem;
                font-weight: bold;
                color: rgba($black, .87);
            }

            & + .childWrapper {
                margin-top: 4.5rem;

                @include md {
                    margin-top: 6rem;
                }
            }

            .childLink {
                text-decoration: none;
                color: $black;

                &:hover {
                    color: $accent;
                }
            }
        }

        --icon-size: 100px;

        .servicesIcon {
            position: absolute;
            top: 0;
            right: 0;
            float: right;
            width: var(--icon-size);
            height: var(--icon-size);
            margin-bottom: 10px;
            margin-left: 10px;
            opacity: .05;

            @include sm {
                --icon-size: 150px;
            }
        }

        .serviceHeader {
            position: relative;
            margin-bottom: 5rem;
            text-transform: uppercase;
            font-size: 2.5rem;
            font-weight: 600;
            color: $black;

            @include md {
                font-size: 3rem;
            }

            &:hover {
                color: $accent;

                &:after {
                    background-color: $accent;
                }
            }

            &:after {
                content: "";
                position: absolute;
                bottom: -8px;
                left: 3px;
                display: block;
                width: 120px;
                height: 2px;
                background-color: $black;
            }
        }
    }
</style>
