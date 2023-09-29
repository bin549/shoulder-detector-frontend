import axios from "axios";



export function fetchPatient(payload) {
    return axios({
        url: '/api/patient/list/',
        method: 'get',
        params: payload
    })
}
