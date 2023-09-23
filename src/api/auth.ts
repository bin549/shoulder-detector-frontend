import axios from "axios"


export function login(payload) {
    return axios.post("/api/user/token/",
        payload
    )
}

export function createUser(payload) {
    return axios.post("/api/user/create/",
        payload
    )
}

export function sendEmailCaptcha(query) {
    return axios({
        url: '/api/user/email_captcha/',
        method: 'get',
        params: query
    })
}
