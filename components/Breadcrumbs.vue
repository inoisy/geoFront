<template>
    <ul :class="$style.breadcrumbs">
        <li
            v-for="(item, i) in items"
            :key="item.to"
            :class="$style.breadcrumbsItem"
        >
            <nuxt-link
                v-if="item.to"
                :class="$style.breadcrumbsItemLink"
                :to="item.to"
                nuxt
                exact
                :title="item.text"
                :event="i === length ? '' : 'click'"
            >
                {{ item.text }}
            </nuxt-link>
            <div v-else :class="$style.breadcrumbsItemLink">
                {{ item.text }}
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        length() {
            return this.items.length - 1;
        },
    },
};
</script>

<style style lang="scss" scoped module>
.breadcrumbs {
  list-style-type: none;
  padding: 18px 12px;
  .breadcrumbsItem {
    align-items: center;
    display: inline;
    font-size: 12px;
    @include md {
      font-size: 14px;
    }
    &:not(:last-child) {
      &:after {
        content: "/";
        display: inline;
        padding: 0 12px;
        color: rgba($white, 0.5);
      }
    }
    &:last-child {
      .breadcrumbsItemLink {
        color: rgba(255, 255, 255, 0.5);
        pointer-events: none;
      }
    }
    .breadcrumbsItemLink {
      color: white;
      align-items: center;
      display: inline;
      text-decoration: none;
    }
  }
}
</style>
