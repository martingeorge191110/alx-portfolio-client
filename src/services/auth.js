import { AxiosError } from 'axios';
import { UserAuth } from './axios.instance';


export const LoginApi = async ({userEmail, password}) => {
   try {
      const response = await UserAuth.post("/login", {
         email: userEmail, password: password
      }, {
         headers: {
            "Content-Type": "application/json"
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}
