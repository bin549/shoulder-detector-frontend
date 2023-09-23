
import nprogress from 'nprogress'
import { useNotification } from 'naive-ui'

const notification = useNotification()

export function toast(message, type = "success", dangerouslyUseHTMLString = true) {

    notification.create({
        title: 'What is Pingshan Road + rain ?',
        content: message,
        duration: 1000,
        closable: false,
    })
}

export function showFullLoading() {
    nprogress.start()
}

export function hideFullLoading() {
    nprogress.done()
}
