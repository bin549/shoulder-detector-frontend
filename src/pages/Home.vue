<script setup lang="ts">
import {NImage, NGrid, NSpace, NUpload, NUploadDragger, NText } from "naive-ui"
import {Archive } from '@vicons/ionicons5'
import { Icon } from '@vicons/utils'

</script>

<template>
  <div bc-black b-3 flex flex-justify-center mt-30 >
    <div c-black style="width: 60%;" >
      <n-space justify="space-around" size="large">
          <n-image
              width="100"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          <n-image
              width="100"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          <n-image
              width="100"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          <n-image
              width="100"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          <n-image
              width="100"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
      </n-space>
      <n-space justify="space-around" size="large">
          <n-image
              width="100"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          <n-image
              width="100"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          <n-image
              width="100"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          <n-image
              width="100"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          <n-image
              width="100"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
      </n-space>

      <n-space justify="space-around" size="large">
        <n-upload
            multiple
            directory-dnd
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            :max="5"
        >
          <n-upload-dragger>
            <div style="margin-bottom: 12px">
              <n-icon size="14" :depth="3">
                  <archive w-20 h-20 />
              </n-icon>
            </div>
            <n-text style="font-size: 16px">
              请上传你要检测的骨骼图片
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
            </n-p>
          </n-upload-dragger>
        </n-upload>
      </n-space>

    </div>
  </div>
</template>

<style scoped>
</style>
