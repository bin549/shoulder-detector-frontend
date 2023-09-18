import { defineStore } from 'pinia'
import axios from "axios";
import { useLocalStorage } from "@vueuse/core";
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
        async login(payload: any) {
            const { data } = await axios.post("/api/user/token/", payload);
            setToken(data.token)
            console.log(data)
        },
        async getUserInfo() {
            console.log(getToken())
            console.log(getToken())
            // const {data} =  await axios.get("/api/user/me/", {
            //     Authorization: "token `{getToken()}`"
            // })
            // this.userInfo = data
        },
        logout({ commit }) {
            removeToken()
            // commit("SET_USERINFO", {})
        }
    },
})
