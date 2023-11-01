<script setup lang="ts">
import {NGrid, NGridItem, NImage, NCard, NModal, NSpin, NDivider, NPagination, NPopconfirm} from "naive-ui"
import {onMounted, ref} from "vue";
import {fetchExamination} from "~/api/examination.ts"
import {fetchPatientByPage, createPatient, deletePatient} from "~/api/patient.ts"
import {useUserStore} from "~/stores/user.ts";


const store = useUserStore()
const previewImageUrlRef = ref(import("~/assets/doctor-1.png"))
const patients = ref<any>([])
import {useMessage, useDialog} from 'naive-ui'

const showModal = ref<boolean>(false)
const is_loading = ref<boolean>(false)

const message = useMessage()

function onCreatePatient() {
  showModal.value = true
}

import {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormRules
} from 'naive-ui'

interface PatientModelType {
  name: string | null
  zone_id: number | null
}

const page = ref<number>(1)
const limit = ref<number>(15)
const total_page = ref<number>(20)
const formRef = ref<FormInst | null>(null)
const patientModel = ref<PatientModelType>({
  "name": "",
  "zone_id": 1,
})
const rules: FormRules = {
  age: [
    {
      required: true,
      trigger: ['input', 'blur']
    }
  ],
  zone: [
    {
      required: true,
      trigger: ['input', 'blur']
    }
  ],
}

async function addPatient() {
  await createPatient({
    name: patientModel.value.name,
    zone_id: patientModel.value.zone_id,
  }).then((res: any) => {
    message.success("'添加患者成功")
    doRefresh()
  })
  showModal.value = false
}

async function doRefresh() {
  is_loading.value = true
  await fetchPatientByPage({
    user_id: store.userInfo.id,
    limit: limit.value,
    page: page.value,
  }).then((res: any) => {
    patients.value = res.data.list
    total_page.value = Math.ceil(res.data.total_size / limit.value)
  })
  is_loading.value = false
}

async function handleRemovePatient(patient_id) {
  await deletePatient({
    id: patient_id
  }).then((res: any) => {
    message.success("'删除患者成功")
    doRefresh()
  })
}

const emits = defineEmits("checkPatient")

onMounted(async () => {
  await doRefresh();
})
</script>

<template>
  <n-modal v-model:show="showModal" transform-origin="center">
    <n-card
        style="width: 600px"
        title="患者信息"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-form ref="formRef" :model="patientModel" :rules="rules">
        <n-form-item path="name" label="患者姓名">
          <n-input v-model:value="patientModel.name" placeholder="请输入患者姓名" @keydown.enter.prevent/>
        </n-form-item>
        <n-form-item path="zone" label="住院信息">
          <n-input v-model:value="patientModel.zone_id" placeholder="请输入住院信息" @keydown.enter.prevent/>
        </n-form-item>
        <div flex flex-end>
          <n-button
              :disabled="!patientModel.name"
              round
              type="primary"
              @click="addPatient"
          >
            确定
          </n-button>
        </div>
      </n-form>
    </n-card>
  </n-modal>
  <div relative h-145>
    <div mt-1 justify-center flex>
      <div style="width: 90%;">
        <n-button @click="onCreatePatient">新建患者</n-button>
        <n-divider/>
        <n-spin size="large" v-if="is_loading" flex justify-center mt-40/>
        <n-grid :x-gap="12" :y-gap="10" :cols="5" v-else>
          <n-grid-item v-for="(patient, index) in patients" :key="index">
            <div flex flex-col bg-white border-dark border-8 relative>
              <n-popconfirm :show-icon="false" @positive-click="handleRemovePatient(patient.id)">
                <template #trigger>
                  <div absolute style="right: 0; top: 0;" bg-gray w-4 h-4>
                  </div>
                </template>
              </n-popconfirm>
              <div flex justify-center w-30>
                <img width="90" height="90" :src="patient.get_image"/>
              </div>
              <div flex flex-col justify-center>
                <div flex justify-center>{{ patient.name ? patient.name : "NULL" }}</div>
                <n-button @click="emits('checkPatient', patient.id)">查看记录</n-button>
              </div>
            </div>
          </n-grid-item>
        </n-grid>
      </div>
    </div>
    <div w-full bg-white flex justify-center absolute style="bottom: 0px;">
      <n-pagination v-model:page="page" :page-count="total_page" @update:page="doRefresh()"/>
    </div>
  </div>
</template>

<style scoped></style>
