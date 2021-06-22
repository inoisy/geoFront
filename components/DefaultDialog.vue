<template>
    <v-dialog
        v-model="isShow"
        width="600"
        style="overflow-x: hidden;"
        content-class="dialog-active"
        light
        @click:outside="close"
    >
        <v-card :class="$style.dialogInner">
            <v-btn
                :class="$style.closeButton"
                class="ml-auto"
                text
                icon
                outlined
                large
                color="black"
                @click="close"
            >
                <svg-icon name="close" />
            </v-btn>
            <div v-if="!formSuccess">
                <div
                    :class="$style.header"
                    class="mb-6"
                    v-text="
                        productName ? `Заказать услугу «${productName}»` : 'ЗАКАЗАТЬ ЗВОНОК'
                    "
                />
                <div :class="$style.subheader" class="mb-8">
                    Пожалуйста, заполните контактную информацию, и наши сотрудники
                    свяжутся с Вами.
                </div>
                <v-form v-model="form" class="layout wrap">
                    <v-text-field
                        v-model="name"
                        class="xs12 py-0 flex"
                        :error-messages="nameErrors"
                        label="Имя"
                        :dense="isMobile"
                        required
                        outlined
                        @blur="$v.name.$touch()"
                    />
                    <v-text-field
                        v-model="email"
                        class="xs12 py-0 flex"
                        :error-messages="emailErrors"
                        :dense="isMobile"
                        label="E-mail"
                        required
                        outlined
                        @blur="$v.email.$touch()"
                    />
                    <v-text-field
                        v-model="phone"
                        v-mask="mask"
                        class="xs12 py-0 flex"
                        :error-messages="phoneErrors"
                        label="Телефон"
                        :dense="isMobile"
                        required
                        outlined
                        @blur="$v.phone.$touch()"
                    />
                    <v-textarea
                        v-model="message"
                        class="xs12 py-0 flex mb-9"
                        outlined
                        dense
                        height="100px"
                        hide-details
                        label="Комментарий"
                    />

                    <v-flex xs12>
                        <v-btn
                            class="ml-0"
                            outlined
                            large
                            block
                            light
                            :disabled="submitDisabled"
                            :loading="loading"
                            @click="submit"
                        >
                            Отправить
                        </v-btn>
                    </v-flex>

                    <v-slide-y-transition>
                        <v-flex v-if="formSuccess || formError" xs12>
                            <v-alert
                                :value="formSuccess"
                                class="flex xs12 mt-3"
                                type="success"
                            >
                                Cообщение отправлено!
                            </v-alert>
                            <v-alert :value="formError"
                                     class="flex xs12 mt-3"
                                     type="error"
                            >
                                Ошибка при отправке!
                            </v-alert>
                        </v-flex>
                    </v-slide-y-transition>
                </v-form>
            </div>
            <div v-else>
                <svg-icon name="checked" :class="$style.successIcon" />

                <div :class="$style.successHeader" class="text-center">
                    Заявка отправлена!
                </div>
                <div :class="$style.successSubHeader" class="text-center">
                    Мы свяжемся с вами в ближайшее время.
                </div>
            </div>
            <div
                :class="[
                    $style.bottomLine,
                    formSuccess && 'success',
                    formError && 'error',
                ]"
            />
        </v-card>
    </v-dialog>
</template>

<script>
import gql from 'graphql-tag';


import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';

import {
    required,
    maxLength,
    minLength,
    email,
} from 'vuelidate/lib/validators';

