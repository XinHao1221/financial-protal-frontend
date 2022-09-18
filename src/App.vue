<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
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
