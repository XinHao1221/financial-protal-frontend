<template>
  <div class="d-flex flex-column mb-4">
    <div class="input-label">{{ label }}</div>
    <!-- Input Fields -->
    <input
      v-if="type === 'text'"
      type="text"
      class="scss-input-container"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />

    <!-- Password Input Fields -->
    <!-- <password-input-field v-if="type === 'password'" /> -->
    <input
      v-if="type === 'password'"
      type="password"
      class="scss-input-container"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
  </div>
</template>

<script>
// import PasswordInputField from './PasswordInputField.vue';

export default {
  name: 'Input',
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
    value: String
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

input:focus {
  outline: none !important;
  border: 1px solid rgb(163, 163, 163);
  box-shadow: $box-shadow;
}
</style>
