<template>
    <v-card :class="$style.asideMenu"
            class="hidden-sm-and-down"
            light
    >
        <v-list color="transparent"
                dense
                light
        >
            <v-list-item
                v-for="child in services"
                :key="child.id"
                :to="`/services/${slug}/${child.slug}`"
                :title="child.name"
            >
                <v-list-item-content>
                    <v-list-item-title v-text="child.name"> </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    props: {
        services: {
            type: Array,
            default: () => [],
        },
        slug: {
            type: String,
            default: '',
        },
    },
};
</script>
<style lang="scss" scoped module>
    .asideMenu {
        float: right;
        max-width: 30%;
        margin-bottom: 30px;
        margin-left: 30px;
    }
</style>
