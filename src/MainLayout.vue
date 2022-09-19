<template>
  <div id="app">
    <!-- Side Menu  -->
    <div class="side-menu" :style="{ display: sideMenuDisplay }">
      <side-menu @close-sidemenu="toggleSideMenu" />
    </div>
    <!-- Content  -->
    <div
      class="d-flex flex-row content"
      :style="{ marginLeft: contentMarginLeft }"
    >
      <div class="p-4">
        <div>
          <div class="text-start">
            <i
              class="bi bi-list scss-clickable"
              id="menu-icon"
              style="font-size: 30px; color: white"
              @click="toggleSideMenu"
              v-if="!isSideMenuOpened"
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
      sideMenuDisplay: 'block',
      contentMarginLeft: '310px'
    };
  },
  methods: {
    toggleSideMenu() {
      this.sideMenuDisplay =
        this.sideMenuDisplay === 'block' ? 'none' : 'block';
      if (!this.isMobileSize) {
        this.contentMarginLeft =
          this.sideMenuDisplay === 'block' ? '310px' : '0px';
      }
    },
    test() {
      console.log('here');
    }
  },
  computed: {
    isMobileSize() {
      return this.$vssWidth <= 1000 ? true : false;
    },
    isSideMenuOpened() {
      return this.sideMenuDisplay === 'block';
    }
  },
  watch: {
    // $vssWidth(value) {
    //   if (value >= 1000 && this.sideMenu != false) {
    //     this.sideMenu = true;
    //   } else {
    //     if (this.sideMenu != true) this.sideMenu = false;
    //   }
    // }
    isMobileSize(value) {
      if (value) {
        this.contentMarginLeft = '0px';
        this.sideMenuDisplay = 'none';
      } else {
        this.contentMarginLeft = '310px';
        this.sideMenuDisplay = 'block';
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

.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
}

.content {
  margin-left: 310px;
  transition: 0.5s;
}
</style>
