<template>
  <!-- <div class="black--text"> -->
  <v-img
    :src="imgUrl"
    :alt="alt"
    :title="alt"
    aspect-ratio="1.555"
    max-height="400px"
    gradient="to top right, rgba(0,0,0,0), rgba(0,0,0,.4)"
  />
  <!-- </div> -->
</template>
<script>
export default {
  props: {
    imgUrl: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
};
</script>