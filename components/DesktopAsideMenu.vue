<template>
    <VCard :class="$style.asideMenu"
           class="hidden-sm-and-down"
           light
    >
        <VList color="transparent"
               dense
               light
        >
            <VListItem
                v-for="child in services"
                :key="child.id"
                :to="`/services/${slug}/${child.slug}`"
                :title="child.name"
            >
                <VListItemContent>
                    <VListItemTitle v-text="child.name"> </VListItemTitle>
                </VListItemContent>
            </VListItem>
        </VList>
    </VCard>
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
<style lang="scss" module>
    .asideMenu {
        float: right;
        max-width: 30% !important;
        margin-bottom: 30px;
        margin-left: 30px;
    }
</style>
