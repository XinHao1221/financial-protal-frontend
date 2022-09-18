<template>
  <div id="app">
    <!-- Side Menu  -->
    <side-menu />
    <!-- Content  -->
    <router-view class="content" />
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue';
export default {
  name: 'MainLayout',
  components: { SideMenu },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
#app {
  /* background-color: rgb(245, 245, 245); */
  position: fixed;
  width: 100%;
  height: 100%;
  // background-image: linear-gradient($primary_color, #4be6a3);
  background: linear-gradient(
    $primary_color 0%,
    #4be6a3 30%,
    #eef0f2 30%,
    #eef0f2 100%
  );
}
.content {
  margin-left: 300px;
}
</style>
