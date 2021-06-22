<template>
    <VRow no-gutters>
        <VCol v-for="child in items"
              :key="child.id"
              class="pa-3"
              cols="12"
              sm="6"
        >
            <service-card
                v-bind="{
                    name: child.name,
                    slug: child.slug,
                    description: child.description,
                    imgUrl: child.img,
                    parentSlug: parentSlug,
                }"
            />
        </VCol>
    </VRow>
</template>

<script>
export default {
    name: 'ServiceCards',
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
