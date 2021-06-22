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
            <VContainer fill-height>
                <VRow align="center" no-gutters>
                    <VCol :class="$style.serviceItem"
                          class="pa-3"
                          cols="12"
                    >
                        <VImg
                            v-if="service.icon"
                            :class="$style.servicesIcon"
                            :src="imageBaseUrl + service.icon.url"
                            :alt="service.name"
                        />
                        <div :class="$style.servicesTextWrapper" class="mb-7">
                            <NuxtLink
                                :to="`/services/${service.slug}`"
                                :title="service.name"
                            >
                                <h2 :class="$style.serviceHeader" class="d-inline-block">
                                    {{ service.name }}
                                </h2>
                            </NuxtLink>

                            <div class="mb-7" v-html="service.descriptionLong"/>
                            <div :class="$style.buttonWrapper">
                                <VBtn
                                    :class="$style.button"
                                    class="mb-3"
                                    :to="`/services/${service.slug}`"
                                    title="Подробнее"
                                    outlined
                                    light
                                >
                                    Подробнее
                                </VBtn>
                                <VBtn
                                    :class="$style.button"
                                    outlined
                                    light
                                    title="Заказать работы"
                                    @click="handleOffer(service)"
                                >
                                    Заказать работы
                                </VBtn>
                            </div>
                        </div>

                        <ul v-if="service.child && service.child.length">
                            <li v-for="child in service.child" :key="child.id">
                                <NuxtLink
                                    :title="child.name"
                                    :to="`/services/${service.slug}/${child.slug}`"
                                >
                                    {{ child.name }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </VCol>
                </VRow>
            </VContainer>
        </section>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import LazyHydrate from 'vue-lazy-hydration';

const title = 'Услуги';
const description =
    'Наша организация оказывает широкий спектр современных и востребованных геодезических услуг. После проведения научных изысканий подготавливаются проектные документы, служащие основой по вопросам строительства объектов.';
export default {
    components: {
        LazyHydrate,
    },
    async asyncData({ app, error }) {
        const {
            data: { services },
        } = await app.apolloProvider.defaultClient.query({
            query: gql`
        {
          services(where: { isMain: true }) {
            name
            slug
            descriptionLong
            icon {
              url
            }
            child(sort: "name:asc") {
              name
              slug
            }
          }
        }
      `,
        });
        if (!services) {
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
            imageBaseUrl: this.$config.imageBaseUrl,
            title,
            breadcrumbs: [
                {
                    text: 'Главная',
                    to: '/',
                },
                {
                    text: title,
                    to: '/services',
                },
            ],
        };
    },
    head() {
        return {
            title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: description,
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: this.$config.siteUrl + '/services',
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: title,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: description,
                },
            ],
            link: [
                {
                    rel: 'canonical',
                    href: this.$config.siteUrl + '/services',
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
        &:nth-child(2n + 1) {
            background-color: #f4f4f4;
        }

        a {
            text-decoration: none;
        }

        ul {
            padding-left: 0;
            list-style: square inside url("~assets/icons/bullet.svg");

            li {
                margin-bottom: 15px;

                a {
                    color: $black;

                    &:hover {
                        color: $accent;
                    }
                }
            }
        }

        .buttonWrapper {
            display: flex;
            flex-wrap: wrap;

            @include sm {
                flex-wrap: nowrap;

                .button + .button {
                    margin-left: 10px;
                }
            }

            .button {
                flex: 1 1 100%;

                @include sm {
                    flex: 0 0 190px;
                }
            }
        }

        .serviceItem {
            position: relative;
        }

        --icon-size: 100px;

        .servicesIcon {
            float: right;
            width: var(--icon-size);
            height: var(--icon-size);
            margin-bottom: 10px;
            margin-left: 10px;
            opacity: .3;

            @include sm {
                --icon-size: 150px;
            }
        }

        .serviceHeader {
            position: relative;
            margin-bottom: 40px;
            text-transform: uppercase;
            font-size: 22px;
            font-weight: 600;
            color: $black;

            &:hover {
                color: $accent;
            }

            &:after {
                content: "";
                position: absolute;
                top: 40px;
                display: block;
                width: 90px;
                height: 1px;
                background-color: $black;
            }
        }
    }

    @include md {
        .servicesWrapper {
            .servicesTextWrapper {
                max-width: 60%;
            }

            .servicesIcon {
                width: 27%;
                height: auto;
            }
        }
    }

    @include lg {
        .servicesWrapper {
            .servicesTextWrapper {
                max-width: 60%;
            }

            .servicesIcon {
                width: 20%;
            }
        }
    }
</style>
