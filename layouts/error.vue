<template>
    <v-container class="fill-height" style="min-height: 70vh;">
        <v-row justify="center">
            <v-col cols="12"
                   md="6"
                   class="py-16"
            >
                <h1 :class="$style.title">{{ error.statusCode }}</h1>
                <h2 :class="$style.info">{{ error.message }}</h2>
                <v-btn :class="$style.button"
                       to="/"
                       replace
                       color="black"
                       dark
                       large
                >
                    Вернуться на главную
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props: { error: { type: Object, default: () => ({}) } },
};
</script>

<style module>
    .title {
        margin-bottom: 25px;
        text-align: center;

        /* margin-top: 15px; */
        font-size: 5rem;
        line-height: 100%;
    }

    .info {
        margin: 0;
        text-align: center;
        font-weight: 300;
        color: #484848;
    }

    .button {
        display: flex;
        width: 270px;
        margin-top: 35px;
        margin-right: auto;
        margin-left: auto;
    }
</style>
