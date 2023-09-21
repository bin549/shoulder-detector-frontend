import axios from "axios"


export function login(payload) {
    console.log(payload)
    return axios.post("/api/user/token/",
        payload
    )
}
