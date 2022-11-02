<template>
  <div>
    <!-- Header -->
    <div class="title mb-3">Forgot Password?</div>
    <div
      class="p-2 scss-text-light scss-text-medium"
      style="margin-bottom: 60px"
    >
      No worries! Provide us with your email address. We are here to assist you
      to reset!
    </div>

    <Form @submit="sendPasswordResetLink" :validation-schema="validationSchema">
      <Field name="email" v-slot="{ handleChange, errorMessage }">
        <smart-input
          label="Email Address"
          type="text"
          v-model="emailAddress"
          @update:modelValue="handleChange"
          :validationMessage="errorMessage"
        />
      </Field>

      <default-button buttonText="Forgot Password" class="w-100 mt-5" />
    </Form>
    <div class="mt-3">
      <span class="scss-primary-color scss-clickable" @click="goToLogin"
        >Back to Login</span
      >
    </div>
  </div>
</template>

<script>
import SmartInput from '@/components/Form/SmartInput';
import DefaultButton from '@/components/Button/DefaultButton';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { validationRules } from '@/common/validation/validationRules';

export default {
  name: 'ForgotPassword',
  components: { SmartInput, DefaultButton, Form, Field },
  data() {
    return {
      emailAddress: null
    };
  },
  computed: {
    validationSchema() {
      return yup.object({ email: validationRules.email });
    }
  },
  methods: {
    sendPasswordResetLink() {},
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: $font_large;
  font-weight: $bold;
  color: $black;
}
</style>
