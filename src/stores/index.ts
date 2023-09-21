import { createStore } from 'vuex'
import {removeToken} from "~/composables/auth";



const store = createStore({
    actions: {
        logout({ commit }) {
            removeToken()
            // commit("SET_USERINFO", {})
        }
    },
})

export default store
