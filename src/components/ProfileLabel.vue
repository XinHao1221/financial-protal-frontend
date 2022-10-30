<template>
  <div class="btn-group">
    <div class="scss-clickable d-flex flex-row align-items-center">
      <!-- <div class="me-2 style-profile-icon">
        <i class="bi bi-person-fill"></i>
      </div> -->
      <span class="style-font text-truncate" style="width: 90px">{{
        profile.name
      }}</span>
    </div>
    <div
      class="dropdown-toggle dropdown-toggle-split style-font ms-1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span class="visually-hidden">Toggle Dropdown</span>
    </div>
    <ul class="dropdown-menu">
      <li class="scss-clickable"><i class="bi bi-person-fill"></i> Profile</li>
      <li class="scss-clickable" @click="logout">
        <i class="bi bi-box-arrow-right"></i>Logout
      </li>
    </ul>
  </div>
</template>

<script>
import { authRepo } from '@/api';
import { removeToken } from '@/api/AuthTokenService.js';
import { mapGetters } from 'vuex';

export default {
  name: 'ProfileLabel',
  computed: {
    ...mapGetters(['profile'])
  },
  methods: {
    async logout() {
      try {
        // Perform logout
        await authRepo.logout();
        // Remove token
        removeToken();

        this.$router.push('login');
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  li {
    color: $black;
    height: 45px;
    display: flex;
    padding: 0 15px;
    align-items: center;

    i {
      font-size: 17.5px;
      margin-right: 10px;
    }
  }

  li:hover {
    background-color: rgb(239, 255, 243);
  }
}

.style-font {
  color: $white;
  font-size: $font_medium;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
}

.style-profile-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font_medium;
  border: 2px solid $white;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  color: $white;
  font-size: 1rem;
}
</style>
