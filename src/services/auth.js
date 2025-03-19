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

export const RegisterApi = async ({f_n, l_n, email, password, confirm_password, user_type, nationality}) => {
   try {
      const response = await UserAuth.post("/register", {
         f_n, l_n, email, password, confirm_password, nationality, user_type
      },{
         headers: {
            "Content-Type": "application/json"
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}


export const SendCodeApi = async ({email}) => {
   try {
      const response = await UserAuth.post("/request-code", {
         email
      },{
         headers: {
            "Content-Type": "application/json"
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}

export const CheckCodeApi = async ({email, code}) => {
   try {
      const response = await UserAuth.post("/reset-pass", {
         email, code
      },{
         headers: {
            "Content-Type": "application/json"
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}

export const CreateNewPassowrdApi = async ({email, password, confirm_password}) => {
   try {
      const response = await UserAuth.put("/reset-pass", {
         email, password, confirm_password
      },{
         headers: {
            "Content-Type": "application/json"
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}
