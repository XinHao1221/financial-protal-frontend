<template>
  <div>
    <modal v-model="showModal" :show-loading="showLoading">
      <template v-slot:header>Transaction</template>
      <template v-slot:body>
        <category-button
          :buttons="categoryButtons"
          @selected-tab="setSelectedTab"
        />
        <form @submit.prevent="saveTransaction">
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

          <default-button
            button-text="Save"
            class="w-100 mt-5"
            :disabled="!isFormCompleted"
            :button-class="buttonStyle"
          />
        </form>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import SmartInput from '@/components/Form/SmartInput.vue';
import CategoryButton from '@/components/Button/CategoryButton.vue';
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
  components: { Modal, SmartInput, DefaultButton, CategoryButton },
  props: {
    modelValue: Boolean
  },
  data() {
    return {
      datetime: null,
      account: null,
      type: null,
      amount: null,
      description: null,
      isIncome: 1,
      showLoading: false,
      categoryButtons: [
        {
          id: 0,
          text: 'Income',
          color: '#2dce89',
          value: 1
        },
        {
          id: 1,
          text: 'Expense',
          color: '#f23648',
          value: 0
        }
      ]
    };
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
    isFormCompleted() {
      return ![null, ''].includes(this.amount);
    },
    buttonStyle() {
      return this.isIncome ? '' : 'scss-button-red';
    },
    ...mapGetters(['categories', 'accounts'])
  },
  methods: {
    setDefaultDatetime() {
      // Get current date
      this.datetime = new Date();
    },
    async saveTransaction() {
      this.showLoading = true;

      const formattedDatetime = convertDatetimePickerFormat(this.datetime);

      try {
        await transactionRepo.addTransaction({
          is_income: this.isIncome,
          amount: parseFloat(this.amount),
          account_id: this.account.id,
          category_id: this.type.id,
          datetime: convertDateTimeToUTC({ datetime: formattedDatetime })
        });

        this.showLoading = false;
        this.$emit('updated');
      } catch (error) {
        console.log(error);
      }
    },
    setSelectedTab(event) {
      this.isIncome = event.value;
    }
  },
  created() {
    this.setDefaultDatetime();

    // Assign latest new datetime always
    setInterval(() => this.setDefaultDatetime(), 1000);
  }
};
</script>
