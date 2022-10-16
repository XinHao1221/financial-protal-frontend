<template>
  <div>
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      class="spinner-container"
      color="#2dce89"
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
  display: flex;
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
}
</style>
