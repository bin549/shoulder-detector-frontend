import { defineStore } from 'pinia'
import axios from "axios";
import { useLocalStorage } from "@vueuse/core";
import {login} from "~/api/auth.ts"
import {
    getToken,
    setToken,
    removeToken
} from '~/composables/auth.ts'


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
        login(payload: any) {
            return new Promise((resolve, reject) => {
                 login(payload).then((res) => {
                    setToken(res.data.token)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        async getUserInfo() {
            console.log(getToken())
            console.log(getToken())
            // const {data} =  await axios.get("/api/user/me/", {
            //     Authorization: "token `{getToken()}`"
            // })
            // this.userInfo = data
        },
    },
})
