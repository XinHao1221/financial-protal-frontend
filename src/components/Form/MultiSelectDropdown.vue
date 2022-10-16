<template>
  <vue-multiselect
    :options="options"
    v-model="selectedItem"
    track-by="name"
    label="name"
    :allow-empty="false"
    deselect-label="Can't remove this value"
  />
</template>

<script>
import VueMultiselect from 'vue-multiselect';

export default {
  name: 'MultiSelectDropdown',
  emits: ['update:modelValue'],
  props: {
    options: { type: Array, required: true },
    modelValue: { required: true }
  },
  components: { VueMultiselect },
  computed: {
    selectedItem: {
      set(value) {
        this.$emit('update:modelValue', value);
      },
      get() {
        return this.modelValue;
      }
    }
  },
  created() {
    this.selectedItem = this.options[0];
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="scss">
.multiselect__tags {
  border: 1px solid $border_color;
  border-radius: 5px;
  height: 48px;
  display: flex;
  align-items: center;
}

.multiselect__select {
  height: 48px;
}
</style>
