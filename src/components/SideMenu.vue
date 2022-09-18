<template>
  <div class="style-menu-container scss-shadow-container scss-container">
    <!-- Header -->
    <div class="logo text-start">FINS</div>

    <!-- Menu Items -->
    <ul>
      <router-link
        v-for="item in sideMenuItems"
        :key="item"
        :to="item.link"
        v-slot="{ isActive }"
        style="text-decoration: none"
      >
        <li
          class="d-flex flex-row style-menu-item"
          :class="{ 'style-menu-item-active': isActive }"
        >
          <i :class="item.iconClass"></i>
          <span>{{ item.name }}</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  data() {
    return {
      sideMenuItems: [
        {
          name: 'Home',
          iconClass: 'bi bi-house-door-fill',
          link: '/home'
        },
        {
          name: 'Transaction',
          iconClass: 'bi bi-house-door-fill',
          link: '/transaction'
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.style-menu-container {
  position: fixed;
  width: 270px;
  left: 0;
  height: 98vh;
  top: 0;
  margin: 1vh;
  // background-image: linear-gradient(#333333, #2a2a2a);
}

.logo {
  font-size: 20px;
  font-family: Comic Sans MS;
  padding: 20px 30px;
  border-bottom: 1px groove $border_color;
  margin-bottom: 10px;
}

.style-menu-item {
  padding: 15px 0px;
  color: $border_color;

  i {
    font-size: 20px;
  }

  span {
    margin-left: 15px;
    display: flex;
    align-items: center;
  }
}

.style-menu-item:hover {
  // color: white;
  transition: all 0.4s;
}

.style-menu-item-active {
  // color: $white;
}
</style>
