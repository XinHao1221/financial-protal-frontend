<template>
  <button
    class="style-button d-flex justify-content-center align-items-center scss-clickable"
    :disabled="disabled"
  >
    <span v-if="buttonText">{{ buttonText }}</span>

    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'DefaultButton',
  props: {
    buttonText: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.style-button {
  height: 48px;
  background-color: $primary_color;
  color: white;
  font-weight: $bold;
  border-radius: 10px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  border: none;
}

button:disabled,
button[disabled] {
  opacity: 0.6;
}
</style>
