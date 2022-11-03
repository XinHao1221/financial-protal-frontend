<template>
  <div></div>
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
