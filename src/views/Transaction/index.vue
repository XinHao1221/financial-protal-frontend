<template>
  <div>
    <!-- <small-card :settings="incomeCardSettings" /> -->

    <div class="scss-container mt-5" style="padding: 2rem">
      <div class="d-flex flex-row">
        <smart-input
          type="dateRangePicker"
          label="Date Range"
          class="style-date-input"
          v-model="dateRange"
        />
        <div class="flex-grow-1">&nbsp;</div>
        <div>
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
        <vue-good-table
          :columns="columns"
          :rows="populatedTransactions"
          :sort-options="{ enabled: false }"
          :group-options="{
            enabled: true
          }"
          styleClass="vgt-table table table-hover mb-0"
        >
          <template v-slot:table-row="props">
            <template v-if="props.column.field === 'amount'">
              <span :class="getAmountStyle(props)">{{ props.row.amount }}</span>
            </template>
          </template>
        </vue-good-table>
      </div>
    </div>

    <transaction-modal v-model="showModal" @updated="refreshTransactionList" />
  </div>
</template>

<script>
// import SmallCard from '../../components/SmallCard.vue';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';

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
import TransactionModal from './components/TransactionModal.vue';
import { convertDateTimeToUTC } from '@/common/helpers/DateTimeHelpers';
import LoadingSpinner from '@/components/LoadingSpinner';

export default {
  name: 'Transaction',
  components: {
    VueGoodTable,
    SmartInput,
    DefaultButton,
    TransactionModal,
    LoadingSpinner
  },
  inject: ['getIsMobile'],
  data() {
    return {
      showLoading: false,
      showModal: false,
      incomeCardSettings: {
        title: 'INCOME  (Month)',
        content: 'RM 1200',
        footer: {
          content: '+RM200',
          contentColorClass: 'scss-primary-color',
          description: 'todays'
        },
        icon: {
          iconClass: 'bi bi-cash-coin',
          backgroundColor: '#ff0000'
        }
      },
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
      dateRange: null
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
                  formatDate({ date: day.split(' ')[0] }) ===
                  formatDate({
                    date: data.datetime.split(' ')[1],
                    format: dateTimeFormat.DATE_FORMAT
                  })
              ) // Compare 2022-05-08 11:50 AM === Sunday, 08/05/2022
              .map((data) => {
                return {
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
    isMobile() {
      return this.getIsMobile();
    },
    ...mapGetters(['accounts', 'categories'])
  },
  methods: {
    getAmountStyle(props) {
      if (props.row.isIncome) {
        return 'scss-primary-color scss-bold';
      }
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
    getAccount(accountId) {
      return this.accounts.find((account) => account.id === accountId).name;
    },
    getCategory(categoryId) {
      return this.categories.find((category) => category.id === categoryId)
        .name;
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
    }
  },
  created() {
    this.setDefaultDateRange();
    // Set page to ready
    this.$emit('page-ready', true);
    this.fetchTransactions();
  }
};
</script>

<style lang="scss" scoped>
.vgt-wrap {
  font-size: 17px;
}
.vgt-table {
  font-size: 17px;
}

.style-button {
  width: 6rem;
}

.style-date-input {
  max-width: 400px;
  width: 100%;
}
</style>
