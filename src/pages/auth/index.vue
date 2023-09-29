<script setup lang="ts">
import AuthLayout from "~/pages/auth/AuthLayout.vue";
import LogIn from "~/pages/auth/Login.vue";
import { onMounted, provide, ref, watch } from "vue";
// import Forget from "~/pages/auth/Forget.vue";
// import Register from "~/pages/auth/Register.vue";
import { APP_CHANGE_KEY } from '~/composables/useAppChange.ts'
import { useAuthStore } from "~/stores/auth";
import Register from "~/pages/auth/Register.vue";

const isChangeApp = ref<boolean>(false)
provide(APP_CHANGE_KEY, isChangeApp)

const { getApp } = useAuthStore()

const appName = ref<string>('')

watch(isChangeApp, () => {
  appName.value = getApp()
})

onMounted(() => {
  appName.value = getApp()
})
</script>

<template>
  <AuthLayout>
    <LogIn v-show="appName === 'login'" />
    <Register v-show="appName === 'register'" />
  </AuthLayout>
</template>
