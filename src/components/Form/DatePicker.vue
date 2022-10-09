<template>
  <datepicker
    v-model="dateRange"
    @update:modelValue="handleUpdate"
    range
    format="MM/dd/yyyy"
    preview-format="MM/dd/yyyy"
    auto-apply
  />
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'DatePicker',
  components: { Datepicker },
  data() {
    return {
      dateRange: null
    };
  },
  methods: {
    handleUpdate(data) {
      this.$emit('update:value', data);
    }
  }
};
</script>
