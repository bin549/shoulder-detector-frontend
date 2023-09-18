import { defineStore } from 'pinia'
import axios from "axios";
import { useLocalStorage } from "@vueuse/core";


export interface UserInfo {
    email: string,
    username: string,
}

export interface UserStore {
    userInfo: UserInfo | null
}

export const useUserStore = defineStore('user', {
    state: () => useLocalStorage<UserStore>('user', {
        userInfo: null,
    }),
    actions: {
        async login(payload: any) {
            const { data } = await axios.post("/api/user/token/", payload)
            console.log(data)
            // if (data.code == 400) {
            //     ElMessage.error(data.message)
            //     return
            // }
            // const { token } = data.data
            // console.log(token)
        },
        async getUserInfo(token: any) {
            // console.log(token)
        },
    },
})
