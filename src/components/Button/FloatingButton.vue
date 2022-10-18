<template>
  <div class="style-floating-button scss-clickable">
    <i class="bi bi-plus style-icon"></i>
  </div>
</template>

<script>
export default {
  name: 'FloatingButton',
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.style-floating-button {
  border-radius: 50%;
  width: 75px;
  height: 75px;
  background-color: $primary_color;
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 2rem 0 rgb(136 152 170 / 50%);
}

.style-icon {
  font-size: 40px;
  color: $white;
}
</style>
