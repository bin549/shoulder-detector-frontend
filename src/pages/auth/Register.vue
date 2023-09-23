<script setup lang="ts">
import { NButton, NInput } from "naive-ui";
import { useAppChange } from "~/composables/useAppChange";
import { useAuthStore } from "~/stores/auth";
import { ref, watch } from "vue";
import { useMessage } from 'naive-ui'
import { sendEmailCaptcha } from "~/api/auth";
import { useStore } from "vuex";

const receive_captcha = ref<string>("")
const store = useAuthStore()
const isChangeApp = useAppChange()
const message = useMessage()
const { setApp } = useAuthStore()

const username = ref<string>('')
const password = ref<string>('')
const email = ref<string>('')
const timeout_captcha = ref<number>(-1)
const captcha = ref<string>("")

async function changeApp(appName) {
  await setApp(appName)
  isChangeApp.value = !isChangeApp.value
}

const reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

const AuthValuateCode = {
  SUCCESS: true,
  FAILED: false,
};

watch(timeout_captcha, (newValue) => {
  if (newValue === 0) {
  }
});

function checkEmail() {
  if (!email.value) {
    message.warning("邮箱不能为空", { duration: 1500 })
    return AuthValuateCode.FAILED
  }
  if (!reg_email.test(email.value)) {
    message.warning("请输入正确的邮箱", { duration: 1500 })
    return AuthValuateCode.FAILED
  }
  return AuthValuateCode.SUCCESS
}

async function sendCaptchaCode() {
  if (!checkEmail())
    return
  message.success("验证码已经发送", { duration: 1500 })
  timeout_captcha.value = 60
  await sendEmailCaptcha({
    email: email.value,
  }).then((res) => {
    receive_captcha.value = res.data
  });
  const timer = setInterval(() => {
    timeout_captcha.value--
    if (timeout_captcha.value === 0) {
      clearInterval(timer)
    }
  }, 1000);
}

function submitForm() {
  if (!username.value) {
    message.warning("用户名不能为空", { duration: 1500 })
    return
  }
  if (!checkEmail())
    return
  // if (!captcha.value) {
  //   message.warning("邮箱验证码不能为空", { duration: 1500 })
  //   return
  // } else {
  //   if (timeout_captcha.value === -1) {
  //     message.warning("请先发送验证码", { duration: 1500 })
  //     return
  //   } else {
  //     if (captcha.value !== receive_captcha.value.toString().padStart(6, '0')) {
  //       message.warning("验证码输入错误", { duration: 1500 })
  //       return
  //     }
  //   }
  // }
  if (!password.value) {
    message.warning("密码不能为空", { duration: 1500 })
    return
  }
  store.register({
    username: username.value,
    email: email.value,
    password: password.value,
  }).then((res) => {
    message.success("注册成功", { duration: 1500 })
    changeApp('login')
  }).catch((res) => {
    message.error("用户名或者邮箱已被使用")
  })
}

</script>

<template>
  <div class="register-card" bg-white w-120 h-100 position-absolute flex flex-col gap-y-1 rounded-md px-8 py-4 shadow-md
    backdrop-blur blur>
    <div w-full h-2 flex-inline items-center justify-center bg-black b-white border-5 c-white pb-12 pt-8>
      <div h-2 flex-inline items-center>
        <div font-size-6 font-bold>新建账号</div>
      </div>
    </div>
    <div justify-center items-center flex flex-row bg-white h-70>
      <div class="login-content" @submit.prevent="submitForm" w-full>
        <div>
          <span font-size-3 font-bold>用户名</span>
          <n-input v-model:value="username" placeholder="" />
        </div>
        <div>
          <span font-size-3 font-bold>邮箱</span>
          <div>
            <n-input v-model:value="email" placeholder="" />
          </div>
        </div>
        <div>
          <span font-size-3 font-bold>邮箱验证码</span>
          <div flex flex-row>
            <n-input v-model:value="captcha" placeholder="" />
            <n-button v-if="timeout_captcha === -1" type="tertiary" color="#000000" @click="sendCaptchaCode" plain w-28 flex
              flex-row flex-justify-center>
              发送验证码
            </n-button>
            <n-button v-else-if="timeout_captcha === 0" @click="sendCaptchaCode()">
              重新发送验证码
            </n-button>
            <n-button v-else disabled>{{ timeout_captcha }}秒后重新发送</n-button>
          </div>
        </div>
        <div>
          <span font-size-3 font-bold>密码</span>
          <n-input v-model:value="password" placeholder="" />
        </div>
      </div>
    </div>
    <div w-full justify-center items-center flex flex-col bg-white mt-2>
      <n-button type="tertiary" color="#000000" @click="submitForm" plain w-full>注册</n-button>
      <n-button type="tertiary" @click="changeApp('login')" plain w-full bg-white c-black>已经拥有账号</n-button>
    </div>
  </div>
</template>

<style scoped>
.register-card {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
