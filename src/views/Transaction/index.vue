<template>
  <div>
    <!-- <small-card :settings="incomeCardSettings" /> -->

    <div class="scss-container mt-5" style="padding: 2rem">
      <div class="d-flex flex-row">
        <smart-input type="text" label="Date Range" />
        <div class="flex-grow-1">&nbsp;</div>
        <default-button class="style-button">
          <i class="bi bi-plus-circle" style="font-size: 17px"></i>
          <span class="ms-2">Add</span>
        </default-button>
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
</template>

<script>
// import SmallCard from '../../components/SmallCard.vue';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';
import { transactionRepo } from '@/api';
import {
  convertDateTimeToTimezone,
  formatDate,
  formatTime
} from '@/common/helpers/DateTimeHelpers';
import { dateTimeFormat } from '@/common/constant/DateTimeFormat';
import { mapGetters } from 'vuex';
import SmartInput from '../../components/Form/SmartInput.vue';
import DefaultButton from '../../components/Button/DefaultButton.vue';

export default {
  name: 'Transaction',
  components: { VueGoodTable, SmartInput, DefaultButton },
  data() {
    return {
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
      rows: [
        {
          mode: 'span', // span means this header will span all columns
          label: 'Monday, 01/09/2022', // this is the label that'll be used for the header
          html: false, // if this is true, label will be rendered as html
          children: [
            {
              datetime: '2:30am',
              type: 'Food',
              account: 'Cash',
              amount: 120.0,
              is_income: 0
            },
            {
              datetime: '2:30am',
              type: 'Food',
              account: 'Cash',
              amount: 120.0,
              is_income: 1
            }
          ]
        }
      ],
      transactions: null
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
              .filter((data) => {
                console.log(
                  formatDate({ date: day, format: dayFormat }),
                  formatDate({
                    date: data.datetime,
                    format: dateTimeFormat.API_DATE_TIME_FORMAT
                  })
                );
                return formatDate(day) === formatDate(data.datetime);
              })
              .map((data) => {
                return {
                  time: formatTime(data.datetime),
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
    ...mapGetters(['accounts', 'categories'])
  },
  methods: {
    getAmountStyle(props) {
      if (props.row.isIncome) {
        return 'scss-primary-color scss-bold';
      }
    },
    async fetchTransactions() {
      // Fetch data
      try {
        const response = await transactionRepo.getTransactions();
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
      // Set page to ready
      this.$emit('page-ready', true);
    },
    getAccount(accountId) {
      return this.accounts.find((account) => account.id === accountId).name;
    },
    getCategory(categoryId) {
      return this.categories.find((category) => category.id === categoryId)
        .name;
    }
  },
  created() {
    this.fetchTransactions();
    // this.$emit('page-ready', true);
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
</style>
