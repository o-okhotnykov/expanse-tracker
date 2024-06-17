
<template>
    <v-container class="container">
        <v-row class="row" justify="center" align-content="center">
            <v-col cols="6">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Register</v-toolbar-title>
                    </v-toolbar>
                    <form @submit="submit" as="v-form">
                        <v-card-text>
                            <v-text-field v-model="email.value.value" prepend-icon="mdi-email" name="email" label="Email"
                                type="email"></v-text-field>
                            <v-text-field v-model="fullName.value.value" prepend-icon="mdi-account" name="fullName"
                                label="Full Name" type="text"></v-text-field>
                            <v-text-field v-model="password.value.value" id="password" prepend-icon="mdi-lock"
                                name="password" label="Password" type="password"></v-text-field>
                        </v-card-text>
                        <v-card-actions class="justify-space-between">
                            <v-btn color="primary" :to="Paths.login">Sing in</v-btn>
                            <v-btn color="primary" type="submit">Register</v-btn>
                        </v-card-actions>
                    </form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup lang="ts">
import { useField, useForm, Form } from "vee-validate";
import { toTypedSchema } from '@vee-validate/yup';
import { Paths } from '@/router/paths'
import { registerSchemaValidation } from "@/constants/validateSchema";
import { useStore } from "@/store";
import { registerSchema } from "@/types/user";
import { ActionAuthTypes } from "@/store/AuthModule/actions";

const store = useStore();

const { handleSubmit } = useForm<registerSchema>({
    validationSchema: toTypedSchema(registerSchemaValidation),
});

const email = useField<string>("email");
const fullName = useField<string>("fullName");
const password = useField<string>("password");

const submit = handleSubmit(values => {
    store.dispatch(ActionAuthTypes.REGISTER_USER, values);
})
</script>
  

<style scoped>
.container {
    height: 100%;
}

.row {
    height: 100%;
}
</style>