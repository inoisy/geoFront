<template>
  <ul :class="$style.breadcrumbs">
    <li
      v-for="(item, i) in items"
      :key="item.to"
      :class="$style.breadcrumbsItem"
    >
      <nuxt-link
        :class="$style.breadcrumbsItemLink"
        :to="item.to"
        nuxt
        exact
        :title="item.text"
        :event="i === length ? '' : 'click'"
      >
        {{ item.text }}
      </nuxt-link>
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
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex: 0 1 auto;
  list-style-type: none;
  margin: 0;
  padding: 18px 12px;
  .breadcrumbsItem {
    align-items: center;
    display: inline-flex;
    font-size: 14px;
    &:not(:first-child) {
      &:before {
        content: "/";
        display: block;
        padding: 0 12px;
        color: rgba(255, 255, 255, 0.5);
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
      display: inline-flex;
      text-decoration: none;
    }
  }
}
</style>