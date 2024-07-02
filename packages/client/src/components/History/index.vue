<template>
    <v-container>
        <v-row justify="center">
            <v-col class="mt-2" cols="10">
                <v-card>
                    <v-tabs v-model="tab" align-tabs="center" color="primary">
                        <v-tab :value="Tab.Expanse">Expanse</v-tab>
                        <v-tab :value="Tab.Income">Income</v-tab>
                    </v-tabs>
                    <v-window v-model="tab">
                        <v-window-item :value="Tab.Expanse">
                            <v-data-iterator :items="store.getters(GetterBudgetsTypes.EXPANSES)" :page="page">
                                <template v-slot:default="{ items }">
                                    <template v-for="item in items" :key="item.raw.id">
                                        <HistoryCard v-bind="{ ...item.raw }" />
                                    </template>
                                </template>
                            </v-data-iterator>
                        </v-window-item>
                        <v-window-item :value="Tab.Income">
                            <v-data-iterator :items="store.getters(GetterBudgetsTypes.INCOMES)" :page="page">
                                <template v-slot:default="{ items }">
                                    <template v-for="item in items" :key="item.raw.id">
                                        <HistoryCard v-bind="{ ...item.raw }" />
                                    </template>
                                </template>
                            </v-data-iterator>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { useBudgetsStore } from '@/store';
import { onMounted, ref } from 'vue'
import HistoryCard from './HistoryCard.vue'
import { ActionBudgetTypes, GetterBudgetsTypes } from '@/store/BudgetModule';

enum Tab {
    Expanse = 1, Income = 2
}
const tab = ref<Tab>(Tab.Expanse)
const page = ref(1)

const store = useBudgetsStore();

onMounted(() => {
    store.dispatch(ActionBudgetTypes.FETCH_BUDGETS)
})

</script>