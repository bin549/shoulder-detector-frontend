<script setup lang="ts">
import { NImage, NSpace } from "naive-ui"
import { onMounted, ref } from "vue";
import { fetchExamination } from "~/api/examination.ts"
import { useUserStore } from "~/stores/user.ts";

const store = useUserStore()

const images = ref<any>()

onMounted(() => {
  fetchExamination({ user_id: store.userInfo.id }).then((res: any) => {
    images.value = res.data
  })
})
</script>

<template>
  <div w-full>
    <n-space >
      <n-image width="150" v-for="image in images" :src="image.output_image" />
    </n-space>
  </div>
</template>

<style scoped></style>
