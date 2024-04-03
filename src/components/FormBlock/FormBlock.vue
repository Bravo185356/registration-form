<template>
  <div class="form-wrapper" @click="closeCustomSelect">
    <div class="form-container">
      <h2 class="title">Регистрация</h2>
      <form class="form">
        <general-info
          :name="name"
          :surname="surname"
          :mName="mName"
          :phoneNumber="phoneNumber"
          :selectedGroups="selectedGroups"
          :currentOpenDropMenu="currentOpenDropMenu"
          :gender="gender"
          :validation="v$"
          :dateOfBirth="dateOfBirth"
          @setDropMenu="(menuName) => (currentOpenDropMenu = menuName)"
          @input="(inputInfo) => updateValue(inputInfo)"
        />
        <address-block
          @input="(inputInfo) => updateValue(inputInfo)"
          :index="index"
          :country="country"
          :region="region"
          :city="city"
          :street="street"
          :home="home"
          :validation="v$"
        />
        <document-block
          :typeOfDocument="typeOfDocument"
          :serial="serial"
          :numberOfDocument="numberOfDocument"
          :receivedFrom="receivedFrom"
          :dateOfReceive="dateOfReceive"
          @input="(inputInfo) => updateValue(inputInfo)"
          :validation="v$"
        />
        <div class="success-text" v-if="isSuccess">Пользователь успешно создан!</div>
        <button @click.prevent="submit" class="registration-button">Зарегистрироваться</button>
      </form>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import AddressBlock from "../AddressBlock/AddressBlock.vue";
import DocumentBlock from "../DocumentBlock/DocumentBlock.vue";
import GeneralInfo from "../GeneralInfo/GeneralInfo.vue";
import { isPhoneNumberCorrect, isDateCorrect } from "@/helpers/validation.js";
import "./FormBlock.scss";

export default {
  components: {
    AddressBlock,
    DocumentBlock,
    GeneralInfo,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      surname: "",
      name: "",
      mName: "",
      dateOfBirth: "",
      phoneNumber: "+7",
      gender: "",
      sendMessage: true,
      selectedGroups: [],
      selectedDoctor: "",
      currentOpenDropMenu: "",
      index: "",
      country: "",
      region: "",
      city: "",
      street: "",
      home: "",
      typeOfDocument: "",
      serial: "",
      numberOfDocument: "",
      receivedFrom: "",
      dateOfReceive: "",
      isSuccess: false,
    };
  },
  validations() {
    return {
      name: { required },
      surname: { required },
      dateOfBirth: { required },
      phoneNumber: { isPhoneNumberCorrect },
      selectedGroups: { required },
      city: { required },
      typeOfDocument: { required },
      dateOfBirth: { isDateCorrect },
      dateOfReceive: { isDateCorrect },
    };
  },
  methods: {
    updateValue(inputInfo) {
      this[inputInfo.field] = inputInfo.value;
    },
    submit() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.isSuccess = true;
        this.resetForm();
      }
    },
    closeCustomSelect(e) {
      const target = e.target;
      if (!target.closest(".multi-select") && this.currentOpenDropMenu && e.target.className !== "selected-item") {
        this.currentOpenDropMenu = "";
      }
    },
    resetForm() {
      for (let property in this.$data) {
        switch (property) {
          case "selectedGroups":
            this[property] = [];
            break;
          case "sendMessage":
            this[property] = true;
            break;
          case "phoneNumber":
            this[property] = "+7";
            break;
          case "isSuccess":
            break;
          default:
            this[property] = "";
            break;
        }
      }
      this.v$.$reset();
    },
  },
};
</script>