<template>
    <v-row no-gutters>
        <v-col v-for="child in items"
               :key="child.id"
               class="pa-3"
               cols="12"
               sm="6"
        >
            <!-- <LazyHydrate  when-visible> -->
            <service-card
                v-bind="{
                    name: child.name,
                    slug: child.slug,
                    description: child.description,
                    imgUrl: child.img,
                    parentSlug: parentSlug,
                }"
            />
            <!-- :parent-slug="slug" -->
            <!-- :item="child" -->
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => [],
            required: true,
        },
        parentSlug: {
            type: String,
            default: '',
            required: true,
        },
    },
    computed: {
        length() {
            return this.items.length;
        },
    },
};
</script>

<style>
</style>
