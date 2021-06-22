<template>
    <v-card
        :to="`/services/${parentSlug}/${slug}`"
        :title="name"
        nuxt
        light
        hover
    >
        <service-image :img-url="imgUrl" :alt="name" />

        <v-card-title :class="$style.cardTitle">
            <span class="text-truncate">
                {{ name }}
            </span>
        </v-card-title>
        <v-card-text :class="$style.cardDescription">
            <div :class="$style.elepsis">
                {{ description }}
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        parentSlug: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: String,
            required: true,
        },
    },
};
</script>
<style lang="scss" module>
    .cardTitle {
        font-size: 1rem !important;
        font-weight: bold;
        line-height: 150% !important;
    }

    .cardDescription {
        line-height: 125% !important;

        .elepsis {
            overflow: hidden;
            display: -webkit-box;
            color: rgba(0, 0, 0, .87);
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }
</style>
