
<template>
  <v-container>
    <v-row justify="center">
      <v-col class="mt-2" cols="4">
        <v-card class="pa-5">
          <strong class="text-h3">{{ store.getters.balance }}$</strong>
          <p class="text-subtitle-2">Current balance</p>
          <div class="d-flex justify-space-between">
            <AddExpanse />
            <AddIncome />
          </div>
        </v-card>
      </v-col>
      <v-col class="mt-2" cols="6">
        <v-card class="pa-5">
          <Chart />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "@/store";
import AddIncome from "@@/Buttons/AddIncome.vue";
import AddExpanse from '@@/Buttons/AddExpanse.vue'
import { ActionTypes } from "@/store/actions";
import Chart from '@@/Chart/index.vue'

const store = useStore();

onMounted(() => {
  store.dispatch(ActionTypes.FETCH_BUDGETS)
})
</script>
