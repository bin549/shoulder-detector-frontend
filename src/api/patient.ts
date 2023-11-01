import axios from "axios";



export function fetchPatientByPage(payload) {
    return axios({
        url: '/api/patient/list/',
        method: 'get',
        params: payload
    })
}

export function createPatient(data) {
    return axios({
        url: '/api/patient/create/',
        method: 'post',
        data
    })
}
export function deletePatient(data) {
    return axios({
        url: '/api/patient/delete/',
        method: 'delete',
        data
    })
}
