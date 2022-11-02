<template>
  <div>
    <!-- Header -->
    <div class="title mb-3">Sign In</div>
    <div class="p-2 scss-text-light mb-5 scss-text-medium">
      Enter username and password to access your financial portal.
    </div>

    <!-- Login Form -->
    <Form
      style="width: 100%"
      @submit="login"
      :validation-schema="validationSchema"
    >
      <!-- Input fields -->
      <Field name="email" v-slot="{ handleChange, errorMessage }">
        <smart-input
          label="Email Address"
          placeholder="Email Address"
          class="mt-3"
          v-model="email"
          @update:modelValue="handleChange"
          :validationMessage="errorMessage"
        />
      </Field>

      <Field name="password" v-slot="{ handleChange, errorMessage }">
        <smart-input
          type="password"
          label="Password"
          placeholder="Password"
          class="mt-3"
          v-model="password"
          @update:modelValue="handleChange"
          :validationMessage="errorMessage"
        />
      </Field>
      <!-- Forgot password -->
      <div
        class="style-forgot-password scss-clickable"
        @click="goToForgotPassword"
      >
        Forgot Password?
      </div>

      <!-- Login button -->
      <default-button class="my-5 w-100" button-text="Sign In" />
    </Form>
  </div>
</template>

<script>
import SmartInput from '@/components/Form/SmartInput.vue';
import DefaultButton from '@/components/Button/DefaultButton.vue';

import { useToast } from 'vue-toastification';
import { authRepo } from '@/api';
import { setToken } from '@/api/AuthTokenService.js';
import { mapMutations } from 'vuex';
import { validationRules } from '@/common/validation/validationRules';

import { Form, Field } from 'vee-validate';
import * as yup from 'yup';

export default {
  name: 'login',
  components: {
    SmartInput,
    DefaultButton,
    Form,
    Field
  },
  data() {
    return {
      email: null,
      password: null
    };
  },
  computed: {
    validationSchema() {
      return yup.object({
        email: validationRules.email,
        password: validationRules.required
      });
    }
  },
  methods: {
    async login() {
      this.showLoading(true);
      try {
        const response = await authRepo.login({
          email: this.email,
          password: this.password
        });

        setToken(response.data.access_token);
        this.showLoading(false);

        this.$router.push('/transaction');
      } catch (error) {
        this.showLoading(false);

        useToast().error(error.message);
      }
    },
    goToForgotPassword() {
      this.$router.push('/forgot-password');
    },
    ...mapMutations(['showLoading'])
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: $font_large;
  font-weight: $bold;
  color: $black;
}

.style-forgot-password {
  color: $primary_color;
  margin-top: -10px;
  text-align: start;
}
</style>
