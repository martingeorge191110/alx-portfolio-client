import { NotificationDataInfo} from "./axios.instance";


export const RetreiveAllNotificationsApi = async ({token, page}) => {
   try {
      const response = await NotificationDataInfo.get(`/?page=${page}`, {
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
