<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :sort-options="{ enabled: sortOptionsEnabled }"
      :group-options="{
        enabled: groupOptionsEnabled
      }"
      @row-click="handleRowClick"
      styleClass="vgt-table table table-hover mb-0"
    >
      <template v-slot:table-row="props">
        <slot name="table-row" :props="props"></slot>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';

export default {
  name: 'DataTable',
  components: { VueGoodTable },
  props: {
    columns: {
      type: Array,
      required: false
    },
    rows: {
      type: Array,
      required: false
    },
    groupOptionsEnabled: {
      type: Boolean,
      default: false
    },
    sortOptionsEnabled: {
      type: Boolean,
      default: false
    },
    rowClickFunction: {
      type: Function,
      required: false
    }
  },
  data() {
    return {};
  },
  methods: {
    handleRowClick(params) {
      this.$emit('row-click', params);
    }
  }
};
</script>

<style scoped>
.vgt-wrap {
  font-size: 17px;
}
.vgt-table {
  font-size: 17px;
}
</style>
