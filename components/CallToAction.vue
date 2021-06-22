<template>
    <v-parallax class="parallaxWrapper"
                :src="src"
                dark
    >
        <VContainer :class="$style.parallaxInner">
            <h2 class="pageHeader mb-2 pa-3 col col-12">Бесплатная консультация</h2>
            <div
                class="mb-3 pa-3 col col-12 col-sm-8 col-md-8 col-lg-7 text-center text-md-left"
                style="font-size: 1.2rem;"
            >
                <div style="margin-bottom: 2.5rem;">
                    Получить консультацию и расчёт полной стоимости услуг можно оставив
                    контакты в форме ниже или позвонив по телефону

                    <a :class="$style.phone"
                       class="ct_hid"
                       href="tel:+74991120654"
                    >
                        <span class="phone-text">+7 (499) 112-06-54</span>
                    </a>
                </div>
                <VBtn class="callToActionButton"
                      color="white"
                      @click="handleOffer"
                >
                    Получить консультацию
                </VBtn>
            </div>
        </VContainer>
    </v-parallax>
</template>

<script>
const oneSize = require('~/assets/call.jpg?resize&size=1980');


export default {
    data() {
        return {
            src: oneSize.src,
        };
    },
    computed: {
        phone() {
            return this.$store.state.info.phone;
        },
    },
    methods: {
        handleOffer() {
            this.$store.dispatch('showDialog', {
                name: this.header,
                isShow: true,
            });
            return true;
        },
    },
};
</script>
<style lang="scss" scoped>
    .parallaxWrapper {
        background-color: $white;
        color: $black;

        ::v-deep .v-parallax__image {
            filter: brightness(.2);
        }
    }
</style>
<style lang="scss" module>
    .parallaxInner {
        display: flex;
        align-items: center;
        flex-direction: column;

        @include md {
            align-items: flex-start;
        }
    }

    .phone {
        text-decoration: none;
        white-space: nowrap;
        font-weight: 700;
        color: $white;

        &:hover {
            color: $accent;
        }
    }
</style>
