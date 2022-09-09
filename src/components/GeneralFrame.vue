<template>
  <div class="container">
    <!-- header -->
    <div class="header d-flex align-items-center justify-content-center">
      Financial
    </div>
    <!-- Content -->
    <div class="content p-5">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeneralFrame",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.container {
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 520px;
}

.header {
  background-color: $primary_color;
  font-size: $x_large;
  color: $white;
  height: 100px;
  font-weight: $font_weight;
}

.content {
  background-color: white;
}
</style>
