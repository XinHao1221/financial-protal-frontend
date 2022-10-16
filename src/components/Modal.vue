<template>
  <div>
    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
    >
      <!-- Close Button -->
      <div class="modal__close scss-clickable" @click="showModal = false">
        <i class="bi bi-x"></i>
      </div>
      <!-- Header -->
      <span class="modal__title">
        <slot name="header"></slot>
      </span>
      <!-- Body -->
      <div class="modal_content">
        <slot name="body"></slot>
      </div>

      <loading-spinner v-if="showLoading" />
    </vue-final-modal>
  </div>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  name: 'Modal',
  emits: ['update:modelValue'],
  props: {
    modelValue: Boolean,
    showLoading: { type: Boolean, default: false }
  },
  components: { VueFinalModal, LoadingSpinner },
  computed: {
    showModal: {
      set(value) {
        this.$emit('update:modelValue', value);
      },
      get() {
        return this.modelValue;
      }
    }
  }
};
</script>

<style scoped>
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1.8rem 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
  width: 60%;
}

@media only screen and (max-width: 1000px) {
  :deep(.modal-content) {
    width: 95%;
  }
}

.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: start;
  margin-bottom: 30px;
}

.modal__close {
  position: absolute;
  top: 1.8rem;
  right: 1.8rem;
  font-size: 1.5rem;
}
</style>
