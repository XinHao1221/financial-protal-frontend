<template>
  <div>
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      class="spinner-container"
    />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'LoadingSpinner',
  components: { Loading },
  data() {
    return {
      isLoading: true
    };
  }
};
</script>

<style scoped>
.spinner-container {
  z-index: 1;
}
</style>
