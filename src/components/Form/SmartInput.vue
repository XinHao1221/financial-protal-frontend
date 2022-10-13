<template>
  <div class="d-flex flex-column mb-4">
    <div class="input-label">{{ label }}</div>
    <!-- Input Fields -->
    <input
      v-if="type === 'text'"
      type="text"
      class="scss-input-container"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <!-- Password Input Fields -->
    <!-- <password-input-field v-if="type === 'password'" /> -->
    <input
      v-if="type === 'password'"
      type="password"
      class="scss-input-container"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <!-- Textare for description -->
    <textarea
      v-if="type === 'description'"
      :value="modelValue"
      class="scss-input-container"
      :rows="3"
    ></textarea>

    <!-- Date Range Picker -->
    <datepicker
      v-if="type === 'dateRangePicker'"
      v-model="dateRange"
      range
      format="dd/MM/yyyy"
      preview-format="dd/MM/yyyy"
      auto-apply
    />
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'Input',
  emits: ['update:modelValue'],
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    modelValue: {
      type: [String, Array]
    }
  },
  components: { Datepicker },
  computed: {
    dateRange: {
      set(value) {
        this.$emit('update:modelValue', value);
      },
      get() {
        return this.modelValue;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.input-label {
  font-weight: $bold;
  text-align: start;
  margin-bottom: 3px;
}

input[type='text'] {
  border-color: rgb(197, 197, 197);
}

textarea:focus,
input:focus {
  outline: none !important;
  border: 1px solid rgb(163, 163, 163);
  box-shadow: $box-shadow;
}
</style>
