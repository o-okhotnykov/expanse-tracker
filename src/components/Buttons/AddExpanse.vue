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
import { uuid } from 'vue-uuid';
import DatePicker from "@@/UI/DatePicker.vue";
import { ExpanseCategories } from '@/constants/categories'
import { useStore } from "@/store";
import { MoneyOperationType } from "@/store/types";
import { ActionTypes } from "@/store/actions";
import { validateSchema } from "@/constants/validateSchema";

const store = useStore();

const { handleSubmit } = useForm<{
    name: string, amount: number, category: string, date: string

}>({
    validationSchema: validateSchema,
});


const name = useField<string>("name");
const amount = useField<number>("amount");
const category = useField<string>("category");

const submit = handleSubmit(values => {
    store.dispatch(ActionTypes.POST_BUDGET, { ...values, id: uuid.v1(), type: MoneyOperationType.expanses });
})
</script>