import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FaSearch, FaFilter, FaIndustry, FaMapMarkerAlt, FaCalendarAlt,
   FaDollarSign, FaChartLine, FaEye, FaSync,
   FaSort,
   FaArrowDown,
   FaListOl
} from 'react-icons/fa';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './searching_companies.css';
import { CompanySearcByNameApi } from '../../services/company';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../components/loading_spinners/loading';
import { useNavigate } from 'react-router-dom';

// Static data
const sampleCompanies = [
//    {
//       id: 1,
//       name: 'Tech Innovators Inc.',
//       industry: 'Artificial Intelligence',
//       valuation: '$2.5B',
//       stock_market: 'NYSE: TII',
//       avatar: 'https://th.bing.com/th/id/R.ecd9c2e8ed0dbbc96ac472a965e4afda?rik=rZ%2b5er9OQMjXkQ&pid=ImgRaw&r=0',
//       location: 'San Francisco, CA',
//       founded: 2015
//    },
//    {
//       id: 2,
//       name: 'Green Energy Solutions',
//       industry: 'Renewable Energy',
//       valuation: '$1.2B',
//       stock_market: 'NASDAQ: GES',
//       avatar: 'https://th.bing.com/th/id/R.ecd9c2e8ed0dbbc96ac472a965e4afda?rik=rZ%2b5er9OQMjXkQ&pid=ImgRaw&r=0',
//       location: 'Berlin, Germany',
//       founded: 2012
//    },
//    // Add 8 more sample companies...
];

