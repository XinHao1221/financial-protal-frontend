<template>
  <!-- Side Menu  -->
  <side-menu />
  <!-- Content  -->
  <router-view class="content" />
</template>

<script>
import SideMenu from "./components/SideMenu.vue";
export default {
  name: "MainLayout",
  components: { SideMenu },
  data() {
    return {};
  },
};
</script>

<style scoped>
.content {
  margin-left: 300px;
}
</style>
