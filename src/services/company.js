import { CompanyDataInfo} from "./axios.instance.js";


export const CompanyBasicInfoApi = async ({token, company_id}) => {
   try {
      const response = await CompanyDataInfo.get(`/${company_id}`, {
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

export const CompanyGrowthRatesInfoApi = async ({token, company_id}) => {
   try {
      const response = await CompanyDataInfo.get(`/rates/${company_id}`, {
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

export const CompanySearcByNameApi = async ({token, name}) => {
   try {
      const response = await CompanyDataInfo.get(`/search/?name=${name}`, {
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

export const ChangeCompanyPicApi = async ({token, company_id, url}) => {
   try {
      const response = await CompanyDataInfo.put(`/${company_id}/avatar`, {
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

export const CreateStripeForCompanyApi = async ({token, data_body}) => {
   try {
      const response = await CompanyDataInfo.post(`/register`, {
         ...data_body
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

export const CreatingDocCompanyApi = async ({token, company_id, data_body}) => {
   try {
      const response = await CompanyDataInfo.post(`/document/${company_id}`, {
         ...data_body
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

export const ChangeCompanyGrowtRatesApi = async ({token, company_id, rates}) => {
   try {
      const deleteResponse = await CompanyDataInfo.delete(`/rates/${company_id}`, {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         }
      })

      if (!deleteResponse.data.success)
         throw (new Error(deleteResponse.data.message))

      const response = await CompanyDataInfo.post(`/rates/${company_id}`, rates, {
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

export const InvitOwnerApi = async ({token, user_id, company_id}) => {
   try {
      const response = await CompanyDataInfo.post(`/invite/${company_id}`, {
         user_id: user_id
      },{
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

export const AcceptingInvitaionApi = async ({token, rel}) => {
   try {
      const response = await CompanyDataInfo.put(`/accept/${rel}`, {}, {
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

export const RejectingInvitaionApi = async ({token, rel}) => {
   try {
      const response = await CompanyDataInfo.delete(`/reject/${rel}`, {
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

export const RetreivingDocsCompanyApi = async ({token, company_id}) => {
   try {
      const response = await CompanyDataInfo.get(`/document/${company_id}`, {
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
