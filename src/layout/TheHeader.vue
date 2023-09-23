<script setup lang="ts">
import { onMounted } from "vue";
import { useLogout } from "~/composables/useAuth.ts"
import { getToken } from "~/composables/auth";

import {
  NButton
} from "naive-ui"

import { useMessage } from "naive-ui"

const message = useMessage()

const {
  handleLogout
} = useLogout()

function logout() {
  message.info("退出登录成功")
  handleLogout()
}

onMounted(() => {
})
</script>

<template>
  <div absolute h-20 style="background-color: #399;" c-white w-full top-0>
    <div flex flex-row style="align-items: center;" h-20 bg-black relative w-full>
      <div flex flex-row ml-20 absolute left-0>
        <div style="font-size: 1.5rem; ">Logo</div>
        <div style="align-items: center;justify-content: space-between;font-size: 1.5rem;">
          肩部检测在线网址
        </div>
      </div>
      <n-button v-if="getToken()" type="tertiary" @click="logout" c-white absolute right-30 w-20 h-10>
        注销
      </n-button>
    </div>
  </div>
</template>

<style scoped></style>
