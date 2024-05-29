<template>
  <v-menu ref="menu" :close-on-content-click="false" location="bottom" transition="scale-transition" min-width="290px">
    <template v-slot:activator="{ props }">
      <v-text-field label="Date" v-model="value" :value="format(value, 'fullDateWithWeekday')" readonly
        :error-messages="errorMessage" v-bind="props"></v-text-field>
    </template>
    <v-date-picker v-model="value" hide-header> </v-date-picker>
  </v-menu>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { useDate } from "vuetify";

const { format } = useDate();

const { value, errorMessage } = useField("date", (inputValue) => !!inputValue);

</script>
