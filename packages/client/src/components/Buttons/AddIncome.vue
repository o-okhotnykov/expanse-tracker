<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="success" text="Add Income" variant="flat"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-button">Add income</v-card-title>
        <form class="pa-5" @submit="submit" as="v-form">
          <v-text-field v-model.number="amount.value.value" :error-messages="amount.errorMessage.value" type="number"
            label="Amount"></v-text-field>
          <v-select v-model="category.value.value" :error-messages="category.errorMessage.value" :items="IncomeCategories"
            label="Category"></v-select>
          <DatePicker />


          <v-card-actions class="justify-space-between">
            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
            <v-btn text="Submit" type="submit"></v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </template>
  </v-dialog>
</template>


<script setup lang="ts">
import { useField, useForm, Form } from "vee-validate";
import DatePicker from "@@/UI/DatePicker.vue";
import { IncomeCategories } from '@/constants/categories'
import { useBudgetsStore } from "@/store";
import { MoneyOperationType } from "@/types/budget";
import { validateIncomeSchema } from "@/constants/validateSchema";
import { ActionBudgetTypes } from "@/store/BudgetModule/actions";
import { IncomeCategory } from "@expanse-tracker/server/src/validations/categories";

const store = useBudgetsStore();

const { handleSubmit } = useForm<{
  amount: number, category: string, date: string

}>({
  validationSchema: validateIncomeSchema,
});

const amount = useField<number>("amount");
const category = useField<string>("category");

const submit = handleSubmit(values => {
  store.dispatch(ActionBudgetTypes.POST_BUDGET, { ...values, type: MoneyOperationType.incomes, name: category.value.value, date: new Date(values.date), category: values.category as IncomeCategory });
})
</script>