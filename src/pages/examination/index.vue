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
  NEmpty,
  NRadioGroup,
  NRadio,
  NSpace,
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
const selectedPatientIndex = ref<number>(0)
const is_upload_panel_display = ref(false)
const is_loading = ref<boolean>(true)

const selectedPatient = ref<any>("0")
const patientOptions = ref<any>([
  {
    label: '全部',
    value: '0'
  },
])
const selectedExaminationType = ref<string>('0')
const examinationTypeOptions = ref<any>([])
const selectedExaminationTypeOptions = ref<any>([])
const selectedUploadedExaminationType = ref(null)

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

async function onUploadFinish() {
  if (images.value.length !== 0) {
    previewImageUrlRef.value = images.value[0]["output_image"]
    isFinishUpload.value = true
  } else {
    await doRefresh()
  }
  is_upload_panel_display.value = false
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
    examinationTypeOptions.value = res.data.map((examination_type: any) => ({
      value: examination_type.id.toString(),
      label: examination_type.name,
    }));
    selectedExaminationTypeOptions.value = Array.from(examinationTypeOptions.value)
    examinationTypeOptions.value.unshift({
      label: '全部',
      value: '0'
    })
    selectedExaminationType.value = examinationTypeOptions.value[0].value.toString()
  })
}

import {useMessage, SelectOption} from 'naive-ui'

const message = useMessage()

async function onPatientChange(value: string, option: SelectOption) {
  selectedPatient.value = value
  doRefresh()
}

async function onExaminationChange(value: string, option: SelectOption) {
  selectedExaminationType.value = value
  doRefresh()
}

async function doRefresh() {
  is_loading.value = true
  await fetchExamination({
    user_id: store.userInfo.id,
    patient_id: selectedPatient.value,
    examination_type_id: selectedExaminationType.value,
  }).then((res: any) => {
    images.value = res.data
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

function onUploadBoneButtonClick() {
  is_upload_panel_display.value = true
  const selectedExaminationTypeIndex = selectedExaminationTypeOptions.value.findIndex((examination_type: any) => examination_type.value === selectedExaminationType.value)
  selectedPatientIndex.value = patientOptions.value.findIndex((patient: any) => patient.value === selectedPatient.value)
  if (selectedExaminationTypeIndex !== -1)
    selectedUploadedExaminationType.value = selectedExaminationTypeOptions.value[selectedExaminationTypeIndex].value
  // if (selectedPatientIndex !== -1)
  //   selectedUploadedExaminationType.value = selectedExaminationTypeOptions.value[selectedExaminationTypeIndex].value
}

onMounted(async () => {
  await initOptions()
  await doRefresh()
})

</script>

<template>
  <n-modal v-model:show="is_upload_panel_display" preset="card" style="width: 800px" title=" "
           @close="is_upload_panel_display = false;" transform-origin="center">
    <div flex justify-center flex-col gap-y-4>
      <div flex justify-center font-bold font-size-6>
        上传面板
      </div>
      <div flex justify-center font-size-4>
        患者：{{ patientOptions[selectedPatientIndex].label }}
      </div>
      <div flex justify-center>
        <n-radio-group v-model:value="selectedUploadedExaminationType" name="radiogroup">
          <n-space>
            <n-radio
                v-for="examinationTypeOption in selectedExaminationTypeOptions"
                :key="examinationTypeOption.value"
                :value="examinationTypeOption.value"
                :label="examinationTypeOption.label"
            />
          </n-space>
        </n-radio-group>
      </div>
      <div flex justify-center>
        <n-upload action="http://127.0.0.1:4080/api/examination/upload/"
                  :data="{ user_id: store.userInfo.id ,patient_id: selectedPatient,examination_type_id: selectedUploadedExaminationType}"
                  :default-file-list="previewFileList" @change="onUploadStart" @finish="onUploadFinish" w-30
                  :disabled="!selectedUploadedExaminationType">
          <n-upload-dragger>
            <div>
              <n-icon size="14" :depth="3">
                <cloud-upload-outline/>
              </n-icon>
              <n-text>上传</n-text>
            </div>
          </n-upload-dragger>
        </n-upload>
      </div>
    </div>
  </n-modal>
  <n-modal v-model:show="isFinishUpload" preset="card" style="width: 1200px" title=" "
           @close="isStartUpload = false; doRefresh();">
    <img :src="previewImageUrlRef" w-full>
  </n-modal>
  <div flex flex-row bg-white h-full gap-x-5 pt-6>
    <div flex flex-row>
      <h3 mt-1 ml-3 mr-3>检测患者:</h3>
      <n-select @update:value="onPatientChange" v-model:value="selectedPatient" :options="patientOptions" w-30
                placeholder=""/>
    </div>
    <div flex flex-row>
      <h3 mt-1 ml-1 mr-3>检测类型</h3>
      <n-select @update:value="onExaminationChange" v-model:value="selectedExaminationType"
                :options="examinationTypeOptions" w-30 placeholder=""/>
    </div>
    <n-button @click="onUploadBoneButtonClick" :disabled="selectedPatient==='0'">
      上传骨骼
    </n-button>
  </div>
  <n-divider/>
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
