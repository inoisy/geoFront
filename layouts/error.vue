<template>
  <v-container grid-list-lg class="fill-height">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h1 :class="$style.title">{{ error.statusCode }}</h1>
        <h2 :class="$style.info">{{ error.message }}</h2>
        <v-btn :class="$style.button" to="/" replace color="black" dark large>
          Вернуться на главную
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: { error: { type: Object, default: () => {} } },
};
</script>

<style scoped module>
.title {
  /* margin-top: 15px; */
  font-size: 5rem;
  text-align: center;
  line-height: 100%;
  margin-bottom: 25px;
}
.info {
  font-weight: 300;
  color: #484848;
  margin: 0;
  text-align: center;
}
.button {
  margin-top: 35px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: 270px;
}
</style>
