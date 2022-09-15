<template>
  <vue-password classes="scss-input-container" v-model="password" type="text" />
</template>

<script>
import VuePassword from 'vue-password';
export default {
  name: 'PasswordInputField',
  components: {
    VuePassword
  },
  data() {
    return {
      password: null
    };
  }
};
</script>
