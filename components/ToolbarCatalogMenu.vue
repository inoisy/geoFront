<template>
    <VMenu
        v-model="showMenu"
        offset-y
        left
        content-class="catalog-menu-inner"
        :activator="`#${parentSlug}`"
    >
        <VList dense dark>
            <template v-for="(child, index) in items">
                <template v-if="child.child && child.child.length">
                    <VMenu
                        :key="`${child.name}-${index}`"
                        close-delay="150"
                        offset-x
                        open-on-hover
                        right
                        :content-class="
                            child.child.length > 10
                                ? 'second-level-two-column'
                                : 'catalog-second-level-menu-inner'
                        "
                    >
                        <template #activator="{ on, attrs }">
                            <VListItem
                                v-bind="attrs"
                                :to="`/${parentSlug}/${child.slug}`"
                                v-on="on"
                            >
                                <VListItemTitle>{{ child.name }}</VListItemTitle>
                                <div class="ml-auto pl-3 d-inline-flex">
                                    <SvgIcon
                                        name="arrowdown"
                                        style=" width: 24px; height: 24px; margin: auto; transform: rotate(270deg);"
                                    />
                                </div>
                            </VListItem>
                        </template>
                        <template v-if="child.child && child.child.length">
                            <VList
                                dense
                                dark
                                :class="[child.child.length > 10 && 'two-columns']"
                            >
                                <VListItem
                                    v-for="(grandChild, i) in child.child"
                                    :key="`${grandChild.name}-${i}`"
                                    :to="`/${parentSlug}/${child.slug}/${grandChild.slug}`"
                                    class="list-item"
                                >
                                    <VListItemTitle>{{ grandChild.name }}</VListItemTitle>
                                </VListItem>
                            </VList>
                        </template>
                    </VMenu>
                </template>
                <template v-else>
                    <VListItem
                        :key="`${child.name}-${index}`"
                        :to="`/${parentSlug}/${child.slug}`"
                    >
                        <VListItemTitle>{{ child.name }}</VListItemTitle>
                    </VListItem>
                </template>
            </template>
        </VList>
    </VMenu>
</template>

<script>
export default {
    name: 'ToolbarCatalogMenu',
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        parentSlug: {
            type: String,
            default: 'catalog',
        },
    },
    data() {
        return {
            showMenu: false,
        };
    },
    watch: {
        '$route.path'() {
            this.showMenu = false;
        },
    },
    beforeDestroy() {
        this.showMenu = false;
    },
};
</script>

<style lang="scss" scoped>
    .two-columns {
        position: relative;
        max-width: 100%;
        column-count: 2;

        .list-item {
            float: left;
            width: 100%;
            page-break-inside: avoid;
            -moz-column-break-inside: avoid;
            break-inside: avoid;
        }

        .list-item-child {
            padding-left: 1rem;
        }
    }

    .catalog-second-level-menu-inner {
        min-width: 300px !important;
        max-width: 350px;
    }

    .second-level-two-column {
        min-width: 27rem !important;
        max-width: 27rem;
    }

    .catalog-menu-inner {
        min-width: 180px;
        max-width: 280px;
    }
</style>
