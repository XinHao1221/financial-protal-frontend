<template>
  <div>
    <!-- Header -->
    <div class="title mb-3">Sign In</div>
    <div class="p-2 scss-text-light mb-5">
      Enter username and password to access your financial portal.
    </div>

    <!-- Login Form -->
    <form style="width: 100%">
      <!-- Input fields -->
      <div v-for="field in fields" :key="field" class="mt-3">
        <smart-input :field="field" />
      </div>

      <!-- Forgot password -->
      <div class="style-forgot-password">Forgot Password?</div>

      <!-- Login button -->
      <default-button class="my-5" button-text="Sign In" @click="login" />
    </form>
  </div>
</template>

<script>
import SmartInput from "../../components/Form/SmartInput.vue";
import DefaultButton from "../../components/Button/DefaultButton.vue";
import { useToast } from "vue-toastification";

export default {
  name: "login",
  components: {
    SmartInput,
    DefaultButton,
  },
  data() {
    return {
      fields: [],
    };
  },
  methods: {
    setUpForm() {
      this.fields = [
        {
          type: "text",
          label: "Email Address",
          placeholder: "Email Address",
        },
        {
          type: "text",
          label: "Password",
          placeholder: "Password",
        },
      ];
    },
    login() {
      useToast().error("I'm a toast!");
    },
  },
  created() {
    this.setUpForm();
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 30px;
  font-weight: $bold;
  color: $black;
}

.style-forgot-password {
  color: $primary_color;
  margin-top: -10px;
  text-align: start;
}

.style-forgot-password:hover {
  cursor: pointer;
}
</style>
