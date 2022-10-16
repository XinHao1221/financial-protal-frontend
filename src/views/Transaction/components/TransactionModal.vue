<template>
  <div>
    <modal v-model="showModal">
      <template v-slot:header>Transaction</template>
      <template v-slot:body>
        <form @click.prevent="saveTransaction">
          <smart-input
            type="datetimePicker"
            label="Date/Time"
            v-model="datetime"
            :required="true"
          />
          <smart-input
            type="searchable-dropdown"
            label="Account"
            :options="accounts"
            v-model="account"
            :required="true"
          />
          <smart-input
            type="searchable-dropdown"
            label="Type"
            :options="categories"
            v-model="type"
            :required="true"
          />
          <smart-input
            type="number"
            label="Amount"
            v-model="amount"
            :required="true"
          />
          <smart-input
            type="description"
            label="Description"
            v-model="description"
          />

          <default-button button-text="Save" class="w-100 mt-5" />
        </form>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import SmartInput from '@/components/Form/SmartInput.vue';
import { mapGetters } from 'vuex';
import DefaultButton from '@/components/Button/DefaultButton.vue';
import { transactionRepo } from '@/api';
import {
  convertDateTimeToUTC,
  convertDatetimePickerFormat
} from '@/common/helpers/DateTimeHelpers';

export default {
  name: 'TransactionModal',
  emits: ['update:modelValue'],
  components: { Modal, SmartInput, DefaultButton },
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
    },
    ...mapGetters(['categories', 'accounts'])
  },
  data() {
    return {
      datetime: null,
      account: null,
      type: null,
      amount: null,
      description: null
    };
  },
  methods: {
    setDefaultDatetime() {
      // Get current date
      this.datetime = new Date();
    },
    async saveTransaction() {
      const formattedDatetime = convertDatetimePickerFormat(this.datetime);

      try {
        await transactionRepo.addTransaction({
          is_income: 0,
          amount: parseFloat(this.amount),
          account_id: this.account.id,
          category_id: this.type.id,
          datetime: convertDateTimeToUTC({ datetime: formattedDatetime })
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.setDefaultDatetime();
  }
};
</script>