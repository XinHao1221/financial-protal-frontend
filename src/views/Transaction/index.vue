<template>
  <div>
    <template v-for="data in incomeCardData" :key="data">
      <small-card :settings="data" class="me-3 mb-3" style="float: left" />
    </template>

    <div style="clear: both">&nbsp;</div>

    <div class="scss-container" style="padding: 2rem">
      <div class="d-flex flex-row">
        <smart-input
          type="dateRangePicker"
          label="Date Range"
          class="style-date-input"
          v-model="dateRange"
        />
        <div class="flex-grow-1">&nbsp;</div>
        <div v-if="!isMobile">
          <default-button class="style-button" @click="showModal = true">
            <i class="bi bi-plus-circle" style="font-size: 17px"></i>
            <span class="ms-2">Add</span>
          </default-button>
        </div>
      </div>

      <div style="position: relative">
        <div class="test-spinner">
          <loading-spinner v-if="showLoading" />
        </div>
        <!-- Transaction List -->
        <data-table
          :columns="columns"
          :rows="sortedPopulatedTransactions"
          :group-options-enabled="true"
          @row-click="transactionSelected"
        >
          <template v-slot:table-row="{ props }">
            <template v-if="props.column.field === 'amount'">
              <span :class="getAmountStyle(props)">{{ props.row.amount }}</span>
            </template>
          </template>
        </data-table>
      </div>
    </div>

    <transaction-modal
      v-model="showModal"
      @updated="refreshTransactionList"
      :edit-form-settings="editFormSettings"
      @modal-closed="handleModalClosed"
    />
    <floating-button v-if="isMobile" @click="showModal = true" />
  </div>
</template>

<script>
import SmallCard from '@/components/SmallCard.vue';
import DataTable from '@/components/DataTable.vue';

import { transactionRepo } from '@/api';

