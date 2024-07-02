<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn icon="mdi-delete" size="small" color="error" v-bind="activatorProps" />
        </template>

        <template v-slot:default="{ isActive }">
            <v-card title="Delete?">
                <v-card-text>

                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
                    <v-btn text="Delete" @click="deleteItem"></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import { useBudgetsStore } from '@/store'
import { ActionBudgetTypes } from '@/store/BudgetModule/actions';

const store = useBudgetsStore()
const props = defineProps<{ id: string }>()
// const deleteItem = () => {
//     store.dispatch(ActionBudgetTypes.DELETE_BUDGET, { id: props.id })
// }
</script>