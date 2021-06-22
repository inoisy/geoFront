<template>
    <header id="appBar" :class="$style.appBar">
        <VContainer
            fill-height
            :class="$style['header']"
            class="py-0 d-flex align-center"
        >
            <logo class="pr-3 mr-auto fill-height" />

            <template v-for="(item, index) in menuItems">
                <VBtn
                    v-if="!item.disable"
                    :key="index"
                    :to="`/${item.slug}`"
                    :title="item.name"
                    :class="$style.link"
                    class="ma-0 hidden-sm-and-down"
                    text
                    tile
                    nuxt
                    exact
                >
                    {{ item.name }}
                </VBtn>
                <VBtn
                    v-else
                    :id="item.slug"
                    :key="index"
                    :title="item.name"
                    :class="$style.link"
                    class="ma-0 hidden-sm-and-down"
                    text
                    tile
                >
                    {{ item.name }}
                    <SvgIcon name="arrowdown" style="margin-right: -5px;" />
                </VBtn>
            </template>
            <VBtn
                class="d-dlex ct_hid"
                href="tel:+74991120654"
                :class="$style.linkTel"
                title="Телефон"
                text
            >
                <SvgIcon name="phone" />
                <span :class="$style.linkTelText" class="pl-2 phone-text">
                    +7 (499) 112-06-54
                </span>
            </VBtn>


            <VBtn
                :class="$style.linkIcon"
                class="d-dlex"
                icon
                :href="`mailto:${info.email}`"
                title="Почта"
            >
                <SvgIcon name="mail" />
            </VBtn>
            <VBtn
                :class="$style.linkIcon"
                class="hidden-md-and-up"
                icon
                title="Меню"
                @click.stop="$emit('show')"
            >
                <SvgIcon name="menu" />
            </VBtn>
            <lazy-toolbar-catalog-menu
                v-if="!isMobile && isMounted"
                :items="menuItems[0].items"
                parent-slug="services"
            />
        </VContainer>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isMounted: false,
        };
    },
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.smAndDown;
        },
        menuItems() {
            return this.$store.getters.menuItems;
        },
        info() {
            return this.$store.state.info;
        },
        services() {
            return this.$store.state.services;
        },
    },

    mounted() {
        this.isMounted = true;
    },
};
</script>
<style lang="scss" module>
    .appBar {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 250;
        height: var(--toolbar-height);
        min-height: var(--toolbar-height);
        margin-top: 0;
        background-color: rgb(21, 19, 23);

        --icon-size: 36px;
        --font-size: 14px;
        --padding: 6px;

        @include sm {
            --icon-size: 48px;
        }

        @include md {
            --padding: 8px;
        }

        @include lg {
            --font-size: 15px;
            --padding: 16px;
        }

        .header {
            flex-wrap: nowrap !important;
            background-color: #151317;
        }

        .link,
        .linkTel {
            font-size: var(--font-size) !important;
        }

        .link {
            min-width: 100px;
            height: 100% !important;
            padding: 0 var(--padding) !important;
            color: #f1f3ef;
        }

        .linkTel {
            display: flex;
            width: var(--icon-size) !important;
            min-width: var(--icon-size) !important;
            height: var(--icon-size) !important;
            min-height: var(--icon-size) !important;
            padding: 0;
            border-radius: 50%;
            font-size: var(--font-size);
            color: $white !important;

            .linkTelText {
                display: none;
            }

            @include lg {
                width: unset !important;
                height: 100% !important;
                padding: 0 var(--padding) !important;
                border-radius: 0;
                color: #f1f3ef;

                .linkTelText {
                    display: inline;
                    width: 173px;
                }
            }
        }

        .linkIcon {
            display: flex;
            width: var(--icon-size) !important;
            height: var(--icon-size) !important;
            color: $white !important;
        }

        .linkIcon + .linkIcon {
            margin-left: 5px;
        }

        .linkTel + .linkIcon {
            margin-left: 5px;
        }

        .link + .linkTel {
            margin-left: 5px;
        }
    }
</style>