const CompanySearch = () => {

   const [pageIsLoading, setPageIsLoading] = useState(true)

   const navigate = useNavigate()
   const [results, setResult] = useState(sampleCompanies || []);
   const [filters, setFilters] = useState({});
   const [searchTerm, setSearchTerm] = useState('');
   const [messageResponse, setMessageResponse] = useState('');

   const [searchName, setSearchName] = useState(false)

   const token = useSelector(
      state => state.user.token
   )

   const [isLoading, setIsLoading] = useState(false)
   const [lazyLoading, setLazyLoading] = useState(false)

   // Animation configurations
   const containerVariants = {
      hidden: { opacity: 0 },
      show: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
         }
      }
   };

   const itemVariants = {
      hidden: {
         opacity: 0,
         y: 20,
         scale: 0.95
      },
      show: {
         opacity: 1,
         y: 0,
         scale: 1,
         transition: {
            type: "spring",
            stiffness: 150
         }
      },
      hover: {
         scale: 1.02
      }
   };

   const searchingNameSubmit = async () => {
      setLazyLoading(false)
      setIsLoading(true)
      try {
         const response = await CompanySearcByNameApi({ token, name: searchTerm })
         if (response.success) {
            setResult(response.companies)
         }
         else {
            setResult([])
            setMessageResponse(response.message)
         }

      } catch (err) {
         setIsLoading(false)
         throw (err)
      }
      setIsLoading(false)
   }

   const handleLoadMore = () => {

   }

   useEffect(() => {
      setPageIsLoading(false)
   }, [])


   return (
         <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="search-page"
      >
         <Container>
            {/* Animated Search Header */}
            <motion.div
               className="search-header"
               initial={{ y: -50 }}
               animate={{ y: 0 }}
               transition={{ type: 'spring', stiffness: 100 }}
            >
               <div className="search-bar">
                  <FaSearch className="search-icon" />
                  <input
                     type="text"
                     placeholder="Search future unicorns..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button onClick={() => searchingNameSubmit()} variant='' className={`search-btn ${isLoading && 'disabled'}`}>
                     <FaSearch />
                  </Button>
               </div>
            </motion.div>

            {/* Floating Filters Card */}
            <motion.div
               className="filters-card p-3 mb-4"
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            >
               <div className="filters-header mb-4 d-flex align-items-center gap-2">
                  <FaFilter className="text-primary fs-5" />
                  <h4 className="mb-0">Refine Your Search</h4>
               </div>

               <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  className="filters-grid"
               >
                  <Row className="g-3">
                     {/* Industry Filter */}
                     <Col md={6} lg={3}>
                        <motion.div variants={itemVariants}>
                           <div className="filter-group">
                              <FaIndustry className="filter-icon" />
                              <Form.Control
                                 name="industry"
                                 placeholder="Industry (e.g., Technology, Healthcare)"
                                 className="filter-input"
                              />
                           </div>
                        </motion.div>
                     </Col>

                     {/* Location Filter */}
                     <Col md={6} lg={3}>
                        <motion.div variants={itemVariants}>
                           <div className="filter-group">
                              <FaMapMarkerAlt className="filter-icon" />
                              <Form.Control
                                 name="location"
                                 placeholder="Location (e.g., New York, UK)"
                                 className="filter-input"
                              />
                           </div>
                        </motion.div>
                     </Col>

                     {/* Stock Market Filter */}
                     <Col md={6} lg={3}>
                        <motion.div variants={itemVariants}>
                           <div className="filter-group">
                              <FaChartLine className="filter-icon" />
                              <Form.Select name="stock_market" className="filter-input">
                                 <option value="">All Markets</option>
                                 <option value="nyse">NYSE</option>
                                 <option value="nasdaq">NASDAQ</option>
                                 <option value="lse">LSE</option>
                              </Form.Select>
                           </div>
                        </motion.div>
                     </Col>

                     {/* Founded Year Range */}
                     <Col md={6} lg={3}>
                        <motion.div variants={itemVariants}>
                           <div className="filter-group">
                              <FaCalendarAlt className="filter-icon" />
                              <div className="d-flex gap-2">
                                 <Form.Control
                                    name="founded_min"
                                    placeholder="Min Year"
                                    type="number"
                                    className="filter-input"
                                 />
                                 <Form.Control
                                    name="founded_max"
                                    placeholder="Max Year"
                                    type="number"
                                    className="filter-input"
                                 />
                              </div>
                           </div>
                        </motion.div>
                     </Col>

                     {/* Valuation Range */}
                     <Col md={6} lg={3}>
                        <motion.div variants={itemVariants}>
                           <div className="filter-group">
                              <FaDollarSign className="filter-icon" />
                              <div className="d-flex gap-2">
                                 <Form.Control
                                    name="valuation_min"
                                    placeholder="Min Valuation ($M)"
                                    type="number"
                                    className="filter-input"
                                 />
                                 <Form.Control
                                    name="valuation_max"
                                    placeholder="Max Valuation ($M)"
                                    type="number"
                                    className="filter-input"
                                 />
                              </div>
                           </div>
                        </motion.div>
                     </Col>

                     {/* Sorting Controls */}
                     <Col md={6} lg={3}>
                        <motion.div variants={itemVariants} className="d-flex gap-2">
                           <div className="filter-group flex-grow-1">
                              <FaSort className="filter-icon" />
                              <Form.Select name="sort_by" className="filter-input">
                                 <option value="name">Sort By</option>
                                 <option value="valuation">Valuation</option>
                                 <option value="founded">Founded Year</option>
                              </Form.Select>
                           </div>
                           <div className="filter-group">
                              <Form.Select name="order" className="filter-input">
                                 <option value="asc">Ascending</option>
                                 <option value="desc">Descending</option>
                              </Form.Select>
                           </div>
                        </motion.div>
                     </Col>

                     {/* Results Per Page */}
                     <Col md={6} lg={3}>
                        <motion.div variants={itemVariants}>
                           <div className="filter-group">
                              <FaListOl className="filter-icon" />
                              <Form.Select name="limit" className="filter-input">
                                 <option value="10">10 Results</option>
                                 <option value="25">25 Results</option>
                                 <option value="50">50 Results</option>
                              </Form.Select>
                           </div>
                        </motion.div>
                     </Col>

                     {/* Action Buttons */}
                     <Col md={12} className="mt-3">
                        <motion.div
                           variants={itemVariants}
                           className="d-flex gap-3 justify-content-end"
                        >
                           <motion.button
                              className="btn btn-primary d-flex align-items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                           >
                              <FaSearch />
                              Apply Filters
                           </motion.button>
                           <motion.button
                              className="btn btn-outline-secondary d-flex align-items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                           >
                              <FaSync />
                              Reset
                           </motion.button>
                        </motion.div>
                     </Col>
                  </Row>
               </motion.div>
            </motion.div>

            {/* Results Grid */}
            {isLoading ? <LoadingSpinner /> :
               <motion.div
                  className="results-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
               >
                  <AnimatePresence>
                     {results.map((company) => (
                        <motion.div
                           key={company.id}
                           variants={itemVariants}
                           className="company-card"
                           whileHover={{ y: -5 }}
                           exit={{ opacity: 0, scale: 0.9 }}
                           transition={{ type: "spring", stiffness: 300 }}
                        >
                           <Card className="h-100 shadow-sm">
                              <div className="company-media">
                                 <motion.img
                                    src={company.avatar || 'https://th.bing.com/th/id/R.ecd9c2e8ed0dbbc96ac472a965e4afda?rik=rZ%2b5er9OQMjXkQ&pid=ImgRaw&r=0'}
                                    alt={company.name}
                                    className="company-logo"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                 />
                                 <motion.div
                                    className="stock-badge"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                 >
                                    <FaChartLine className={company.stock_market ? `text-success` : 'text-danger'} />
                                    <span className="fw-medium">{company.stock_market ? "In Stock Market" : "Not in Stock Market"}</span>
                                 </motion.div>
                              </div>

                              <Card.Body className="d-flex flex-column">
                                 <div className="company-header mb-3">
                                    <h5 className="mb-0 fw-bold text-truncate">{company.name}</h5>
                                    <div className="valuation">
                                       <FaDollarSign className="text-success" />
                                       <small className="fw-bold">${company.valuation / 1000000} Million</small>
                                    </div>
                                 </div>

                                 <div className="company-details mb-3">
                                    <div className="detail-item">
                                       <FaIndustry className="text-primary" />
                                       <small className="text-muted">{company.industry}</small>
                                    </div>
                                    <div className="detail-item">
                                       <FaMapMarkerAlt className="text-danger" />
                                       <small className="text-muted">{company.location}</small>
                                    </div>
                                    <div className="detail-item">
                                       <FaCalendarAlt className="text-warning" />
                                       <small className="text-muted">Founded at {company.founder_year}</small>
                                    </div>
                                 </div>

                                 <Button
                                    variant="outline-primary"
                                    className="view-btn mt-auto"
                                    size="sm"
                                    onClick={() => {
                                       navigate(`/company/${company.id}`)
                                    }}
                                 >
                                    <FaEye className="me-2" />
                                    <span>Explore Dashboard</span>
                                 </Button>
                              </Card.Body>
                           </Card>
                        </motion.div>
                     ))}
                     {/* Lazy Loading Trigger */}
                     {!lazyLoading ? "" : <div className="text-center mt-4">
                        <Button
                           variant="outline-primary"
                           className="load-more-btn"
                           onClick={handleLoadMore}
                        >
                           <FaArrowDown className="me-2" />
                           Load More Companies
                        </Button>
                     </div>}
                  </AnimatePresence>
               </motion.div>}

            {/* Floating Action Button */}
            <motion.div
               className="fab"
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               onClick={() => {
                  setSearchName(false)
                  setResult([])
                  setSearchTerm('')
                  setLazyLoading(false)
               }}
            >
               <FaSync />
            </motion.div>
         </Container>
      </motion.div>
   );
};

export default CompanySearch;
