import axios from "axios";


const url = "http://localhost:8000"


export const UserAuth = axios.create({
   baseURL: `${url}/api/auth/`,
   withCredentials: true
})
