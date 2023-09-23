<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { NButton, NInput } from "naive-ui";
import { useUserStore } from "~/stores/user";
import { useRouter } from "vue-router";
const store = useUserStore()
const router = useRouter()
import { useNotification } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { useAuthStore } from "~/stores/auth.ts";
import { useAppChange } from "~/composables/useAppChange.ts";

const message = useMessage()
const username = ref<string>('')
const password = ref<string>('')

function submitForm() {
  if (!username.value) {
    message.warning("用户名不能为空", { duration: 1500 })
    return
  }
  if (!password.value) {
    message.warning("密码不能为空", { duration: 1500 })
    return
  }
  store.login({
    username: username.value,
    password: password.value,
  }).then((res) => {
    message.success("登录成功", { duration: 500 })
    router.push("/")
  }).catch((res) => {
    message.error("用户名或者密码输入错误")
  })
}
const isChangeApp = useAppChange()

const { setApp } = useAuthStore()

async function changeApp(appName) {
  await setApp(appName)
  isChangeApp.value = !isChangeApp.value
}

function onKeyUp(e) {
  if (e.key == "Enter") submitForm()
}

onMounted(() => {
  document.addEventListener("keyup", onKeyUp)
})
onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyUp)
})
</script>

<template>
  <div class="login-card" bg-white w-120 h-90 position-absolute flex flex-col gap-y-1 rounded-md px-8 py-4 shadow-md
    backdrop-blur blur>
    <div w-full h-2 flex-inline items-center justify-center bg-black b-white border-5 c-white pb-12 pt-8>
      <div h-2 flex-inline items-center>
        <div font-size-6 font-bold>欢迎回来！</div>
      </div>
    </div>
    <div justify-center items-center flex flex-row bg-white h-50>
      <div class="login-content" @submit.prevent="submitForm" w-full>
        <div>
          <span font-size-4 font-bold>请输入用户名</span>
          <n-input v-model:value="username" placeholder="" />
        </div>
        <div>
          <span font-size-4 font-bold>请输入密码</span>
          <n-input v-model:value="password" placeholder="" />
        </div>
      </div>
    </div>
    <div w-full justify-center items-center flex flex-col bg-white mt-2>
      <n-button type="tertiary" color="#000000" @click="submitForm" plain w-full>登录</n-button>
      <n-button type="tertiary" @click="changeApp('register')" plain w-full bg-white c-black>没有账号？点击进行登录吧.</n-button>
    </div>
  </div>
</template>

<style scoped>
.login-card {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
