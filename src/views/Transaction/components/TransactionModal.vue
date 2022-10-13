<template>
  <div>
    <modal v-model="showModal">
      <template v-slot:header>Transaction</template>
      <template v-slot:body>
        <smart-input type="text" label="Date/Time" v-model="dateTime" />
        <smart-input type="text" label="Account" v-model="account" />
        <smart-input type="text" label="Type" v-model="type" />
        <smart-input type="text" label="Amount" v-model="amount" />
        <smart-input
          type="description"
          label="Description"
          v-model="description"
        />
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import SmartInput from '@/components/Form/SmartInput.vue';

export default {
  name: 'TransactionModal',
  emits: ['update:modelValue'],
  components: { Modal, SmartInput },
  props: {
    modelValue: Boolean
  },
  computed: {
    showModal: {
      set(value) {
        this.$emit('update:modelValue', value);
      },
      get() {
        return this.modelValue;
      }
    }
  },
  data() {
    return {
      dateTime: null,
      account: null,
      type: null,
      amount: null,
      description: null
    };
  }
};
</script>
