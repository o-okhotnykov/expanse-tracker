<template>
  <v-app-bar>
    <v-btn icon="$menu" @click="drawer = !drawer" class="pa-2"></v-btn>
    <v-app-bar-title class="text-h6 text-capitalize">{{
      route.name
    }}</v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list-item link :to="{ name: PathsNames.dashboard }">
      <p class="text-button">{{ PathsNames.dashboard }}</p>
    </v-list-item>
    <v-list-item link :to="{ name: PathsNames.history }">
      <p class="text-button">{{ PathsNames.history }}</p>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PathsNames } from "@/router/paths";
import { useRoute } from 'vue-router';

const route = useRoute()

const drawer = ref<boolean>(false);
</script>


<style scoped>
.nav-link {
  text-transform: uppercase;
}
</style>