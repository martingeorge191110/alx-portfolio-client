import axios from "axios";


const url = "http://localhost:8000"


export const UserAuth = axios.create({
   baseURL: `${url}/api/auth/`,
   withCredentials: true
})

export const UserDataInfo = axios.create({
   baseURL: `${url}/api/user/`,
   withCredentials: true
})

export const CompanyDataInfo = axios.create({
   baseURL: `${url}/api/company/`,
   withCredentials: true
})
