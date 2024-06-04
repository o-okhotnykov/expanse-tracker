<template>
    <div class="pa-0" v-if="props.isEditing">
        <form @submit="submit" as="v-form">
            <v-container>
                <v-row>
                    <v-col cols="3">
                        <v-select v-model="category.value.value" :error-messages="category.errorMessage.value"
                            :append-icon="getCategoryIcon(category.value.value)" :items="ExpanseCategories"
                            label="Category"></v-select></v-col>
                    <v-col cols="4"><v-text-field v-model="name.value.value" :counter="10"
                            :error-messages="name.errorMessage.value" label="Name"></v-text-field></v-col>
                    <v-col cols="4">
                        <v-text-field v-model.number="amount.value.value" :error-messages="amount.errorMessage.value"
                            type="number" label="Amount"></v-text-field></v-col>
                    <v-col cols="1" align-self="center">
                        <v-btn icon="mdi-check" size="small" color="success" class="mx-4" type="submit" />
                    </v-col>
                </v-row>

            </v-container>

        </form>
    </div>
</template>


<script setup lang="ts">
import { useField, useForm, Form } from "vee-validate";
import { useStore } from "@/store";
import { MoneyOperation } from '@/types/budget'
import { getCategoryIcon, ExpanseCategories } from '@/constants/categories'
import { validateExpanseSchema } from "@/constants/validateSchema";
import { ActionBudgetTypes } from "@/store/BudgetModule/actions";

const props = defineProps<MoneyOperation & { isEditing: boolean }>()

const emit = defineEmits(['toggleEditing'])
const store = useStore();

const { handleSubmit } = useForm<{
    name: string, amount: number, category: string, date: string

}>({
    initialValues: { name: props.name, category: props.category, amount: props.amount },
    validationSchema: validateExpanseSchema,
});


const name = useField<string>("name");
const amount = useField<number>("amount");
const category = useField<string>("category");

const submit = handleSubmit(values => {
    store.dispatch(ActionBudgetTypes.PATCH_BUDGET, { ...values, _id: props._id, type: props.type, date: new Date(props.date) });
    emit("toggleEditing");
})
</script>
