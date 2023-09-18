import type { LoadingBarApi } from 'naive-ui'
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import type { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'
import { ref } from "vue";
import { defineStore } from "pinia";

export const useNaiveProviderStore = defineStore('provider', () => {
    const loadingBar = ref<LoadingBarApi>()
    const messageApi = ref<MessageApiInjection>()
    const notificationApi = ref<NotificationApiInjection>()

    function setLoadingBar(b: LoadingBarApi) {
        loadingBar.value = b
    }

    function setMessageApi(b: MessageApiInjection) {
        messageApi.value = b
    }

    function setNotificationApi(b: NotificationApiInjection) {
        notificationApi.value = b
    }

    return { loadingBar, messageApi, notificationApi, setNotificationApi, setLoadingBar, setMessageApi }
})
