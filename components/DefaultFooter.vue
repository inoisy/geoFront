<template>
    <v-footer
        :class="$style.footer"
        class="footer pa-0"
        dark
        height="auto"
        :style="`background-image: url(${require('~/assets/footerbg.jpg')})`"
    >
        <VContainer class="py-12">
            <VRow class="d-flex justify-center">
                <VCol class="pt-5 px-7"
                      cols="12"
                      sm="6"
                      md="6"
                      lg="3"
                >
                    <logo :mini="true" class="mb-5" />
                    <div class="mb-5" style=" font-size: 14px; font-weight: normal; line-height: 24px;">
                        {{ info.descriptor }}

                    </div>
                    <div >
                        <!-- <a href="tg://resolve?domain=<USERNAME>">Telegram</a> -->

                        <!-- <v-btn
                            :href="`tg://resolve?domain=inoisy`"
                            target="_blanc"
                            icon
                            dark
                        >
                            <svg-icon name="telegram" style="width: 23px; height: 23px;" />
                        </v-btn> -->
                        <v-btn
                            :href="`https://wa.me/79773691665`"
                            target="_blanc"
                            icon
                            dark
                        >
                            <svg-icon
                                name="whatsapp"
                            />
                        </v-btn>
                        <v-btn
                            style="margin-left: 8px;"
                            href="https://www.instagram.com/geoworks_s"
                            target="_blanc"
                            icon
                            dark
                        >
                            <svg-icon name="instagram" />
                        </v-btn>
                    </div>
                </VCol>
                <VCol class=""
                      cols="12"
                      sm="6"
                      md="6"
                      lg="3"
                >
                    <v-subheader class="hidden-sm-and-down">КОНТАКТЫ</v-subheader>
                    <VList style="background: transparent !important;">

                        <VListItem
                            class="ct_hid"
                            title="Телефон"
                            href="tel:+74991120654"
                            height="48"
                        >
                            <VListItem-icon>
                                <SvgIcon name="phone" />
                            </VListItem-icon>
                            <VListItemContent itemprop="telephone">
                                <span class="phone-text"> +7 (499) 112-06-54 </span>
                            </VListItemContent>
                        </VListItem>
                        <VListItem :href="`mailto:${info.email}`" title="email">
                            <VListItem-icon>
                                <SvgIcon name="mail" />
                            </VListItem-icon>
                            <VListItemContent itemprop="email">
                                {{ info.email }}
                            </VListItemContent>
                        </VListItem>
                        <VListItem title="Адрес">
                            <VListItem-icon>
                                <SvgIcon name="pin" />
                            </VListItem-icon>
                            <VListItemContent>
                                <span style="font-size: 12px;">
                                    {{ info.address }}
                                </span>
                            </VListItemContent>
                        </VListItem>
                    </VList>
                </VCol>
                <VCol class="hidden-sm-and-down"
                      cols="12"
                      sm="6"
                      md="6"
                      lg="3"
                >
                    <v-subheader>НАВИГАЦИЯ</v-subheader>
                    <VList
                        style="background: transparent !important;"
                        class="footer-list"
                    >
                        <VListItem
                            v-for="menuItem in menuItems"
                            :key="menuItem.slug"
                            :to="`/${menuItem.slug}`"
                            :title="menuItem.name"
                            exact
                        >
                            {{ menuItem.name }}
                        </VListItem>
                    </VList>
                </VCol>
                <VCol class="hidden-sm-and-down"
                      cols="12"
                      sm="6"
                      md="6"
                      lg="3"
                >
                    <v-subheader>УСЛУГИ</v-subheader>
                    <VList
                        style="background: transparent !important;"
                        class="footer-list"
                    >
                        <VListItem
                            v-for="service in services"
                            :key="service.slug"
                            :to="`/services/${service.slug}`"
                            :title="service.name"
                            exact
                        >
                            {{ service.name }}
                        </VListItem>
                    </VList>
                </VCol>
            </VRow>
        </VContainer>
    </v-footer>
</template>

<script>
export default {
    computed: {
        menuItems() {
            return this.$store.getters.menuItems;
        },
        info() {
            return this.$store.state.info;
        },
        services() {
            return this.$store.state.services;
        },
    },
};
</script>
<style lang="scss" module>
    .footer {
        min-height: inherit;
        background-position: 80% 50%;
        background-repeat: no-repeat;
        background-size: cover;

        @include sm {
            background-position: 90% 50%;
        }

        @include md {
            background-position: 100% 50%;
        }
    }
</style>
