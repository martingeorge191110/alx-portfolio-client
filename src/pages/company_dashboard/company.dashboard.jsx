import React, { useState } from "react";
import CompanyDashboardInvestor from "./company.investor";

const CompanyDashboard = () => {
   const [company, setCompany] = useState({
      id: "comp-12345",
      name: "Tech Innovators Inc.",
      description: "Leading provider of AI-powered business solutions",
      contact_number: "+1 (555) 123-4567",
      contact_email: "contact@techinnovators.com",
      industry: "Artificial Intelligence",
      location: "San Francisco, CA",
      web_link: "https://techinnovators.com",
      avatar: "https://via.placeholder.com/150",
      stock_market: true,
      founder_year: 2015,
      valuation: "$2.5 Billion",
      created_at: "2020-01-15T08:00:00Z",
      updated_at: "2023-07-20T14:30:00Z",
      owners: [
         {
            id: "owner-1",
            f_n: "John",
            l_n: "Smith",
            avatar: "https://via.placeholder.com/80",
            role: "CEO & Founder"
         },
         {
            id: "owner-2",
            f_n: "Sarah",
            l_n: "Johnson",
            avatar: "https://via.placeholder.com/80",
            role: "CTO"
         }
      ],
      growthRates: [
         { year: 2020, profit: "1500000" },
         { year: 2021, profit: "3500000" },
         { year: 2022, profit: "7500000" },
         { year: 2023, profit: "12000000" }
      ],
      documents: [
         {
            id: "doc-1",
            title: "2023 Annual Report",
            description: "Complete financial overview for 2023",
            fileUrl: "/reports/2023-annual.pdf"
         },
         {
            id: "doc-2",
            title: "Q1 2024 Financials",
            description: "First quarter financial results",
            fileUrl: "/reports/q1-2024.pdf"
         }
      ],
      investments: [
         {
            id: "inv-1",
            amount: "$1,000,000",
            equity_percentage: 5.5,
            deal_status: "Active",
            user: {
               id: "user-1",
               f_n: "Michael",
               l_n: "Brown",
               avatar: "https://via.placeholder.com/80"
            }
         },
         {
            id: "inv-2",
            amount: "$500,000",
            equity_percentage: 2.8,
            deal_status: "Pending",
            user: {
               id: "user-2",
               f_n: "Emily",
               l_n: "Davis",
               avatar: "https://via.placeholder.com/80"
            }
         }
      ]
   });

   const [user, setUser] = useState({
      id: "user-123",
      f_n: "Alex",
      l_n: "Johnson",
      avatar: "https://via.placeholder.com/80",
      paid: false,
      isOwner: false,
      email: "alex.johnson@example.com"
   });

   return (
      <CompanyDashboardInvestor
         company={company}
         user={user}
      />
   );
};

export default CompanyDashboard;