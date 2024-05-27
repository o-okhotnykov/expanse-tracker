<template>
  <v-app id="inspire">
    <Navigation />
    <v-main class="bg-grey-lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup >


console.log(console.log([
  { "id": "1" },
  { "id": "1" },
  { "id": "2" }
].groupBy(function (item) {
  return item.id;
}
)));


import Navigation from "@@/Navigation/index.vue";
</script>


