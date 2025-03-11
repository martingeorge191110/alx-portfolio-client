import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
   FaBuilding, FaPhone, FaEnvelope, FaGlobe, FaLink, FaChartLine,
   FaFilePdf, FaUserTie, FaDollarSign, FaLock, FaUserPlus, FaRegFilePdf,
   FaRocket,
   FaIndustry,
   FaMapMarkerAlt,
   FaCalendarAlt,
   FaAddressBook,
   FaUserFriends,
   FaCrown,
   FaUserTag,
   FaUpload,
   FaCalendar,
   FaHandshake,
   FaCertificate,
   FaClock,
   FaPercent,
   FaBalanceScale
} from 'react-icons/fa';
import { FiUsers, FiArrowUpRight, FiDownload } from 'react-icons/fi';
import './company_dashboard.css';
import { AiOutlineStock } from 'react-icons/ai';

const cardVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.6,
         ease: "easeInOut"
      }
   }
};

const CompanyDashboardInvestor = ({ company, user }) => {
   const [growthData, setGrowthData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   // Parse growth data from string to number
   useEffect(() => {
      const parsed = company.growthRates.map(rate => ({
         year: rate.year,
         profit: parseFloat(rate.profit),
         revenue: parseFloat(rate.revenue)
      }));
      setGrowthData(parsed);
      setIsLoading(false);
   }, [company.growthRates]);

   const PaidContentWrapper = ({ children, required = true }) => {
      if (!required || user.paid) return children;

      return (
         <motion.div className="premium-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="blur-overlay">
               <div className="premium-cta">
                  <FaLock size={32} />
                  <h4>Upgrade to Premium</h4>
                  <p>Unlock full access to this content</p>
                  <button className="premium-btn">
                     Upgrade Now <FiArrowUpRight />
                  </button>
               </div>
            </div>
            <div className="content-wrapper">
               {children}
            </div>
         </motion.div>
      );
   };

   return (
      <motion.div
         className="company-dashboard container-fluid"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
      >
         {/* Animated Header Section */}
         <motion.section
            className="company-header row g-4 align-items-center py-5"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
         >
            <div className="col-md-3 text-center position-relative">
               <motion.img
                  src={company.avatar || 'https://th.bing.com/th/id/R.ecd9c2e8ed0dbbc96ac472a965e4afda?rik=rZ%2b5er9OQMjXkQ&pid=ImgRaw&r=0'}
                  alt={company.name}
                  className="company-logo rounded-4 shadow-lg"
                  whileHover={{ rotate: -2, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
               />
               <motion.div
                  className="floating-badge bg-primary text-white rounded-pill px-3 py-1 small position-absolute top-0 end-0 mt-3 me-3"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
               >
                  <FaBuilding className="me-1" /> Verified
               </motion.div>
            </div>

            <div className="col-md-9">
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
               >
                  <h1 className="display-4 fw-bold mb-3">
                     {company.name}
                     <FaRocket className="ms-3 text-warning" />
                  </h1>
                  <motion.p
                     className="lead text-muted mb-4"
                     initial={{ x: -50 }}
                     animate={{ x: 0 }}
                  >
                     {company.description}
                  </motion.p>

                  <div className="d-flex gap-3 flex-wrap">
                     {[
                        { icon: FaIndustry, text: company.industry },
                        { icon: FaMapMarkerAlt, text: company.location },
                        { icon: FaCalendarAlt, text: `Founded ${company.founder_year}` },
                        { icon: FaBalanceScale, text: `$${company.valuation / 1000000} Million` },
                        { icon: AiOutlineStock, text: company.stock_market ? 'In Stock Market' : 'Is not in Stock Market' }
                     ].map((item, idx) => (
                        <motion.div
                           key={idx}
                           className="badge bg-light text-dark rounded-pill px-3 py-2 d-flex align-items-center"
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           transition={{ delay: 0.5 + idx * 0.1 }}
                        >
                           <item.icon className="text-primary me-2" />
                           {item.text}
                        </motion.div>
                     ))}
                  </div>
               </motion.div>
            </div>
         </motion.section>

         {/* Staggered Info Grid */}
         <motion.div
            className="row g-4 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
         >
            {/* Contact Card */}
            <motion.div
               className="col-lg-6"
               variants={cardVariants}
            >
               <div className="card h-100 border-0 shadow-hover">
                  <div className="card-header bg-transparent d-flex align-items-center">
                     <FaAddressBook className="fs-3 text-primary me-2" />
                     <h3 className="mb-0">Contact Information</h3>
                  </div>
                  <PaidContentWrapper>
                     <div className="card-body">
                        <InfoItem
                           icon={FaPhone}
                           label="Phone"
                           value={company.contact_number}
                           isProtected
                        />
                        <InfoItem
                           icon={FaEnvelope}
                           label="Phone"
                           value={company.contact_number}
                           isProtected
                        />
                        {company.web_link && (
                           <InfoItem
                              icon={FaLink}
                              label="Website"
                              value={
                                 <a href={user.paid ? company.web_link : ''} className="text-decoration-none">
                                    Visit Site <FiArrowUpRight className="ms-1" />
                                 </a>
                              }
                           />
                        )}
                     </div>
                  </PaidContentWrapper>
               </div>
            </motion.div>

            {/* Ownership Card */}
            <motion.div
               className="col-lg-6"
               variants={cardVariants}
            >
               <div className="card h-100 border-0 shadow-hover">
                  <div className="card-header bg-transparent d-flex align-items-center">
                     <FaUserFriends className="fs-3 text-primary me-2" />
                     <h3 className="mb-0">Ownership Structure</h3>
                  </div>
                  <div className="card-body">
                     <div className="row g-3">
                        {company.owners.map((owner, idx) => (
                           <motion.div
                              key={owner.id}
                              className="col-md-6"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + idx * 0.1 }}
                           >
                              <div className="d-flex align-items-center p-3 bg-light rounded-3">
                                 <img
                                    src={owner.avatar || 'https://th.bing.com/th/id/OIP.nYjTZMgoAAgpLUBL5ooqWwHaHa?rs=1&pid=ImgDetMain'}
                                    alt={owner.f_n}
                                    className="rounded-circle me-3"
                                    width="60"
                                    height="60"
                                 />
                                 <div>
                                    <h5 className="mb-1">
                                       {owner.f_n} {owner.l_n}
                                       <FaCrown className="ms-2 text-warning" />
                                    </h5>
                                    <small className="text-muted d-flex align-items-center">
                                       <FaUserTag className="me-2" />
                                       {owner.role}
                                    </small>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>
         </motion.div>

         {/* Enhanced Growth Chart */}
         {/* <PaidContentWrapper> */}
         {
            <motion.section
               className="card border-0 shadow-hover mb-5 card"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
            >
               <div className="card-header bg-transparent d-flex align-items-center">
                  <FaChartLine className="fs-3 text-primary me-2" />
                  <h3 className="mb-0">Financial Performance</h3>
               </div>
               <PaidContentWrapper>
               <div className="card-body">
                  {isLoading ? (
                     <ChartSkeleton />
                  ) : (
                     <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={growthData}>
                           <XAxis
                              dataKey="year"
                              tick={{ fill: '#6c757d' }}
                              axisLine={{ stroke: '#dee2e6' }}
                           />
                           <YAxis
                              tickFormatter={(value) => `$${value / 1e6}M`}
                              tick={{ fill: '#6c757d' }}
                              axisLine={{ stroke: '#dee2e6' }}
                           />
                           <Tooltip
                              contentStyle={{
                                 background: 'rgba(255, 255, 255, 0.95)',
                                 border: 'none',
                                 borderRadius: '0.5rem',
                                 boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)'
                              }}
                           />
                           <Line
                              type="monotone"
                              dataKey="profit"
                              stroke="#6366f1"
                              strokeWidth={2}
                              dot={{ fill: '#6366f1', r: 4 }}
                              activeDot={{ r: 8 }}
                           />
                           <Line
                              type="monotone"
                              dataKey="revenue"
                              stroke="#10b981"
                              strokeWidth={2}
                              dot={{ fill: '#10b981', r: 4 }}
                              activeDot={{ r: 8 }}
                           />
                        </LineChart>
                     </ResponsiveContainer>
                  )}
               </div>
               </PaidContentWrapper>
                  </motion.section>
         }
         {/* </PaidContentWrapper> */}

         {/* Document Section with Shimmer Effect */}
            <motion.section
               className="card border-0 shadow-hover mb-5"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6 }}
            >
               <div className="card-header bg-transparent d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                     <FaFilePdf className="fs-3 text-primary me-2" />
                     <h3 className="mb-0">Corporate Documents</h3>
                  </div>
                  { user.isOwner && <motion.button
                     className="btn btn-primary rounded-pill px-4 d-flex align-items-center"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     <FaUpload className="me-2" />
                     New Document
                  </motion.button>}
               </div>
               <PaidContentWrapper>
               <div className="card-body">
                  <div className="row g-4">
                     {company.documents.map((doc, idx) => (
                        <motion.div
                           key={doc.id}
                           className="col-md-6 col-xl-4"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.2 + idx * 0.1 }}
                        >
                           <div className="document-card p-4 bg-light rounded-3 position-relative">
                              <div className="shimmer-effect" />
                              <FaRegFilePdf className="text-danger fs-2 mb-3" />
                              <h5 className="mb-2">{user.paid && doc.title}</h5>
                              <p className="text-muted small mb-3">{user.paid && doc.description}</p>
                              <div className="d-flex justify-content-between align-items-center">
                                 <small className="text-muted">
                                    <FaCalendar className="me-1" />
                                    {new Date().toLocaleDateString()}
                                 </small>
                                 <motion.a
                                    href={user.paid && doc.fileUrl}
                                    download
                                    className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                    whileHover={{ x: 5 }}
                                 >
                                    Download <FiDownload className="ms-1" />
                                 </motion.a>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
               </PaidContentWrapper>
            </motion.section>

         {/* Investment Section with Staggered Cards */}
            <motion.section
               className="card border-0 shadow-hover"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8 }}
            >
               <div className="card-header bg-transparent d-flex align-items-center">
                  <FaHandshake className="fs-3 text-primary me-2" />
                  <h3 className="mb-0">Active Investments</h3>
               </div>
               <PaidContentWrapper>
               <div className="card-body">
                  <div className="row g-4">
                     {company.investments.map((investment, idx) => (
                        <motion.div
                           key={investment.id}
                           className="col-md-6 col-lg-4"
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: 0.2 + idx * 0.1 }}
                        >
                           <div className="investment-card p-4 bg-light rounded-3">
                              <div className="d-flex align-items-center mb-3">
                                 <img
                                    src={user.paid && investment.user.avatar}
                                    alt={user.paid && investment.user.f_n}
                                    className="rounded-circle me-3"
                                    width="60"
                                    height="60"
                                 />
                                 <div>
                                    <h5 className="mb-1">
                                       {user.paid && investment.user.f_n} {user.paid && investment.user.l_n}
                                       <FaCertificate className="ms-2 text-success" />
                                    </h5>
                                    <small className="text-muted">
                                       <FaClock className="me-1" />
                                       {new Date(investment.created_at).toLocaleDateString()}
                                    </small>
                                 </div>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                 <div>
                                    <span className="badge bg-primary rounded-pill px-3 py-2">
                                       <FaDollarSign className="me-1" />
                                       {user.paid && investment.amount}
                                    </span>
                                 </div>
                                 <div className="text-end">
                                    <span className={`status-badge ${user.paid && investment.deal_status}`}>
                                       {user.paid && investment.deal_status}
                                    </span>
                                    <div className="text-muted small mt-1">
                                       <FaPercent className="me-1" />
                                       {user.paid && investment.equity_percentage}% Equity
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
               </PaidContentWrapper>
            </motion.section>
      </motion.div>
   );
};

const InfoItem = ({ icon: Icon, label, value, isProtected }) => (
   <div className="d-flex align-items-center mb-3">
      <div className="icon-wrapper bg-primary text-white rounded-circle p-3 me-3">
         <Icon className="fs-5" />
      </div>
      <div>
         <small className="text-muted d-block">{label}</small>
         <span className="fw-medium">
            {isProtected ? (
               <span className="text-blur">{'••••••••••'}</span>
            ) : (
               value
            )}
         </span>
      </div>
   </div>
);

const ChartSkeleton = () => (
   <div className="chart-skeleton">
      {[...Array(6)].map((_, idx) => (
         <motion.div
            key={idx}
            className="skeleton-bar"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: idx * 0.1 }}
         />
      ))}
   </div>
);

export default CompanyDashboardInvestor;
