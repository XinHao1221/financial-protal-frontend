<template>
  <div id="app">
    <!-- Side Menu  -->
    <div class="side-menu" :style="{ display: sideMenuDisplay }">
      <side-menu
        @close-sidemenu="toggleSideMenu"
        @route-changed="handleRouteChange"
      />
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
        <div class="mb-3">
          <div class="d-flex flex-row align-items-center">
            <div
              class="text-start me-4"
              v-if="isMobileSize || !isSideMenuOpened"
            >
              <i
                class="bi bi-list scss-clickable"
                id="menu-icon"
                style="font-size: 30px; color: white"
                @click="toggleSideMenu"
              ></i>
            </div>
            <div class="page-title">
              {{ pageTitle }}
            </div>
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
    },
    handleRouteChange() {
      if (this.isMobileSize) {
        this.sideMenuDisplay = 'none';
      }
    }
  },
  computed: {
    isMobileSize() {
      return this.$vssWidth <= 1000 ? true : false;
    },
    isSideMenuOpened() {
      return this.sideMenuDisplay === 'block';
    },
    pageTitle() {
      return this.$router.currentRoute.value.fullPath.split('/')[1];
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

<style lang="scss">
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
  z-index: 10;
  transition: all 2s linear;
}

.content {
  margin-left: 270px;
  transition: 0.5s;
}

.screen-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #323232;
  z-index: 5;
  opacity: 0.5;
  transition: 0.5s;
  height: 100vh;
}

.content-overflow-style {
  overflow-x: auto;
}

.page-title {
  text-transform: capitalize;
  font-size: 25px;
  color: $white;
}
</style>
