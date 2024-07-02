<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" color="error" text="Add Expanse" variant="flat"></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card>
                <v-card-title class="text-button">Add Expanse</v-card-title>
                <form class="pa-5" @submit="submit" as="v-form">
                    <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
                        label="Name"></v-text-field>
                    <v-text-field v-model.number="amount.value.value" :error-messages="amount.errorMessage.value"
                        type="number" label="Amount"></v-text-field>
                    <v-select v-model="category.value.value" :error-messages="category.errorMessage.value"
                        :items="ExpanseCategories" label="Category"></v-select>
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
import { ExpanseCategories } from '@/constants/categories'
import { useBudgetsStore } from "@/store";
import { MoneyOperationType } from "@/types/budget";
import { validateExpanseSchema } from "@/constants/validateSchema";
import { ActionBudgetTypes } from "@/store/BudgetModule/actions";
import { ExpanseCategory } from "@expanse-tracker/server/src/validations/categories";

const store = useBudgetsStore();

const { handleSubmit } = useForm<{
    name: string, amount: number, category: string, date: string

}>({
    validationSchema: validateExpanseSchema,
});


const name = useField<string>("name");
const amount = useField<number>("amount");
const category = useField<string>("category");

const submit = handleSubmit(values => {
    store.dispatch(ActionBudgetTypes.POST_BUDGET, { ...values, type: MoneyOperationType.expanses, category: values.category as ExpanseCategory, date: new Date(values.date) });
})
</script>