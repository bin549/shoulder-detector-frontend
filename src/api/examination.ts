import axios from "axios"


export function getExamination(payload) {
    return axios({
        url: '/api/examination/get/',
        method: 'get',
        params: payload
    })
}

export function fetchExamination(payload) {
    return axios({
        url: '/api/examination/list/',
        method: 'get',
        params: payload
    })
}

export function fetchExaminationType(payload) {
    return axios({
        url: '/api/examination/type/list/',
        method: 'get',
        params: payload
    })
}
