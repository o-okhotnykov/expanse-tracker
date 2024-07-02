<template>
    <v-btn-toggle v-model="type" color="deep-purple-accent-3" rounded="0" group>
        <v-btn value="expanse">
            Expanse
        </v-btn>

        <v-btn value="income">
            Income
        </v-btn>
    </v-btn-toggle>
    <DoughnutChart v-bind="doughnutChartProps" />
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { DoughnutChart, useDoughnutChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import { useBudgetsStore } from '@/store';
import { GetterBudgetsTypes } from "@/store/BudgetModule";


Chart.register(...registerables);

const store = useBudgetsStore()
const type = ref<'income' | 'expanse'>('expanse')
const toggleLegend = ref(true);
const categoriesValues = ref(store.getters(GetterBudgetsTypes.CATEGORIES_EXPENSE_AMOUNT))
console.log(store);
watchEffect(() => categoriesValues.value = type.value === 'expanse' ? store.getters(GetterBudgetsTypes.CATEGORIES_EXPENSE_AMOUNT) : store.getters(GetterBudgetsTypes.CATEGORIES_INCOME_AMOUNT))
const data = computed<ChartData<"doughnut">>(() => ({
    labels: Object.keys(categoriesValues.value),
    datasets: [
        {
            data: Object.values(categoriesValues.value),
            backgroundColor: [
                "#009688",
                "#E0F2F1",
                "#B2DFDB",
                "#80CBC4",
                "#4DB6AC",
                "#26A69A",
                "#00897B",
                "#00796B",
                "#00695C",
                "#004D40",
            ],
        },
    ],
}));

const options = computed<ChartOptions<"doughnut">>(() => ({
    scales: {
        myScale: {
            type: "logarithmic",
            position: toggleLegend.value ? "left" : "right",
        },
    },
    plugins: {
        legend: {
            position: toggleLegend.value ? "top" : "bottom",
        },
        title: {
            display: true,
            text: type.value.toLocaleUpperCase(),
        },
    },
}));

const { doughnutChartProps } = useDoughnutChart({
    chartData: data,
    options,
});
</script>