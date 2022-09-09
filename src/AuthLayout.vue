<template>
  <div class="style-background">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style scoped>
.style-background {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #e6eefc;
  background-image: linear-gradient(#e6eefc, #d3eefa);
  /* background-color: #c2e9fb;
  background-image: linear-gradient(#c2e9fb, #dfe9fb); */
}
</style>
