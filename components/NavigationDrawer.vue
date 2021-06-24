<template>
    <v-navigation-drawer
        :class="$style.wrapper"
        class="navigation-drawer-wrapper pt-2"
        :value="show"
        temporary
        fixed
        right
        touchless
        width="240px"
        @input="change"
    >
        <v-subheader :class="$style.subHeader">НАВИГАЦИЯ</v-subheader>
        <VList :class="$style.listWrapper"
               dark
               class="pt-0"
        >
            <template v-for="item in menuItems">
                <VList-group v-if="item.items && item.items.length > 0" :key="item.to">
                    <VListItem
                        slot="activator"
                        class="pl-0"
                        :to="item.to"
                        :title="item.name"
                    >
                        <VListItemContent>
                            {{ item.name }}
                        </VListItemContent>
                    </VListItem>
                    <template #appendIcon>
                        <SvgIcon class="icon" name="arrowdown" />
                    </template>

                    <VList
                        v-for="product in item.items"
                        :key="product.name"
                        class="pa-0"
                        dense
                        dark
                    >
                        <VList-group>
                            <VListItem
                                slot="activator"
                                class="pl-6"
                                nuxt
                                exact
                                dense
                                :to="`/${item.slug}/${product.slug}`"
                                :title="product.name"
                            >
                                <VListItemTitle>
                                    {{ product.name }}
                                </VListItemTitle>
                            </VListItem>
                            <template #appendIcon>
                                <SvgIcon class="icon" name="arrowdown" />
                            </template>
                            <VList dark>
                                <VListItem
                                    v-for="child in product.child"
                                    :key="child.id"
                                    nuxt
                                    exact
                                    dense
                                    :to="`/${item.slug}/${product.slug}/${child.slug}`"
                                    :title="child.name"
                                >
                                    <VListItemTitle class="pl-6">
                                        {{ child.name }}
                                    </VListItemTitle>
                                </VListItem>
                            </VList>
                        </VList-group>
                    </VList>
                </VList-group>
                <VListItem
                    v-else
                    :key="item.name"
                    active-class="text--accent"
                    :to="`/${item.slug}`"
                    nuxt
                    ripple
                    exact
                    :title="item.name"
                >
                    <VListItemTitle>{{ item.name }}</VListItemTitle>
                </VListItem>
            </template>
        </VList>
    </v-navigation-drawer>
</template>
<script>
export default {
    props: {
        show: { type: Boolean, default: false },
    },
    computed: {
        menuItems() {
            return this.$store.getters.menuItems;
        },
    },
    methods: {
        change(val) {
            if (!val) {
                this.$emit('close');
            }
        },
    },
};
</script>
<style lang="scss" module>
    .wrapper {
        z-index: 1111;
        background-color: #363636 !important;

        .subHeader {
            color: #fff !important;
        }
    }
</style>
<style lang="scss" scoped>
    .navigation-drawer-wrapper {
        z-index: 1111;

        ::v-deep .v-list {
            .v-list-group__header__append-icon {
                width: 24px !important;
                min-width: 24px !important;
            }

            .v-list-item--active {
                .icon {
                    transform: rotate(180deg);
                }
            }

            .v-list-group {
                .v-list-group {
                    .v-list-group__header {
                        padding-left: 0 !important;
                    }
                }
            }
        }
    }
</style>