import {
  convertDateTimeToTimezone,
  convertDatetimePickerFormat,
  formatDate,
  formatTime
} from '@/common/helpers/DateTimeHelpers';
import { dateTimeFormat } from '@/common/constant/DateTimeFormat';
import { mapGetters } from 'vuex';
import SmartInput from '@/components/Form/SmartInput.vue';
import DefaultButton from '@/components/Button/DefaultButton.vue';
import moment from 'moment-timezone';
import { convertDateTimeToUTC } from '@/common/helpers/DateTimeHelpers';
import LoadingSpinner from '@/components/LoadingSpinner';
import FloatingButton from '@/components/Button/FloatingButton.vue';
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Transaction',
  emits: ['page-ready'],
  components: {
    SmartInput,
    DefaultButton,
    TransactionModal: defineAsyncComponent(() =>
      import('./components/TransactionModal.vue')
    ),
    LoadingSpinner,
    FloatingButton,
    SmallCard,
    DataTable
  },
  inject: ['getIsMobile'],
  data() {
    return {
      showLoading: false,
      showModal: false,
      columns: [
        {
          label: 'Date/Time',
          field: 'time'
        },
        {
          label: 'Type',
          field: 'type'
        },
        {
          label: 'Account',
          field: 'account'
        },
        {
          label: 'Amount (RM)',
          field: 'amount',
          type: 'number'
        }
      ],
      transactions: null,
      dateRange: null,
      transactionSummary: null,
      editFormSettings: null
    };
  },
  computed: {
    populatedTransactions() {
      if (this.transactions === null) {
        return [];
      }

      const vueGoodTableSettings = { mode: 'span', html: false };
      const dayFormat = `${dateTimeFormat.NAME_OF_DAY}, ${dateTimeFormat.DATE_FORMAT}`;

      // Covert all datetime to timezone
      this.transactions.forEach(
        (data) =>
          (data.datetime = convertDateTimeToTimezone({
            datetime: data.datetime
          }))
      );

      return this.transactions.reduce((acc, transaction) => {
        // Format to Exp: Monday, 08/10/2022
        const day = formatDate({
          date: transaction.datetime,
          format: dateTimeFormat.API_DATE_TIME_FORMAT,
          outputFormat: dayFormat
        });

        if (!acc.some((data) => data.label === day)) {
          acc.push({
            label: day,
            ...vueGoodTableSettings,
            children: this.transactions
              .filter(
                (data) =>
                  formatDate({ date: data.datetime.split(' ')[0] }) ===
                  formatDate({
                    date: day.split(' ')[1],
                    format: dateTimeFormat.DATE_FORMAT
                  })
              ) // Compare 2022-05-08 11:50 AM === Sunday, 08/05/2022
              .sort((a, b) => {
                if (b.datetime < a.datetime) {
                  return -1;
                }
                return 1;
              })
              .map((data) => {
                return {
                  id: data.id,
                  time: formatTime({ time: data.datetime }),
                  type: this.getCategory(data.category_id),
                  account: this.getAccount(data.account_id),
                  amount: parseFloat(data.amount).toFixed(2),
                  isIncome: data.is_income
                };
              })
          });
        }

        return acc;
      }, []);
    },
    sortedPopulatedTransactions() {
      const copy = this.populatedTransactions;

      return copy.sort((a, b) => {
        const formatedA = formatDate({
          date: a.label.split(', ')[1],
          format: dateTimeFormat.DATE_FORMAT,
          outputFormat: dateTimeFormat.API_DATE_FORMAT
        });
        const formatedB = formatDate({
          date: b.label.split(', ')[1],
          format: dateTimeFormat.DATE_FORMAT,
          outputFormat: dateTimeFormat.API_DATE_FORMAT
        });

        return new Date(formatedB) - new Date(formatedA);
      });
    },
    isMobile() {
      return this.getIsMobile();
    },
    incomeCardData() {
      return [
        {
          title: 'Income  (Month)',
          content: `RM ${parseFloat(
            this.transactionSummary?.income_total
          ).toFixed(2)}`,
          footer: {
            content: `+RM ${parseFloat(
              this.transactionSummary?.todays_income
            ).toFixed(2)}`,
            contentColorClass: 'scss-primary-color',
            description: 'todays'
          },
          icon: {
            iconClass: 'bi bi-cash-coin',
            backgroundColor: '#2dce89'
          }
        },
        {
          title: 'Expenses  (Month)',
          content: `RM ${parseFloat(
            this.transactionSummary?.expenses_total
          ).toFixed(2)}`,
          footer: {
            content: `+RM ${parseFloat(
              this.transactionSummary?.todays_expenses
            ).toFixed(2)}`,
            contentColorClass: 'scss-red-text',
            description: 'todays'
          },
          icon: {
            iconClass: 'bi bi-cash-coin',
            backgroundColor: '#f23648'
          }
        },
        {
          title: 'Transactions (Month)',
          content: this.transactionSummary?.total_transaction,
          footer: {
            content: `+${this.transactionSummary?.todays_transactions}`,
            contentColorClass: 'scss-primary-color',
            description: 'todays'
          },
          icon: {
            iconClass: 'bi bi-wallet2',
            backgroundColor: '#36b5ff'
          }
        }
      ];
    },
    ...mapGetters(['accounts', 'categories'])
  },
  watch: {
    dateRange() {
      if (this.transactions != null) this.fetchTransactions();
    }
  },
  methods: {
    getAmountStyle(props) {
      if (props.row.isIncome) {
        return 'scss-primary-color';
      }

      return 'scss-red-text';
    },
    async fetchTransactions() {
      this.showLoading = true;
      const startDate = convertDatetimePickerFormat(this.dateRange[0]);
      const endDate = convertDatetimePickerFormat(this.dateRange[1]);

      // Fetch data
      try {
        const response = await transactionRepo.getTransactions(
          convertDateTimeToUTC({ datetime: startDate }),
          convertDateTimeToUTC({ datetime: endDate })
        );
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }

      this.showLoading = false;
    },
    async fetchTransactionSummary() {
      const startDate = convertDatetimePickerFormat(this.dateRange[0]);
      const endDate = convertDatetimePickerFormat(this.dateRange[1]);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      try {
        const response = await transactionRepo.getTransactionSummary(
          convertDateTimeToUTC({ datetime: startDate }),
          convertDateTimeToUTC({ datetime: endDate }),
          timezone
        );
        this.transactionSummary = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    getAccount(accountId) {
      return this.accounts.find((account) => account.id === accountId).name;
    },
    getCategory(categoryId) {
      return this.categories.find((category) => category.id === categoryId)
        .name;
    },
    handleModalClosed() {
      this.editFormSettings = null;
    },
    transactionSelected(params) {
      this.editFormSettings = {
        id: params.row.id
      };

      // Show modal
      this.showModal = true;
    },
    setDefaultDateRange() {
      this.dateRange = [
        moment().startOf('month')._d,
        moment().endOf('month')._d
      ];
    },
    refreshTransactionList() {
      this.showModal = false;
      this.fetchTransactions();
      this.fetchTransactionSummary();
    },
    async loadData() {
      await Promise.all([
        this.fetchTransactions(),
        this.fetchTransactionSummary()
      ]);

      // Set page to ready
      this.$emit('page-ready', true);
    }
  },
  created() {
    this.setDefaultDateRange();

    this.loadData();
  }
};
</script>

<style lang="scss" scoped>
.style-button {
  width: 6rem;
}

.style-date-input {
  max-width: 400px;
  width: 100%;
}
</style>
