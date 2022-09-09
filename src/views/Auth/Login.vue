<template>
  <general-frame>
    <!-- Header -->
    <h5 class="mb-3">Sign In</h5>
    <div class="p-2 scss-text-light">
      Enter username and password to access your financial portal.
    </div>

    <!-- Login Form -->
    <form>
      <!-- Input fields -->
      <div v-for="field in fields" :key="field" class="mt-4">
        <smart-input :field="field" />
      </div>

      <!-- Forgot password -->
      <div class="style-forgot-password">Forgot Password?</div>

      <!-- Login button -->
      <default-button />
    </form>
  </general-frame>
</template>

<script>
import SmartInput from "../../components/Form/SmartInput.vue";
import GeneralFrame from "../../components/GeneralFrame.vue";
import DefaultButton from "../../components/Button/DefaultButton.vue";
export default {
  name: "login",
  components: {
    GeneralFrame,
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
  },
  created() {
    this.setUpForm();
  },
};
</script>

<style lang="scss" scoped>
h5 {
  font-weight: $font_weight;
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
