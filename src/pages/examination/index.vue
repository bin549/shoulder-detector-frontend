<script setup lang="ts">
import {NIcon, NModal, NSelect, NUpload, NUploadDragger, NText, NImage} from "naive-ui"
import {CloudUploadOutline} from '@vicons/ionicons5'
import {fetchExamination, fetchExaminationType, getExamination} from "~/api/examination.ts"
import {fetchPatient} from "~/api/patient.ts"
import router from "~/router"
import {onMounted, ref} from "vue"
import {useUserStore} from "~/stores/user"
import type {UploadFileInfo} from 'naive-ui'

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

const patientValue = ref<any>("song1")
const patientOptions = ref<any>([
  {
    label: '张三',
    value: 'song1'
  },
  {
    label: '李四',
    value: 'song2'
  },
])
const examinationTypeValue = ref<any>("song1")
const examinationTypeOptions = ref<any>([
  {
    label: '术前',
    value: 'song1'
  },
  {
    label: '术后即刻',
    value: 'song2'
  },
  {
    label: '术后半年',
    value: 'song3'
  },
  {
    label: '术后一年',
    value: 'song4'
  },
])

const imageGroups = ref<any>([
  {
    date: "2023-8-1 周一",
    images: [{
      src: "",
      name: "",
      time: "",
    },{
      src: "",
      name: "",
      time: "",
    },{
      src: "",
      name: "",
      time: "",
    }]
  },
  {
    date: "2023-8-1 周一",
    images: [{
      src: "",
      name: "",
      time: "",
    }]
  },
])
const images = ref<any>([])

function handlePreview(file: UploadFileInfo) {
  const {url} = file
  previewImageUrlRef.value = url as string
  isFinishUpload.value = true
}

function onUploadStart() {
  isStartUpload.value = true
}

function onUploadFinish() {
  getExamination({user_id: store.userInfo.id}).then((res) => {
    previewImageUrlRef.value = res.data[0]["output_image"]
  }).finally(() => {
    isFinishUpload.value = true
  })
}


async function initOptions() {
  await fetchPatient({ user_id: store.userInfo.id }).then((res: any) => {
     console.log(res.data)
  })
  await fetchExaminationType().then((res: any) => {
     console.log(res.data)
  })
}

async function doRefresh() {
  await fetchExamination({ user_id: store.userInfo.id }).then((res: any) => {
    images.value = res.data
  })
}

onMounted(() => {
  initOptions()
  doRefresh()
})

</script>

<template>
  <n-modal v-model:show="isFinishUpload" preset="card" style="width: 1200px" title=" "
           @close="isStartUpload = false;">
    <img :src="previewImageUrlRef" style="width: 100%">
  </n-modal>
  <div flex flex-col gap-y-25>
    <div flex flex-row bg-black h-10 gap-x-5>
      <div flex flex-row>
        <div c-white>患者</div>
        <n-select v-model:value="patientValue" :options="patientOptions" w-30 placeholder=""/>
      </div>
      <div flex flex-row>
        <div c-white>类型</div>
        <n-select v-model:value="examinationTypeValue" :options="examinationTypeOptions" w-30 placeholder=""/>
      </div>
      <n-upload action="http://127.0.0.1:4080/api/examination/upload/" :data="{ user_id: store.userInfo.id }"
                :default-file-list="previewFileList" @change="onUploadStart" @finish="onUploadFinish" w-30 :disabled="!patientValue || !examinationTypeValue">
        <n-upload-dragger v-if="!isStartUpload">
          <div>
            <n-icon size="14" :depth="3">
              <cloud-upload-outline/>
            </n-icon>
            <n-text>上传</n-text>
          </div>
        </n-upload-dragger>
      </n-upload>
    </div>
    <div>
      <div b-black bg-white>
        <div>2023-10-08(周日）</div>
        <n-grid :x-gap="20" :cols="4">
          <n-gi v-for="(item, index) in images" :key="index">
            <n-image width="150" :src="item.output_image" />
          </n-gi>
        </n-grid>
      </div>
      <div>
        <div>2023-10-09(周一）</div>
        <n-image width="150" v-for="image in images" :src="image.output_image" />
      </div>
      <div>
        <div>2012年</div>
        <n-image width="150" v-for="image in images" :src="image.output_image" />
      </div>
      <div>
        <div>2012年</div>
        <n-image width="150" v-for="image in images" :src="image.output_image" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
