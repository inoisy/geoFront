<template>
    <v-slide-group>
        <template #next>
            <svg-icon name="next" />
        </template>
        <template #prev>
            <svg-icon name="prev" />
        </template>
        <v-slide-item v-for="child in items" :key="child.id">
            <div :class="$style.slideItem">
                <service-card
                    v-bind="{
                        name: child.name,
                        slug: child.slug,
                        description: child.description,
                        imgUrl: child.img,
                        parentSlug: parentSlug,
                    }"
                />
            </div>
        </v-slide-item>
    </v-slide-group>
</template>

<script>
import ServiceCard from '~/components/ServiceCard.vue';

export default {
    components: { ServiceCard },
    props: {
        items: {
            type: Array,
            default: () => [],
            required: true,
        },
        parentSlug: {
            type: String,
            required: true,
        },
    },
};
</script>
<style lang="scss" module>
    .slideItem {
        width: 336px;
        padding: 12px;

        @include md {
            width: 290px;
        }

        @include xl {
            width: 310px;
        }
    }
</style>

<style lang="scss">
    .v-slide-group__next {
        position: absolute;
        top: 0;
        right: -52px;
        bottom: 0;
    }

    .v-slide-group__prev {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -52px;
    }
</style>
