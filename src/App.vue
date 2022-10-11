<template>
  <loading-spinner v-if="showLoading" />
  <router-view />
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: { LoadingSpinner },
  computed: {
    ...mapGetters(['showLoading'])
  },
  created() {
    const link = document.querySelector("[rel='icon']");
    link.setAttribute('href', './assets/images/logo/logo-icon.png');
  }
};
</script>
<style lang="scss">
#app {
  font-family: 'Myriad Pro';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $light_black;
  font-size: $font_small;
}

@font-face {
  font-family: 'Myriad Pro';
  src: url('./assets/fonts/MyriadPro/Regular/MyriadPro-Regular.eot');
  src: url('./assets/fonts/MyriadPro/Regular/MyriadPro-Regular.eot?#iefix')
      format('embedded-opentype'),
    url('./assets/fonts/MyriadPro/Regular/MyriadPro-Regular.woff2')
      format('woff2'),
    url('./assets/fonts/MyriadPro/Regular/MyriadPro-Regular.woff')
      format('woff'),
    url('./assets/fonts/MyriadPro/Regular/MyriadPro-Regular.ttf')
      format('truetype'),
    url('./assets/fonts/MyriadPro/Regular/MyriadPro-Regular.svg#MyriadPro-Regular')
      format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
