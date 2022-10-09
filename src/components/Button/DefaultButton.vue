<template>
  <div
    class="style-button d-flex justify-content-center align-items-center scss-clickable"
  >
    <span v-if="buttonText">{{ buttonText }}</span>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DefaultButton',
  props: {
    buttonText: {
      type: String,
      required: false
    }
  },
  data() {
    return {};
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
}
</style>
