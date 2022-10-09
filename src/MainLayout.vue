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
      <!-- Screen cover (Appear for mobile view only) -->
      <div
        class="screen-cover"
        v-if="isMobileSize && isSideMenuOpened"
        @click="toggleSideMenu"
      >
        &nbsp;
      </div>
      <div class="p-4 flex-grow-1 content-overflow-style">
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
        <loading-spinner v-show="!isPageReady" />
        <router-view @page-ready="setPageStatus" v-show="isPageReady" />
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue';
import { VueScreenSizeMixin } from 'vue-screen-size';
import LoadingSpinner from '@/components/LoadingSpinner';

export default {
  name: 'MainLayout',
  components: { SideMenu, LoadingSpinner },
  mixins: [VueScreenSizeMixin],
  provide() {
    return {
      getIsMobile: () => this.isMobileSize
    };
  },
  data() {
    return {
      sideMenuDisplay: null,
      contentMarginLeft: null,
      isPageReady: false
    };
  },
  methods: {
    toggleSideMenu() {
      this.sideMenuDisplay =
        this.sideMenuDisplay === 'block' ? 'none' : 'block';
      if (!this.isMobileSize) {
        this.contentMarginLeft =
          this.sideMenuDisplay === 'block' ? '270px' : '0px';
      }
    },
    setPageStatus(value) {
      this.isPageReady = value;
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
    isMobileSize(value) {
      if (value) {
        this.contentMarginLeft = '0px';
        this.sideMenuDisplay = 'none';
      } else {
        this.contentMarginLeft = '270px';
        this.sideMenuDisplay = 'block';
      }
    }
  },
  created() {
    if (this.isMobileSize) {
      this.contentMarginLeft = '0px';
      this.sideMenuDisplay = 'none';
    } else {
      this.contentMarginLeft = '270px';
      this.sideMenuDisplay = 'block';
    }

    this.$router.beforeEach(() => {
      this.isPageReady = false;
    });
  }
};
</script>

<style scoped lang="scss">
#app {
  min-width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    $primary_color 0%,
    #5de2a8 350px,
    #eef0f2 350px,
    #eef0f2 100%
  );
}

.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
  transition: all 2s linear;
}

.content {
  margin-left: 270px;
  transition: 0.5s;
  position: relative;
  z-index: 0;
}

.screen-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #323232;
  z-index: 10;
  opacity: 0.5;
  transition: 0.5s;
}

.content-overflow-style {
  overflow-x: auto;
}
</style>
