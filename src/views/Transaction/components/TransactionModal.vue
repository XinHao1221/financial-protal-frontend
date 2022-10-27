<template>
  <div>
    <modal
      v-model="showModal"
      :show-loading="showLoading"
      :before-close="resetModal"
      @closed="handleModalClosed"
    >
      <template v-slot:header>
        <span>Transaction</span>
        <div class="style-delete-icon" v-if="isEditForm">
          <i class="bi bi-trash3"></i>
        </div>
      </template>
      <template v-slot:body>
        <category-button
          :buttons="categoryButtons"
          @on-change="setSelectedTab"
          :selected-tab-id="selectedTabID"
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
            :button-text="isEditForm ? 'Edit' : 'Save'"
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
  convertDatetimePickerFormat,
  convertDateTimeToTimezone
} from '@/common/helpers/DateTimeHelpers';

export default {
  name: 'TransactionModal',
  emits: ['update:modelValue', 'modal-closed'],
  components: { Modal, SmartInput, DefaultButton, CategoryButton },
  props: {
    modelValue: Boolean,
    editFormSettings: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      datetime: null,
      account: null,
      type: null,
      amount: null,
      description: null,
      selectedTabID: 1,
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
    isIncome() {
      return this.categoryButtons.find(
        (button) => button.id === this.selectedTabID
      ).value;
    },
    isEditForm() {
      return this.editFormSettings ? true : false;
    },
    ...mapGetters(['categories', 'accounts'])
  },
  watch: {
    isEditForm: {
      immediate: true,
      handler(value) {
        // If it is edit form
        if (value) {
          clearInterval(this.refreshDateTime);
          this.fetchTransactionDetails();
        } else {
          // Set default datetime
          this.setDefaultDatetime();
          // Assign latest new datetime always
          this.refreshDateTime = setInterval(
            () => this.setDefaultDatetime(),
            1000
          );
        }
      }
    }
  },
  methods: {
    setDefaultDatetime() {
      // Get current date
      this.datetime = new Date();
    },
    async saveTransaction() {
      this.showLoading = true;

      const formattedDatetime = convertDatetimePickerFormat(this.datetime);

      const payload = {
        is_income: this.isIncome,
        amount: parseFloat(this.amount),
        account_id: this.account.id,
        category_id: this.type.id,
        datetime: convertDateTimeToUTC({
          datetime: formattedDatetime
        })
      };

      try {
        // If is edit transaction
        if (this.isEditForm) {
          await transactionRepo.update({
            id: this.editFormSettings.id,
            payload: payload
          });
        } else {
          await transactionRepo.post({
            payload: payload
          });
        }

        this.showLoading = false;
        this.$emit('updated');
      } catch (error) {
        console.log(error);
      }
    },
    setSelectedTab(event) {
      this.selectedTabID = event;
    },
    resetModal() {
      this.amount = null;
      this.description = null;
      this.selectedTabID = 1;
      this.showLoading = false;
    },
    async fetchTransactionDetails() {
      this.showLoading = true;
      try {
        const { data } = await transactionRepo.getById({
          id: this.editFormSettings.id
        });

        // Assign data
        this.datetime = convertDateTimeToTimezone({
          datetime: data.datetime
        });
        this.type = this.categories.find(
          (category) => category.id === data.category_id
        );
        this.account = this.accounts.find(
          (account) => account.id === data.account_id
        );
        this.amount = parseFloat(data.amount).toFixed(2);
        this.description = data.description;
      } catch (error) {
        console.log(error);
      }
      this.showLoading = false;
    },
    handleModalClosed() {
      this.$emit('modal-closed');
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.style-delete-icon {
  display: flex;
  position: absolute;
  top: 1.8rem;
  right: 4.5rem;
  font-size: 1.3rem;
  color: $red;
}
</style>
