import { InvestmentDataInfo } from "./axios.instance.js";


export const CreateDealApi = async ({ token, company_id, data_body }) => {
   try {
      const response = await InvestmentDataInfo.post(`/company/${company_id}/deal`, {
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
