<script setup lang="ts">
import {
  NIcon,
  NModal,
  NSelect,
  NUpload,
  NUploadDragger,
  NText,
  NImage,
  NGridItem,
  NGrid,
  NDivider,
  NSpin,
  NEmpty
} from "naive-ui"
import {CloudUploadOutline} from '@vicons/ionicons5'
import {fetchExamination, fetchExaminationType, getExamination} from "~/api/examination.ts"
import {fetchPatientByPage} from "~/api/patient.ts"
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
const previewImageUrlRef = ref("")
const isFinishUpload = ref(false)
const isStartUpload = ref(false)
const is_loading = ref<boolean>(true)

const selectedPatient = ref<any>("0")
const patientOptions = ref<any>([
  {
    label: '全部',
    value: '0'
  },
])
const examinationTypeValue = ref<string>('all')
const examinationTypeOptions = ref<any>([
  {
    id: 0,
    label: '全部',
    value: 'all'
  },
  {
    id: 1,
    label: '术前',
    value: 'song1'
  },
  {
    id: 2,
    label: '术后即刻',
    value: 'song2'
  },
  {
    id: 3,
    label: '术后半年',
    value: 'song3'
  },
  {
    id: 4,
    label: '术后一年',
    value: 'song4'
  },
])

const display_images = ref<any>([])
const images = ref<any>([])
const props = defineProps({
  init_patient_id: String
})

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
    doRefresh()
  }).finally(() => {
    isFinishUpload.value = true
  })
}

async function initOptions() {
  await fetchPatientByPage({
    user_id: store.userInfo.id,
  }).then((res: any) => {
    patientOptions.value = res.data.list.map((patient: any) => ({
      value: patient.id.toString(),
      label: patient.name,
    }));
    patientOptions.value.unshift({
      label: '全部',
      value: '0'
    })
    selectedPatient.value = props.init_patient_id.toString()
  })
  await fetchExaminationType().then((res: any) => {
  })
}
import { useMessage, SelectOption } from 'naive-ui'
const message = useMessage()
async function handleUpdateValue(value: string, option: SelectOption) {
  selectedPatient.value = value
  doRefresh()
}

async function doRefresh() {
  console.log(selectedPatient.value)
  console.log(selectedPatient.value)
  console.log(selectedPatient.value)
  console.log(selectedPatient.value)
  is_loading.value = true
  await fetchExamination({
    user_id: store.userInfo.id,
    patient_id: selectedPatient.value,
  }).then((res: any) => {
    images.value = res.data
    // restruct -> [ { date: ??; imgs: []} , { date: ??; imgs: []} ,{ date: ??; imgs: []} ]
  })
  display_images.value = images.value.reduce((result, obj) => {
    const date = obj.create_time.split("T")[0];
    if (result[date]) {
      result[date].push(obj);
    } else {
      result[date] = [obj];
    }
    return result;
  }, {});
  is_loading.value = false
}

onMounted(async () => {
  await initOptions()
  await doRefresh()
})

</script>

<template>
  <n-modal v-model:show="isFinishUpload" preset="card" style="width: 1200px" title=" "
           @close="isStartUpload = false;">
    <img :src="previewImageUrlRef" style="width: 100%">
  </n-modal>
  <div flex flex-row bg-white h-full gap-x-5>
    <div flex flex-row>
      <div c-white>患者</div>
      <n-select @update:value="handleUpdateValue" v-model:value="selectedPatient" :options="patientOptions" w-30 placeholder=""/>
    </div>
    <div flex flex-row>
      <div c-white>类型</div>
      <n-select v-model:value="examinationTypeValue" :options="examinationTypeOptions" w-30 placeholder=""/>
    </div>
  </div>
  <n-divider/>
<!--  <n-form-item-gi :span="12" label="Radio Group" path="radioGroupValue">-->
<!--    <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup1">-->
<!--      <n-space>-->
<!--        <n-radio value="Radio 1">-->
<!--          Radio 1-->
<!--        </n-radio>-->
<!--        <n-radio value="Radio 2">-->
<!--          Radio 2-->
<!--        </n-radio>-->
<!--        <n-radio value="Radio 3">-->
<!--          Radio 3-->
<!--        </n-radio>-->
<!--      </n-space>-->
<!--    </n-radio-group>-->
<!--  </n-form-item-gi>-->
  <n-upload action="http://127.0.0.1:4080/api/examination/upload/" :data="{ user_id: store.userInfo.id }"
            :default-file-list="previewFileList" @change="onUploadStart" @finish="onUploadFinish" w-30
            :disabled="!selectedPatient || !examinationTypeValue">
    <n-upload-dragger v-if="!isStartUpload">
      <div>
        <n-icon size="14" :depth="3">
          <cloud-upload-outline/>
        </n-icon>
        <n-text>上传</n-text>
      </div>
    </n-upload-dragger>
  </n-upload>
  <n-divider />
  <n-spin size="large" v-if="is_loading" flex justify-center mt-40/>
  <div v-else>
    <div v-if="images.length===0">
      <n-empty size="large" description="暂无记录">
        <template #extra>
        </template>
      </n-empty>
    </div>
    <div v-for="(display_images_key, index) in Object.keys(display_images)" :key="index" v-else>
      <div mt-1>
        <div w-full>
          <div b-black bg-white font-size-6 font-bold>
            <div>{{ display_images_key }}</div>
          </div>
          <n-grid :x-gap="12" :y-gap="1" :cols="4">
            <n-grid-item v-for="(image, index) in display_images[display_images_key]" :key="index">
              <div h-35 flex flex-col>
                <n-image width="170" :src="image.output_image"/>
                <div flex flex-row>
                  <p>检测时间：{{ image.create_time.split("T")[1].split(".")[0] }}</p>
                  <!--                <p>RTL:232</p>-->
                  <!--                <p>CSA:3232</p>-->
                  <!--                <p>AI:32</p>-->
                </div>
              </div>
            </n-grid-item>
          </n-grid>
        </div>
        <n-divider/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
