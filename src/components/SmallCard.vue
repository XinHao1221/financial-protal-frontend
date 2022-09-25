<template>
  <div class="scss-container p-4 d-flex flex-row">
    <div class="d-flex flex-column text-start flex-grow-1">
      <div class="scss-text-small">{{ settings.title }}</div>
      <div class="scss-bold" style="font-size: 25px">
        {{ settings.content }}
      </div>
      <div>
        <span :class="settings.footer.contentColorClass" class="me-2">{{
          settings.footer.content
        }}</span>
        <span>{{ settings.footer.description }}</span>
        <span></span>
      </div>
    </div>
    <div
      class="rounded-circle style-icon-container"
      :style="{ backgroundColor: settings.icon.backgroundColor }"
    >
      <i :class="settings.icon.iconClass"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmallCard',
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.scss-container > div > div {
  line-height: 1.7;
}

.scss-container {
  /* min-width: 350px; */
  max-width: 1000px;
  width: 400px;
}

.style-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
}

.style-icon-container > i {
  color: white;
  font-size: 24px;
}
</style>
