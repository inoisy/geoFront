<template>
    <div :class="$style.chipsWrapper">
        <nuxt-link
            v-for="child in services"
            :key="child.id"
            v-ripple
            :class="$style.chipItem"
            exact
            :to="`/services/${slug}/${child.slug}`"
            :title="child.name"
        >
            {{ child.name }}
        </nuxt-link>
    </div>
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
    .chipSelected {
        background-color: #4a4a4a !important;
        color: #f5f5f5 !important;
    }

    .chipsWrapper {
        position: relative;
        display: flex;
        flex: 1 0 auto;
        flex-wrap: wrap;
        max-width: 100%;
        margin-right: -.6rem;
        padding: 8px 0;
        transition: .3s cubic-bezier(.25, .8, .5, 1);

        .chipHeader {
            display: flex;
            align-items: center;
            width: 100%;
            height: 48px;
            text-transform: uppercase;
            font-family: $heading-font-family;
            font-size: 16px;
            font-weight: bold;
            color: $black;
        }

        .chipItem {
            overflow: hidden;
            display: inline-block;
            margin-top: .3rem;
            margin-right: .6rem;
            margin-bottom: .3rem;
            margin-left: 0;
            padding: 5px 15px;
            border-radius: 4px;
            border: thin solid currentColor;
            text-decoration: none;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            line-height: 22px;
            color: $black;
            transition-duration: .28s;
            transition-property: background-color, color;
            transition-timing-function: cubic-bezier(.4, 0, .2, 1);

            &:hover {
                background-color: $black;
                color: $white;
            }
        }
    }
</style>
