import { defineStore } from "pinia";
import { createUser } from "~/api/auth";

export interface AuthStore {
    app?: String
}


const AuthValuateCode = {
    SUCCESS: true,
    FAILED: false,
};

export const useAuthStore = defineStore('auth', {
    state: (): AuthStore => {
        return {
            app: "login",
        }
    },
    actions: {
        getApp() {
            return this.app
        },
        setApp(app: String) {
            this.app = app
        },
        register(payload) {
            return new Promise((resolve, reject) => {
                createUser(payload).then(res => {
                    // if (res.data.code === 400) {
                    //     ElMessage.error("账号或者密码错误")
                    //     reject()
                    //     return
                    // }
                    // setToken(res.data.data["token"])
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
    },
})
