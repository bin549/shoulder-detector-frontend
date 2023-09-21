<script setup lang="ts">
import { onMounted } from "vue";
import { useLogout } from "~/composables/useAuth.ts"
import {
  NButton
} from "naive-ui"

const {
  handleLogout
} = useLogout()

onMounted(() => {
})
</script>

<template>
  <div absolute h-20 style="background-color: #399;" c-white w-full top-0>
    <div flex flex-row style="align-items: center;">
      <div style="font-size: 1.5rem; ">Logo</div>
      <div style="align-items: center;justify-content: space-between;font-size: 1.5rem;">
        肩部检测在线网址
      </div>
      <n-button type="tertiary" @click="handleLogout">
        注销
      </n-button>
    </div>
  </div>
</template>

<style scoped></style>
