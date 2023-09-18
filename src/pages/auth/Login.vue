<script setup lang="ts">
import { onMounted, ref } from "vue";
import { NButton, NInput } from "naive-ui";
import { useUserStore } from "~/stores/user";
const store = useUserStore()

const email = ref<string>('')
const password = ref<string>('')

function submitForm() {
  store.login({
    email: email.value,
    password: password.value,
  })
}

onMounted(() => {
})
</script>

<template>
    <div class="login-card" bg-blue w-120 h-90 position-absolute flex flex-col gap-y-1 rounded-md px-8 py-4 shadow-md
      backdrop-blur blur>
      <div w-full h-2 flex-inline items-center justify-center bg-white b-black border-5 pb-12 pt-12>
        <div h-2 flex-inline items-center>
          <div font-size-6 font-bold>欢迎回来！</div>
        </div>
      </div>
      <div justify-center items-center flex flex-row bg-white>
        <div class="login-content" @submit.prevent="submitForm">
          <div>
            <span font-size-3 font-bold>请输入邮箱</span>
            <n-input v-model:value="email" placeholder="" />
          </div>
          <div>
            <span font-size-3 font-bold>请输入密码</span>
            <n-input v-model:value="password" placeholder="" />
          </div>
        </div>
      </div>
      <div w-full justify-center items-center flex flex-col bg-white mt-2>
        <n-button type="primary" @click="submitForm" plain w-full>登录</n-button>
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
