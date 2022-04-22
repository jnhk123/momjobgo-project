<template>
  <v-app-bar app v-if="$store.state.appBarVisible">
    <v-app-bar-title> {{ $store.state.title }}</v-app-bar-title>
  </v-app-bar>
</template>

<script>
export default {};
</script>
