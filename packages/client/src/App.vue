<template>
  <v-app id="inspire">
    <Navigation />
    <v-main class="bg-grey-lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Navigation from "@@/Navigation/index.vue";
</script>


