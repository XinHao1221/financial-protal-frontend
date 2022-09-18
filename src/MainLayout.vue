<template>
  <div id="app">
    <!-- Side Menu  -->
    <side-menu
      id="sideMenu"
      v-if="sideMenu"
      style="animation-name: myAnimation"
    />
    <!-- Content  -->
    <div class="d-flex flex-row">
      <div style="margin-left: 300px" v-if="sideMenu && $vssWidth > 1000">
        &nbsp;
      </div>
      <div class="p-4">
        <div>
          <div class="text-start">
            <i
              class="bi bi-list scss-clickable"
              id="menu-icon"
              style="font-size: 30px; color: white"
              @click="
                {
                  sideMenu = !sideMenu;
                }
              "
            ></i>
          </div>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue';
import { VueScreenSizeMixin } from 'vue-screen-size';

export default {
  name: 'MainLayout',
  components: { SideMenu },
  mixins: [VueScreenSizeMixin],
  data() {
    return {
      sideMenu: true
    };
  },
  methods: {
    toggleSideMenu() {}
  },
  watch: {
    $vssWidth(value) {
      if (value >= 1000 && this.sideMenu != false) {
        this.sideMenu = true;
      } else {
        if (this.sideMenu != true) this.sideMenu = false;
      }
    }
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
    #5de2a8 30%,
    #eef0f2 30%,
    #eef0f2 100%
  );
}

@keyframes myAnimation {
  0% {
    opacity: 1;
    transform: rotateX(90deg);
  }
  50% {
    opacity: 0.5;
    transform: rotateX(0deg);
  }
  100% {
    display: none;
    opacity: 0;
    transform: rotateX(90deg);
  }
}
</style>
