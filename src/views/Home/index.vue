<template>
  <div style="height: 2500px">Welcome to Fins</div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {};
  },
  created() {
    this.$emit('page-ready', true);
  }
};
</script>
