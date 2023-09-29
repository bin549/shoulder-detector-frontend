<script setup lang="ts">
import { NIcon, NModal, NSpace, NUpload, NUploadDragger, NText } from "naive-ui"
import { CloudUploadOutline } from '@vicons/ionicons5'
import type { UploadFileInfo } from 'naive-ui'
import { getExamination } from "~/api/examination.ts"
import router from "~/router";
import {ref} from "vue";
import {useUserStore} from "~/stores/user";
const store = useUserStore()

const previewFileList = ref<UploadFileInfo[]>([
  // {
  //   id: 'react',
  //   name: '我是react.png',
  //   status: 'finished',
  //   url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  // }
])
const fileList = ref<UploadFileInfo[]>([
  // {
  //   id: 'the',
  //   name: 'The',
  //   status: 'finished'
  // }
])
const previewImageUrlRef = ref("~/assets/5383acee-58e5-11ee-9587-0242ac130003.png")
const isFinishUpload = ref(false)
const isStartUpload = ref(false)

function handlePreview(file: UploadFileInfo) {
  const { url } = file
  previewImageUrlRef.value = url as string
  isFinishUpload.value = true
}

function onUploadStart() {
  isStartUpload.value = true
}

function onUploadFinish() {
  getExamination({ user_id: store.userInfo.id }).then((res) => {
    previewImageUrlRef.value = res.data[0]["output_image"]
  }).finally(() => {
    isFinishUpload.value = true
  })
}


</script>

<template>
    <div>
      <div c-black style="width: 60%;">
        <n-image></n-image>
        <n-space justify="space-around" size="large">
          <n-upload action="http://yl5545.f3322.org:4080/api/examination/savefile/" :data="{ user_id: store.userInfo.id }"
            :default-file-list="previewFileList" @change="onUploadStart" @finish="onUploadFinish" mt-5>
            <n-upload-dragger v-if="!isStartUpload">
              <div>
                <n-icon size="14" :depth="3">
                  <cloud-upload-outline />
                </n-icon>
                <n-text>请上传骨骼图片</n-text>
              </div>
            </n-upload-dragger>
          </n-upload>
        </n-space>
        <n-space justify="space-around" size="large">
          <n-button @click="router.push('/gallery')">
            <div>
              <n-text>查看检测记录</n-text>
            </div>
          </n-button>
        </n-space>
        <n-modal v-model:show="isFinishUpload" preset="card" style="width: 1200px" title=" "
          @close="isStartUpload = false;">
          <img :src="previewImageUrlRef" style="width: 100%">
        </n-modal>
      </div>
    </div>

</template>

<style scoped>

</style>
