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
  <div bc-black b-3 flex flex-justify-center mt-30>
    <div c-black style="width: 80%;">
      <n-space justify="space-around" size="large">
        <n-image width="200" v-for="image in images" :src="image.output_image" />
      </n-space>
    </div>
  </div>
</template>

<style scoped></style>
