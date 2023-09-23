import { inject, Ref } from "vue";

export const APP_CHANGE_KEY = 'app-change'

export function useAppChange() {
    const injectable = inject<Ref<boolean>>(APP_CHANGE_KEY)
    if (!injectable && import.meta.env.NODE_ENV === 'development')
        throw new Error('APP_CHANGE_KEY not found')
    return injectable as Ref<boolean>
}
