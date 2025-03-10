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
