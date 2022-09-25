<template>
  <div>
    <!-- <small-card :settings="incomeCardSettings" /> -->

    <div class="scss-container mt-5" style="padding: 2rem">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :sort-options="{ enabled: false }"
        :group-options="{
          enabled: true
        }"
        styleClass="vgt-table table table-hover mb-0"
      >
        <template v-slot:table-row="props">
          <template v-if="props.column.field === 'amount'">
            <span :class="getAmountStyle(props)">{{
              props.row.amount.toFixed(2)
            }}</span>
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

export default {
  name: 'Transaction',
  components: { VueGoodTable },
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
          field: 'datetime'
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
              test: 0
            },
            {
              datetime: '2:30am',
              type: 'Food',
              account: 'Cash',
              amount: 120.0,
              test: 1
            }
          ]
        }
      ]
    };
  },
  methods: {
    getAmountStyle(props) {
      if (props.row.test) {
        return 'scss-primary-color scss-bold';
      }
    }
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
</style>
