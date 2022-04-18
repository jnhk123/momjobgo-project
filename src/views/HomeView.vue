<template>
  <hello-world />
</template>

<script>
  import HelloWorld from '../components/HelloWorld'


  const PAGE_NAME = "Home";

  export default {
    name: PAGE_NAME,

    components: {
      HelloWorld,
    },

    mounted() {
      this.$store.state.title = PAGE_NAME;
    },
  }
</script>
