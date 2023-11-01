<script setup lang="ts">
import {NGrid, NGridItem, NImage, NCard, NModal, NSpace} from "naive-ui"
import { onMounted, ref } from "vue";
import { fetchExamination } from "~/api/examination.ts"
import { useUserStore } from "~/stores/user.ts";

const store = useUserStore()
const previewImageUrlRef = ref("~/assets/5383acee-58e5-11ee-9587-0242ac130003.png")
const images = ref<any>([1,2,3,4,5,6])
import { useMessage, useDialog } from 'naive-ui'

const showModal = ref<boolean>(false)

function handleButtonClick () {
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
  zone: string | null
}
const formRef = ref<FormInst | null>(null)
const patientModel = ref<PatientModelType>({
  "name" : "",
  "zone" : "",
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

function createPatient() {
  console.log(patientModel.value)
  showModal.value = false
}
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
            <n-input v-model:value="patientModel.name" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="zone" label="住院信息">
            <n-input v-model:value="patientModel.zone" @keydown.enter.prevent />
          </n-form-item>
          <div flex flex-end>
            <n-button
                :disabled="!patientModel.name"
                round
                type="primary"
                @click="createPatient"
            >
              确定
            </n-button>
          </div>
      </n-form>
    </n-card>
  </n-modal>
  <div mt-1 justify-center flex>
    <div w-full>
      <n-button @click="handleButtonClick">新建患者</n-button>
      <n-grid :x-gap="12" :y-gap="8" :cols="5">
        <n-grid-item v-for="(item, index) in images" :key="index">
          <div h-35 flex flex-col>
            <n-image width="120" :src="previewImageUrlRef"/>
            <div flex flex-row gap-y-1>
              <p>RTL:232</p>
              <p>CSA:3232</p>
              <p>AI:32</p>
            </div>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<style scoped></style>
