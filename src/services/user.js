import { number } from "yup";
import { UserDataInfo } from "./axios.instance";


export const TokenValidApi = async ({token}) => {
   try {
      const response = await UserDataInfo.get("/token-valid", {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}

export const UserProfileApi = async ({token}) => {
   try {
      const response = await UserDataInfo.get("/profile", {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}

export const UpdateToPremAccountApi = async ({token}) => {
   try {
      const response = await UserDataInfo.post("/subiscripe", null,{
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}


export const ChangeUserPicApi = async ({token, url}) => {
   try {
      const response = await UserDataInfo.put("/avatar", {
         secure_url: url
      }, {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}

export const UserSearchingApi = async ({token, f_name, l_name = null, page}) => {
   try {
      const response = await UserDataInfo.get(`/search/?f_n=${f_name}&l_n=${l_name}&page=${Number(page)}`, {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}