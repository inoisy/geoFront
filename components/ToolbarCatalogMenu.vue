<template>
    <v-menu
        v-model="showMenu"
        offset-y
        left
        content-class="catalog-menu-inner"
        :activator="`#${parentSlug}`"
    >
        <v-list dense dark>
            <template v-for="(child, index) in items">
                <template v-if="child.child && child.child.length">
                    <v-menu
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
                            <v-list-item
                                v-bind="attrs"
                                :to="`/${parentSlug}/${child.slug}`"
                                v-on="on"
                            >
                                <v-list-item-title>{{ child.name }}</v-list-item-title>
                                <div class="ml-auto pl-3 d-inline-flex">
                                    <svg-icon
                                        name="arrowdown"
                                        style=" width: 24px; height: 24px; margin: auto; transform: rotate(270deg);"
                                    />
                                </div>
                            </v-list-item>
                        </template>
                        <template v-if="child.child && child.child.length">
                            <v-list
                                dense
                                dark
                                :class="[child.child.length > 10 && 'two-columns']"
                            >
                                <v-list-item
                                    v-for="(grandChild, i) in child.child"
                                    :key="`${grandChild.name}-${i}`"
                                    :to="`/${parentSlug}/${child.slug}/${grandChild.slug}`"
                                    class="list-item"
                                >
                                    <v-list-item-title>{{ grandChild.name }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </template>
                    </v-menu>
                </template>
                <template v-else>
                    <v-list-item
                        :key="`${child.name}-${index}`"
                        :to="`/${parentSlug}/${child.slug}`"
                    >
                        <v-list-item-title>{{ child.name }}</v-list-item-title>
                    </v-list-item>
                </template>
            </template>
        </v-list>
    </v-menu>
</template>

<script>
export default {
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
