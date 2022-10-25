<template>
  <div class="d-flex flex-row mb-4" style="gap: 3px">
    <template v-for="button in buttons" :key="button">
      <div
        class="style-button d-flex justify-content-center align-items-center scss-clickable"
        :style="getButtonStyle(button)"
        @click="setTabAsSelected(button)"
      >
        {{ button.text }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'CategoryButton',
  props: {
    buttons: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeTab: null
    };
  },
  methods: {
    getButtonStyle(buttonSetting) {
      // If tab is selected
      if (buttonSetting.id === this.activeTab) {
        return {
          border: `2px solid ${buttonSetting.color}`,
          color: buttonSetting.color,
          fontWeight: 'bold'
        };
      }

      return {
        border: '1px solid #afafaf',
        color: '#afafaf'
      };
    },
    setTabAsSelected(buttonSetting) {
      this.activeTab = buttonSetting.id;

      this.$emit('selected-tab', buttonSetting);
    }
  },
  created() {
    // set default active tab
    this.activeTab = this.buttons[0].id;
  }
};
</script>

<style lang="scss" scoped>
.style-button {
  height: 40px;
  border-radius: 10px;
  flex: 1;
}
</style>
