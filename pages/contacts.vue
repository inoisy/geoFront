<template>
    <div>
        <default-header :header="title" :breadcrumbs="breadcrumbs"></default-header>
        <section class="white">
            <VContainer class="sectionWrapper">
                <VRow no-gutters>
                    <VCol
                        cols="12"
                        md="6"
                        lg="4"
                        :class="$style.contactsWrapper"
                        class="pa-3"
                    >
                        <VList style="background: transparent !important;" light>
                            <VListItem
                                title="Телефон"
                                class="ct_hid"
                                href="tel:+74991120654"
                            >
                                <VListItem-icon>
                                    <SvgIcon name="phone" />
                                </VListItem-icon>
                                <VListItemContent itemprop="telephone">
                                    <span class="phone-text">+7 (499) 112-06-54</span>
                                </VListItemContent>
                            </VListItem>
                            <VListItem :href="`mailto:${info.email}`" title="email">
                                <VListItem-icon>
                                    <SvgIcon name="mail" />
                                </VListItem-icon>
                                <VListItemContent itemprop="email">
                                    {{ info.email }}
                                </VListItemContent>
                            </VListItem>
                            <VListItem title="Адрес">
                                <VListItem-icon>
                                    <SvgIcon name="pin" />
                                </VListItem-icon>
                                {{ info.address }}
                            </VListItem>
                            <VListItem title="Время работы">
                                <VListItem-icon>
                                    <SvgIcon name="time" />
                                </VListItem-icon>
                                {{ info.accessTime }}
                            </VListItem>
                        </VList>
                    </VCol>
                    <VCol
                        cols="12"
                        md="6"
                        offset-lg="1"
                        lg="7"
                        :class="$style.yandexMapWrapper"
                        class="pa-3"
                    >
                        <client-only>
                            <map-component :coords="info.addressCoords" />
                        </client-only>
                    </VCol>
                </VRow>
            </VContainer>
        </section>
    </div>
</template>

<script>
import {
    hydrateWhenIdle,
    hydrateWhenVisible,
} from 'vue-lazy-hydration';

const title = 'Контакты';
const description =
    'Для получения профессиональной консультации, оформления заявки на желаемую услугу достаточно позвонить по телефонному номеру, указанному на сайте, выслать запрос на электронную почту.';
export default {
    components: {
        DefaultHeader: hydrateWhenIdle(() => import('~/components/DefaultHeader.vue')),
        MapComponent: hydrateWhenVisible(() => import('~/components/MapComponent.vue')),
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
                    to: '/contacts',
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
                    content: this.$config.siteUrl + '/contacts',
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
                    href: this.$config.siteUrl + '/contacts',
                },
            ],
        };
    },
    computed: {
        info() {
            return this.$store.state.info;
        },
    },
};
</script>
<style lang="scss" module>
    .yandexMapWrapper {
        min-height: 400px;

        @include md {
            height: 300px;
            min-height: 300px;
        }

        @include lg {
            height: 400px;
            min-height: 400px;
        }
    }

    .contactsWrapper {
        display: flex;
        align-items: center;
    }
</style>
