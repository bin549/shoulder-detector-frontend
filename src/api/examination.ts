import axios from "axios"


export function getExamination(payload) {
    return axios.get("/api/examination/get/",
        payload
    )
}
