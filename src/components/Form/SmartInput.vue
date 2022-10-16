<template>
  <div class="d-flex flex-column mb-4">
    <div class="input-label">
      <span class="scss-bold">{{ label }}</span>
      <span class="scss-red-text" v-if="required">&nbsp;*</span>
    </div>
    <!-- Input Fields -->
    <!-- Password Input Fields -->
    <!-- <password-input-field v-if="type === 'password'" /> -->
    <!-- <input
      v-if="type === 'password'"
      type="password"
      class="scss-input-container"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    /> -->

    <!-- Textare for description -->
    <textarea
      v-if="type === 'description'"
      :value="modelValue"
      class="scss-input-container"
      :rows="3"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>

    <!-- Date Range Picker -->
    <datepicker
      v-else-if="type === 'dateRangePicker'"
      v-model="value"
      range
      format="dd/MM/yyyy"
      preview-format="dd/MM/yyyy"
      auto-apply
      :enableTimePicker="false"
    />

    <!-- Date Range Picker -->
    <datepicker
      v-else-if="type === 'datetimePicker'"
      v-model="value"
      format="dd/MM/yyyy hh:mm a"
      preview-format="dd/MM/yyyy hh:mm a"
      auto-apply
    />

    <!-- Dropdown -->
    <select
      v-else-if="type === 'dropdown'"
      :value="modelValue"
      class="scss-input-container"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.id"
        :selected="index === 0"
      >
        {{ option.name }} {{ index }}
      </option>
    </select>

    <!-- Multiple Select Dropdown -->
    <MultiSelectDropdown
      v-else-if="type === 'searchable-dropdown'"
      :options="options"
      v-model="value"
    />

    <!-- Others input type -->
    <input
      v-else
      :type="type"
      class="scss-input-container"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import MultiSelectDropdown from '@/components/Form/MultiSelectDropdown.vue';

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
    options: {
      type: Array
    },
    modelValue: {
      type: [String, Array, Object, Date]
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  components: { Datepicker, MultiSelectDropdown },
  computed: {
    value: {
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

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
