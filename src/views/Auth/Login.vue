<template>
  <div>
    <!-- Header -->
    <div class="title mb-3">Sign In</div>
    <div class="p-2 scss-text-light mb-5 scss-text-medium">
      Enter username and password to access your financial portal.
    </div>

    <!-- Login Form -->
    <form style="width: 100%" @submit.prevent="login">
      <!-- Input fields -->
      <smart-input
        label="Email Address"
        placeholder="Email Address"
        class="mt-3"
        v-model="email"
      />
      <smart-input
        type="password"
        label="Password"
        placeholder="Password"
        class="mt-3"
        v-model="password"
      />

      <!-- Forgot password -->
      <div class="style-forgot-password">Forgot Password?</div>

      <!-- Login button -->
      <default-button class="my-5 w-100" button-text="Sign In" />
    </form>
  </div>
</template>

<script>
import SmartInput from '../../components/Form/SmartInput.vue';
import DefaultButton from '../../components/Button/DefaultButton.vue';
import { useToast } from 'vue-toastification';
import { authRepo } from '@/api';
import { setToken } from '@/api/AuthTokenService.js';
import { mapMutations } from 'vuex';

export default {
  name: 'login',
  components: {
    SmartInput,
    DefaultButton
  },
  data() {
    return {
      email: null,
      password: null
    };
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
    ...mapMutations(['showLoading'])
  },
  created() {}
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

.style-forgot-password:hover {
  cursor: pointer;
}
</style>
