<template>
  <div class="d-flex flex-column mb-4">
    <div class="input-label">{{ field.label }}</div>
    <!-- Input Fields -->
    <input
      v-if="field.type === 'text'"
      type="text"
      class="scss-input-container"
      :placeholder="field.placeholder"
    />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    field: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.input-label {
  font-weight: $font-weight;
  text-align: start;
  margin-bottom: 2px;
}

input:focus {
  outline: none !important;
  border: 1px solid rgb(163, 163, 163);
  box-shadow: $box-shadow;
}
</style>
