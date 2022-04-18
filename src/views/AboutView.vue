<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>


<script>
const PAGE_NAME = 'About';

export default {
  name : PAGE_NAME,

  mounted() {
    this.$store.state.title = PAGE_NAME;
  },
}
</script>