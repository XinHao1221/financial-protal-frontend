<template>
  <div
    class="style-button d-flex justify-content-center align-items-center scss-clickable"
  >
    {{ buttonText }}
  </div>
</template>

<script>
export default {
  name: 'DefaultButton',
  props: {
    buttonText: {
      type: String,
      required: true
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
}
</style>
