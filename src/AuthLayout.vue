<template>
  <div class="container-fluid d-flex flex-row p-3" style="min-height: 100vh">
    <!-- Auth Content -->
    <div class="col-xl-6 col-12">
      <div class="d-flex flex-column container">
        <div class="mt-3">
          <img src="./assets/images/logo/logo.png" class="logo" />
        </div>
        <div class="content-container">
          <router-view />
        </div>
      </div>
    </div>
    <!-- Description -->
    <div class="col-xl-6 d-none d-xl-block image-container">
      <img src="./assets/images/auth-background.jpg" class="style-image" />
      <div class="overlay-container"></div>
      <div class="overlay-text">
        <div class="d-flex flex-column">
          <div class="text-center title">FINS</div>
          <div class="text-center flex-grow-1 content mt-2">
            Save money. Save reputation.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
};
</script>

<style scoped lang="scss">
.container {
  width: 80%;
}

.content-container {
  margin-top: 15%;
}

@media only screen and (max-width: 750px) {
  .container {
    width: 95%;
  }
}

.logo {
  display: flex;
  align-items: left;
  width: 150px;
}

@media only screen and (max-width: 500px) {
  .logo {
    width: 130px;
  }
}

.style-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: $box-rounded;
}

.image-container {
  position: relative;
}

.overlay-container {
  width: 100%;
  height: 100%;
  background-color: $primary_color;
  position: absolute;
  z-index: 1;
  top: 0;
  opacity: 0.5;
  border-radius: $box-rounded;
}

.overlay-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 50%;
  color: white;

  .title {
    font-size: $font_large;
    font-weight: $bold;
  }

  .content {
    font-size: 1.7rem;
  }
}
</style>
