<template>
  <div class="style-menu-container scss-container p-3">
    <!-- Header -->
    <div class="text-start">
      <img src="../assets/images/logo/logo.png" class="logo px-1" />
    </div>

    <div class="separator mb-3 mt-2">&nbsp;</div>

    <!-- Menu Items -->
    <router-link
      v-for="menu in sideMenuItems"
      :key="menu"
      :to="menu.link"
      v-slot="{ isActive }"
      style="text-decoration: none"
    >
      <div
        class="d-flex flex-row style-menu-item"
        :class="{ 'style-menu-item-active': isActive }"
      >
        <i :class="menu.iconClass" :style="{ color: menu.color }"></i>
        <span class="flex-grow-1">{{ menu.name }}</span>
        <i class="bi bi-chevron-down" v-if="menu.id" />
      </div>
      <div
        style="background-color: yellow; height: 200px; width: 100%"
        v-if="menu.id"
        :id="menu.id"
      >
        <router-link
          v-for="child in menu.children"
          :key="child"
          :to="child.link"
        >
          <span>{{ child.name }}</span>
        </router-link>
      </div>
    </router-link>
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
          iconClass: 'bi bi-house-door',
          link: '/home',
          color: '#5eacff'
        },
        {
          name: 'Transaction',
          iconClass: 'bi bi-cash-coin',
          link: '/transaction',
          color: '#41cc79',
          id: 'sidebarTransactions',
          children: [
            {
              name: 'Cash In',
              link: '/transaction/cash-in'
            },
            {
              name: 'Cash Out',
              link: '/transaction/cash-out'
            }
          ]
        }
      ]
    };
  },
  methods: {
    test() {
      console.log('here');
    }
  }
};
</script>

<style lang="scss" scoped>
.separator {
  background: rgb(230, 230, 230);
  height: 1px;
  margin: auto;
}
.style-menu-container {
  position: sticky !important;
  width: 280px;
  top: 0;
  left: 0;
  height: 96vh;
  margin: 2vh;
  overflow: auto;
  // background-image: linear-gradient(#333333, #2a2a2a);
}

.logo {
  width: 150px;
}

.style-menu-item {
  padding: 15px 20px;
  color: $black;

  i {
    font-size: 20px;
  }

  span {
    margin-left: 15px;
    display: flex;
    align-items: center;
  }
}

.style-menu-item-active {
  font-weight: $bold;
  background-color: rgb(239, 255, 243);
  border-radius: $box_rounded;
}

.collapse {
}
</style>