export default {
    directives: {
        mask,
    },
    mixins: [validationMixin],

    validations() {
        return {
            name: { required, maxLength: maxLength(35), minLength: minLength(3) },
            email: { required, email },
            phone: { required, minLength: minLength(17), maxLength: maxLength(19) },
        };
    },
    data: () => ({
        formSuccess: false,
        formError: false,
        name: '',
        email: '',
        phone: '',
        message: '',
        files: [],
        form: false,
        mask: '+7 (###) ### - ####',
        loading: false,
    }),
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.smAndDown;
        },
        submitDisabled() {
            return !this.name || !this.phone || !this.email || this.$v.$anyError;
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) {
                return errors;
            }
            !this.$v.name.maxLength && errors.push('Слишком длинное имя');
            !this.$v.name.minLength && errors.push('Слишком короткое имя');
            !this.$v.name.required && errors.push('Введите имя');
            return errors;
        },
        phoneErrors() {
            const errors = [];
            if (!this.$v.phone.$dirty) {
                return errors;
            }
            !this.$v.phone.maxLength && errors.push('Слишком длинный телефон');
            !this.$v.phone.minLength && errors.push('Слишком короткий телефон');
            !this.$v.phone.required && errors.push('Введите телефон');
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) {
                return errors;
            }
            !this.$v.email.email && errors.push('Введите корректный email');
            !this.$v.email.required && errors.push('Введите email');
            return errors;
        },
        productName() {
            return this.$store.state.dialog.name;
        },
        isShow: {
            get() {
                return this.$store.state.dialog.isShow;
            },
            async set(val) {
                await this.$store.dispatch('showDialog', {
                    name: '',
                    isShow: val,
                });
            },
        },
    },
    afterDestroy() {
        this.close();
    },
    methods: {
        async close() {
            this.formSuccess = false;
            this.formError = false;
            await this.$store.commit('dialog', {
                name: '',
                isShow: false,
            });
        },


        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },
        clear() {
            this.$v.$reset();
            this.phone = '';
            this.name = '';
            this.email = '';
        },
        async submit() {
            this.$v.$touch();
            if (this.$v.$anyError) {
                return;
            }
            this.loading = true;
            await this.$apollo
                .mutate({
                    mutation: gql`
            mutation(
              $name: String!
              $phone: String!
              $message: String
              $email: String!
              $serviceName: String
            ) {
              createOrder(
                input: {
                  data: {
                    name: $name
                    phone: $phone
                    message: $message
                    email: $email
                    serviceName: $serviceName
                  }
                }
              ) {
                order {
                  id
                }
              }
            }
          `,
                    variables: {
                        name: this.name,
                        phone: this.phone,
                        message: this.message,
                        email: this.email,
                        serviceName: this.$store.state.dialog.name,
                    },
                })
                .then(() => {
                    this.formSuccess = true;


                    try {
                        if (
                            this.$config.yandexMetrikaID &&
                            window[`yaCounter${this.$config.yandexMetrikaID}`]
                        ) {
                            console.log('order');
                            window[`yaCounter${this.$config.yandexMetrikaID}`].reachGoal('order');
                        }
                        this.$ga.event({
                            eventCategory: 'order',
                            eventAction: 'orderAction',
                            eventLabel: 'orderLabel',
                            eventValue: 111,


                        });
                    } catch (error) {
                        console.log('🚀 ~ file: DefaultDialog.vue ~ line 361 ~ .then ~ error', error);
                    } finally {
                        this.clear();
                    }
                })
                .catch(() => {
                    this.formError = true;
                });
            this.loading = false;
        },
    },
};
</script>
<style lang="scss">
    .dialog-active {
        overflow-x: hidden;
    }
</style>
<style lang="scss" module>
    .dialogInner {
        padding: 24px 20px 30px;

        @include md {
            padding: 2.2rem 2rem 2.4rem;
        }
    }

    .successIcon {
        display: block;
        width: 230px;
        max-width: 70%;
        height: auto;
        margin-right: auto;
        margin-bottom: 30px;
        margin-left: auto;
    }

    .successHeader {
        margin-bottom: 1.2rem;
        font-size: 2rem;
        font-weight: 900;
        line-height: 125%;
    }

    .successSubHeader {
        font-size: 1rem;

        @include lg {
            font-size: 1.2rem;
        }
    }

    .closeButton {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }

    .header {
        padding-right: 44px;
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 125%;

        @include sm {
            font-size: 2rem;
        }
    }

    .subheader {
        margin-bottom: 1rem;
        font-size: 1rem;
    }

    .bottomLine {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 7px;
        margin: auto;
        background: darken($accent, 10%);
    }
</style>
