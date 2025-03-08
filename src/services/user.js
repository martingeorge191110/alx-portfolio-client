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
