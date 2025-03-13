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

export const SendNotificationNotificationsApi = async ({token, user_id, content}) => {
   try {
      const response = await NotificationDataInfo.post(`/${user_id}`, {
         content
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

export const SeenAllNotificationsApi = async ({token, notifications_arr}) => {
   try {
      const not_success_arr = []

      for (const id of notifications_arr) {
         const response = await NotificationDataInfo.put(`/${id}`, {}, {
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            }
         })

         if (!response.data.success)
            not_success_arr.push(id)

      }

      if (not_success_arr.length > 0)
         return ({success: false})
      else
         return ({success: false})

   } catch (err) {
      console.log(err.response.data)
      return (err.response.data)
   }
}
