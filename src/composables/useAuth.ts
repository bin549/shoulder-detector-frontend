import { logout } from "~/api/auth.ts"
import { showModal, toast } from "~/composables/util.ts"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

export function useLogout() {
    const router = useRouter()
    const store = useStore()
    function handleLogout() {
        // showModal("是否要退出登录？").then(res => {
        //     logout().finally(() => {
                store.dispatch("logout")
                router.push("/login")
        //     })
        // })
    }

    return {
        handleLogout
    }
}
