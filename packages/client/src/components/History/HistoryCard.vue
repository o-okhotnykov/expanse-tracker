<template>
    <v-card class="pa-5  border-md border-primary">
        <div v-if="!isEditing" class="d-flex pa-7 align-center">
            <div class="d-flex me-auto">
                <v-icon :icon="getCategoryIcon(props.category)" />
                <p class="pl-2 text-capitalize text-body-1">{{ props.name }}</p>
                <p class="pl-2 text-capitalize text-body-1">{{ props.amount }}$</p>
            </div>
            <div>
                <v-btn icon="mdi-pencil" size="small" color="primary" class="mx-4" @click="toggleEditing" />
                <DeleteBtn :id="props._id" />
            </div>
        </div>
        <HistoryCardEdit :isEditing="isEditing" v-bind="props" @toggleEditing="toggleEditing" />
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MoneyOperation } from "@/types/budget"
import { getCategoryIcon } from '@/constants/categories'
import DeleteBtn from '@@/Buttons/DeleteBtn.vue'

import HistoryCardEdit from './HistoryCardEdit.vue'

const props = defineProps<MoneyOperation>()
const isEditing = ref(false)
const toggleEditing = () => {
    isEditing.value = !isEditing.value
}
</script>