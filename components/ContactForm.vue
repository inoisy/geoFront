<template>
  <v-form class="layout wrap">
    <!-- <template> -->
    <!-- v-if="!this.formSuccess && !this.formError" -->
    <v-text-field
      v-model="name"
      class="xs12 py-0 flex"
      :dark="dark"
      :light="!dark"
      label="Ваше имя*"
      required
      autofocus
      outlined
      dense
      :error-messages="nameErrors"
      :counter="35"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="phone"
      v-mask="mask"
      :dark="dark"
      :light="!dark"
      class="xs12 py-0 flex"
      :error-messages="phoneErrors"
      label="Телефон*"
      required
      outlined
      dense
      @blur="$v.phone.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :dark="dark"
      :light="!dark"
      class="xs12 py-0 flex"
      label="E-mail"
      outlined
      dense
      :error-messages="emailErrors"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <!-- <v-text-field
      class="xs12 py-0 flex"
      outlined
      dense
      v-model="address"
      label="Адрес"
    ></v-text-field> -->
    <v-textarea
      v-model="message"
      :dark="dark"
      :light="!dark"
      class="xs12 py-0 flex"
      outlined
      dense
      height="100px"
      hide-details
      label="Комментарий"
    ></v-textarea>
    <v-flex xs12>
      <!-- <v-btn
        class="ml-0 mt-8"
        :color="dark ? 'black' : 'white'"
        :dark="dark"
        :light="!dark"
        :loading="loading"
        large
        style="width: 100%"
        title="Подтвердить заказ"
        @click="submit"
      >
        Отправить
      </v-btn>
      <span style="color: black">{{ dark }}{{ !light }}</span> -->
      <v-btn
        class="ml-0 mt-8"
        outlined
        large
        block
        :dark="dark"
        :light="!dark"
        :loading="loading"
        title="Отправить"
        @click="submit"
      >
        Отправить
      </v-btn>
      <!-- :disabled="submitDisabled" -->
    </v-flex>
    <!-- </template> -->
    <!-- <v-slide-y-transition>
      <v-flex xs12 v-if="this.formSuccess || this.formError">
        <v-alert :value="this.formSuccess" class="flex xs12 mt-3" type="success"
          >Заказ успешно отправлен.</v-alert
        >
        <v-alert :value="this.formError" class="flex xs12 mt-3" type="error"
          >Ошибка при отправке заказа.</v-alert
        >
      </v-flex>
    </v-slide-y-transition> -->
  </v-form>
</template>


<script>
import { validationMixin } from "vuelidate";
import { mask } from "vue-the-mask";

import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";
export default {
  directives: {
    mask,
  },
  mixins: [validationMixin],
  props: {
    serviceName: {
      type: String,
      default: "",
    },
    dark: {
      type: Boolean,
      default: true,
    },
  },

  validations: {
    name: { required, maxLength: maxLength(35), minLength: minLength(3) },
    phone: { required, minLength: minLength(10), maxLength: maxLength(19) },
    email: { email },
  },
  data() {
    // let user; // = this.$store.state.localStorage.user;
    // if (this.$store.getters["auth/isLogined"]) {
    //   const getUser = this.$store.getters["auth/getUser"];
    //   user = {
    //     name: getUser.firstname,
    //     phone: getUser.phone,
    //     email: getUser.email,
    //     address: "",
    //     id: getUser.id,
    //   };
    // } else {
    //   user = this.$store.state.localStorage.user;
    // }
    return {
      formSuccess: false,
      formError: false,
      name: "",
      phone: "",
      //   address: "",
      email: "",
      userID: "",
      message: "",
      mask: "+7 (###) ### - ####",
      loading: false,
    };
  },
  computed: {
    //  isLogined() {
    //   return this.$store.getters["auth/isLogined"];
    // },
    // userData() {
    //   return (
    //     this.$store.getters["auth/isLogined"] &&
    //     this.$store.getters["auth/getUser"]
    //   );
    // },
    submitDisabled() {
      return !this.name || !this.phone || this.$v.$anyError;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength && errors.push("Слишком длинное имя");
      !this.$v.name.minLength && errors.push("Слишком короткое имя");
      !this.$v.name.required && errors.push("Введите имя");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.maxLength && errors.push("Слишком длинный телефон");
      !this.$v.phone.minLength && errors.push("Слишком короткий телефон");
      !this.$v.phone.required && errors.push("Введите телефон");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Введите корректный email");
      return errors;
    },
  },
  methods: {
    clear() {
      this.$v.$reset();
      this.phone = "";
      this.name = "";
      this.message = "";
      //   this.address = "";
      this.email = "";
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$anyError) {
        return false;
      }
      //   // console.log("submit -> busket", this.$store.state.localStorage.basket);
      //   const busketObj = this.$store.state.localStorage.basket.map((item) => {
      //     return {
      //       name: item.name,
      //       qty: item.count,
      //       id: item.id,
      //       price: item.isDiscount
      //         ? Math.round(item.discountPrice)
      //         : Math.round(item.priceNum),
      //       priceAll: item.isDiscount
      //         ? Math.round(item.discountPrice * item.count)
      //         : Math.round(item.priceNum * item.count),
      //     };
      //   });
      //   // console.log("submit -> busket", busketObj);
      //   try {
      //     this.loading = true;
      //     const req = await this.$axios.post(process.env.baseUrl + "/orders", {
      //       oneClickbuy: this.oneClickBuy,
      //       productName: this.oneClickBuy ? this.productName : null,
      //       busket: busketObj,
      //       name: this.name,
      //       phone: this.phone,
      //       message: this.message,
      //       address: this.address,
      //       email: this.email,
      //       user: this.userID,
      //       summa: this.$store.getters.summa,
      //       // REMOVE
      //       // isTest: true,
      //     });
      //     this.loading = false;
      //     if (req.status === 200) {
      //       // this.$store.commit("saveBasket");
      //       if (!this.$store.getters["auth/isLogined"]) {
      //         this.$store.commit("setUserData", {
      //           name: this.name,
      //           phone: this.phone,
      //           address: this.address,
      //           email: this.email,
      //         });
      //       }

      //       this.formSuccess = true;
      //       if (window.yaCounter54918895) {
      //         window.yaCounter54918895.reachGoal("order");
      //       }
      //       setTimeout(() => {
      //         this.$emit("offerClose");
      //         !this.oneClickBuy && this.$store.commit("clearBasket");
      //       }, 4000);
      //     } else {
      //       this.formError = true;
      //       this.loading = false;
      //     }
      //   } catch (error) {
      //     this.loading = false;
      //     // console.log("submit -> error", error);
      //     this.formError = true;
      //     this.clear();
      //   }
    },
  },
};
</script>
