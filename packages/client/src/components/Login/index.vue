
<template>
    <v-container class="container">
        <v-row class="row" justify="center" align-content="center">
            <v-col cols="6">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <form @submit="submit" as="v-form">
                        <v-card-text>
                            <v-text-field v-model="email.value.value" prepend-icon="mdi-email" name="email" label="Email"
                                type="email"></v-text-field>
                            <v-text-field v-model="password.value.value" id="password" prepend-icon="mdi-lock"
                                name="password" label="Password" type="password"></v-text-field>
                        </v-card-text>
                        <v-card-actions class="justify-space-between">
                            <v-btn color="primary" :to="Paths.register">Sing up</v-btn>
                            <v-btn color="primary" type="submit">Login</v-btn>
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
import { Paths, PathsNames } from '@/router/paths'
import { loginSchemaValidation } from "@/constants/validateSchema";
import { useAuthStore } from "@/store";
import { loginSchema } from "@/types/user";
import { useRouter } from 'vue-router';
import { ActionAuthTypes } from "@/store/AuthModule/actions";

const router = useRouter()

const store = useAuthStore();

const { handleSubmit } = useForm<loginSchema>({
    validationSchema: toTypedSchema(loginSchemaValidation),
});

const email = useField<string>("email");
const password = useField<string>("password");

const submit = handleSubmit(async (values) => {
    await store.dispatch(ActionAuthTypes.LOGIN_USER, values);
    router.push({ name: PathsNames.dashboard });
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