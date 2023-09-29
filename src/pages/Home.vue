<script setup lang="ts">
import {computed, ref} from "vue";
import { useUserStore } from "~/stores/user";
import {useRoute} from "vue-router";
import Gallery from "./gallery/index.vue"

import Examination from "./examination/index.vue"
import {
  NGrid,
  NGridItem
} from "naive-ui"

const route = useRoute()
const store = useUserStore()
const activeName = ref<string>("examination-page")

const menus = [{
  title: "检测记录",
  name: "examination-page"
}, {
  title: "患者记录",
  name: "patient-page"
}]

function navigate(item) {
  activeName.value = item.name
}
</script>

<template>
  <div flex justify-center>
    <n-grid :x-gap="20" style="width: 70%;" mt-22 >
      <n-grid-item :span="5">
        <ul class="center-menu">
          <li :class="{
                    'active': (item.name == activeName)
                }" v-for="(item, index) in menus" :key="index" @click="navigate(item)">
            {{ item.title }}
          </li>
        </ul>
      </n-grid-item>
      <n-grid-item :span="19" mt-3>
        <div class="bg-white rounded mb-10 !min-h-[75vh]">
          <Examination v-if="activeName=='examination-page'"/>
          <Gallery v-if="activeName=='patient-page'"/>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style scoped>
.center-menu {
  @apply list-none bg-white rounded;
}

.center-menu li {
  @apply px-5 py-3 text-sm cursor-pointer hover: (bg-blue-50);
}

.center-menu .active {
  @apply font-bold text-black-500 bg-white-200;
}

@keyframes floatBubbles {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes floatBubblesX {

  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-10px);
  }
}
</style>
