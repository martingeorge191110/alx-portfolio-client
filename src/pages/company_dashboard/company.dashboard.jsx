import React, { useEffect, useLayoutEffect, useState } from "react";
import CompanyDashboardInvestor from "./company.investor";
import { useDispatch, useSelector } from "react-redux";
import CompanyDashboardOwner from "./company.owner.jsx";
import NotFoundPage from "../notfound_error/not.found.jsx";
import { useLocation } from "react-router-dom";
import LoadingPage from "../loading/loading.page.jsx";
import { IsLoadingAction } from "../../redux/actions.js";
import { CompanyBasicInfoApi } from "../../services/company.js";


const CompanyDashboard = () => {

   const token = useSelector(
      state => state.user.token
   )

   const dispatch = useDispatch()

   const location = useLocation();
   const company_id = location.pathname.split('/')[2]
   const [pageIsLoading, setPageIsLoading] = useState(true)
   const [error, setError] = useState(false)

   const [user, setUser] = useState({});
   const [company, setCompany] = useState({
      growthRates: [
         // { year: 2020, profit: "1500000" },
         // { year: 2021, profit: "3500000" },
         // { year: 2022, profit: "7500000" },
         // { year: 2023, profit: "12000000" }
      ],
      documents: [],
      investments: [
         // {
         //    id: "inv-1",
         //    amount: "$1,000,000",
         //    equity_percentage: 5.5,
         //    deal_status: "Active",
         //    user: {
         //       id: "user-1",
         //       f_n: "Michael",
         //       l_n: "Brown",
         //       avatar: "https://via.placeholder.com/80"
         //    }
         // },
         // {
         //    id: "inv-2",
         //    amount: "$500,000",
         //    equity_percentage: 2.8,
         //    deal_status: "Pending",
         //    user: {
         //       id: "user-2",
         //       f_n: "Emily",
         //       l_n: "Davis",
         //       avatar: "https://via.placeholder.com/80"
         //    }
         // }
      ]
   });


   useLayoutEffect(() => {
      dispatch(IsLoadingAction(true))
      CompanyBasicInfoApi({token, company_id}).then(
         res => {
            setCompany({...company, ...res.data_result.company, owners: res.data_result.owners, investments: res.data_result.investments})
            setUser({...res.data_result.user, isOwner: res.data_result.isOwner})
         }
      ).catch(
         rej => {
            setError(true)
            throw (rej)
         }
      ).finally(
         () => {
            dispatch(IsLoadingAction(false))
            setPageIsLoading(false)
         }
      )
   }, [])


   return (
      <>
         { pageIsLoading ?
            <LoadingPage />
            :
            error ?
            <NotFoundPage/>
            :
            user.isOwner ?
            <CompanyDashboardOwner
               company={company}
               user={user}
            />
            :
            <CompanyDashboardInvestor
               company={company}
               user={user}
            />
         }
      </>
   );
};

export default CompanyDashboard;