// naive-ui.ts
import { App } from 'vue'
import {
    // create naive ui
    create,
    // component
    NButton,
    NInput
} from 'naive-ui'

const naive = create({
    components: [
        NButton,
        NInput
    ]
})
export default naive
