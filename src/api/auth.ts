import axios from "axios"


export function login(payload) {
    return axios.post("/api/user/token/",
        payload
    )
}
