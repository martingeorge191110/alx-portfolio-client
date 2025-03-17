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

export const RespondInvestment = async ({ token, deal_id, status }) => {
   try {
      const response = await InvestmentDataInfo.put(`/company/${deal_id}`, {
         deal_status: status
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
