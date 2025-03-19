import { useEffect, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
   FaUser, FaEnvelope, FaGlobe, FaBuilding, FaWallet,
   FaRegClock, FaEdit, FaCamera, FaSave, FaTimes,
   FaIndustry, FaChartLine, FaMoneyCheckAlt, FaIdBadge, FaPlus,
   FaTimesCircle,
   FaExclamationCircle,
   FaCheck
} from 'react-icons/fa';
import { Container, Row, Col, Card, Form, Button, Badge, Modal, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import './profile.css';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../loading/loading.page';
import { IsLoadingAction } from '../../redux/actions';
import { ChangeUserPicApi, UpdateToPremAccountApi, UserProfileApi } from '../../services/user';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateCompanyModal from '../../components/registering_company/register.company';
import LoadingSpinner from '../../components/loading_spinners/loading';



// Validation Schema
const profileSchema = Yup.object().shape({
   firstName: Yup.string().required('Required'),
   lastName: Yup.string().required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
   nationality: Yup.string().required('Required'),
});

const Profile = () => {

   const navigate = useNavigate()
   const location = useLocation();


   const token = useSelector(
      state => state.user.token
   )

   const dispatch = useDispatch()
   const [isLoading, setIsLoading] = useState(false)
   const [userDetails, setUserDetailes] = useState(null)
   const [companiesList, setCompaniesList] = useState(null)
   const [dealsList, setDealsList] = useState(null)

   const [newImage, setNewImage] = useState(null);
   const [isUploading, setIsUploading] = useState(false);
   const [uploadError, setUploadError] = useState(null);

   const [payment, setPayment] = useState(location.state || false)
   const [loadingPremAccount, setLoadingPremAccount] = useState(false)

   const [registerCompPage, setRegisterCompPage] = useState(false)


   const [investments] = useState([
      {
         id: 'inv-001',
         company: 'StartupX',
         amount: '$1.2M',
         date: '2024-03-15',
         status: 'Active'
      },
      // Add more investments...
   ]);

   useLayoutEffect(() => {
      setIsLoading(true)
      dispatch(IsLoadingAction(true))
      UserProfileApi({ token }).then(
         res => {
            setUserDetailes(res.user)
            setCompaniesList(res.companies)
            if (res.user.user_type === "Investor")
               setDealsList(res.deals)
         }
      ).catch(
         err => console.log(err)
      ).finally(() => {
         setIsLoading(false)
         dispatch(IsLoadingAction(false))
      })
   }, [])

   const [fileImage, setFile] = useState(null)

   const handleImageUpload = async (file) => {
      if (!file || !file.type.startsWith("image/")) {
         alert("Please upload a valid image file.");
         return;
      }

      setIsUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "PortfolioPreset");

      try {
         const res = await fetch("https://api.cloudinary.com/v1_1/daghpnbz3/image/upload", {
            method: "POST",
            body: formData,
         });

         if (!res.ok) throw new Error("Upload failed. Check your Cloudinary settings.");

         const data = await res.json();

         if (!data.secure_url) throw new Error("Cloudinary did not return a valid URL.");

         const response = await ChangeUserPicApi({ token, url: data.secure_url })

         if (response.success) {
            setUserDetailes({ ...userDetails, avatar: response.secure_url })
            setFile(data.secure_url);
            setNewImage(null)
            alert(response.message)
         } else
            throw new Error(response.message)
      } catch (error) {
         console.error("Upload error:", error);
         setUploadError(error.message || "Something went wrong");
      } finally {
         setIsUploading(false);
      }
   };

   const handleCancelUpload = () => {
      setNewImage(null);
      setUploadError(null);
   };


   const submitPayment = async () => {
      setLoadingPremAccount(true)

      try {
         const response = await UpdateToPremAccountApi({token})

         if (response.success)
            window.location.href = response.url;
         else
            alert(response.message)

      } catch (err) {
         alert(err)
         setPayment(false)
      } finally {
         setLoadingPremAccount(false)
      }
   }
   return (
      <> {isLoading ? <LoadingPage /> : userDetails &&
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="profile-page"
         >
            {loadingPremAccount ? <LoadingSpinner message='Creating session for payment....'/> : ''}
            {!registerCompPage ? "" : <CreateCompanyModal onClose={() => setRegisterCompPage(false)} />}
            <Container>
               {/* Profile Header */}
               <motion.section
                  className="profile-header"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
               >
                  <Row className="align-items-center g-5">
                     <Col xl={3} className="text-center">
                        {userDetails &&
                           <motion.div className="avatar-edit-container">
                              <motion.img
                                 src={newImage || userDetails.avatar || 'https://th.bing.com/th/id/OIP.nYjTZMgoAAgpLUBL5ooqWwHaHa?rs=1&pid=ImgDetMain'}
                                 alt={userDetails.f_n}
                                 className="company-logo rounded-4 shadow-lg"
                                 whileHover={{ rotate: -2 }}
                              />

                              {/* Upload Controls */}
                              <div className="position-absolute bottom-0 end-0 mb-5 me-3">
                                 {!newImage ? (
                                    <motion.label
                                       className="btn btn-icon rounded-circle p-2"
                                       whileHover={{ scale: 1.1 }}
                                       whileTap={{ scale: 0.9 }}
                                    >
                                       <FaCamera className="fs-5" />
                                       <input
                                          type="file"
                                          accept="image/*"
                                          hidden
                                          onChange={(e) => {
                                             const file = e.target.files[0];
                                             setFile(e.target.files[0])
                                             if (file) setNewImage(URL.createObjectURL(file));
                                          }}
                                       />
                                    </motion.label>
                                 ) : (
                                    <motion.div
                                       className="d-flex gap-2"
                                       initial={{ opacity: 0 }}
                                       animate={{ opacity: 1 }}
                                    >
                                       <button
                                          className="btn btn-success btn-sm px-3"
                                          onClick={() => handleImageUpload(fileImage)}
                                          disabled={isUploading}
                                       >
                                          {isUploading ? (
                                             <div className="spinner-border spinner-border-sm" />
                                          ) : (
                                             <><FaCheck className="me-1" /> Save</>
                                          )}
                                       </button>
                                       <button
                                          className="btn btn-danger btn-sm px-3"
                                          onClick={handleCancelUpload}
                                          disabled={isUploading}
                                       >
                                          <FaTimes className="me-1" /> Cancel
                                       </button>
                                    </motion.div>
                                 )}
                              </div>

                              {uploadError && (
                                 <Alert variant="danger" className="mt-2">
                                    {uploadError}
                                 </Alert>
                              )}
                           </motion.div>
                        }
                     </Col>

                     <Col xl={9}>
                        <div className="profile-info">
                           <div className="d-flex justify-content-between align-items-start">
                              {userDetails &&
                                 <motion.h1 className="display-5 mb-0">
                                    {userDetails.f_n} {userDetails.l_n}
                                    <Badge bg="primary" className="ms-3">
                                       {userDetails.user_type}
                                    </Badge>
                                 </motion.h1>
                              }
                           </div>

                           <motion.div className="status-container mt-3">
                              <Badge bg={userDetails.paid ? 'success' : 'secondary'} className="me-2">
                                 {userDetails.paid ? 'Premium Member' : 'Free Tier'}
                              </Badge>
                              <Badge bg="info">
                                 <FaRegClock className="me-2" />
                                 {`${userDetails.paid ? 'subscription Ends: ' + userDetails.subis_end_date : "No subscription"}`}
                              </Badge>
                              {payment || !userDetails.paid &&  <Button onClick={() => setPayment(true)} variant="outline-primary" className="w-20 mt-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                 <FaPlus style={{ marginRight: "5px" }} />
                                 Start new subiscription as an investor account!
                              </Button>}
                              {payment &&  <div><button
                                 className="btn btn-success btn-sm px-3"
                                 disabled={isUploading}
                                 onClick={() => submitPayment()}
                                 style={{marginTop: '1rem'}}
                              >
                                 {isUploading ? (
                                    <div className="spinner-border spinner-border-sm" />
                                 ) : (
                                    <><FaCheck className="me-1" />Sure, go to payment session</>
                                 )}
                              </button>
                              <button
                                 className="btn btn-danger btn-sm px-3"
                                 onClick={() => {
                                    setPayment(false)
                                 }}
                                 style={{marginLeft: '2rem', marginTop: "1rem"}}
                              >
                                 <FaTimes className="me-1" /> Cancel
                              </button></div>}
                           </motion.div>
                        </div>
                     </Col>
                  </Row>
               </motion.section>

               {/* Main Content */}
               <Row className="g-4 mt-4">
                  {/* User Details */}
                  <Col xl={3}>
                     <motion.div
                        className="details-card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                     >
                        <Card className="h-100">
                           <Card.Body>
                              <div className="detail-item-card">
                                 <FaIdBadge className="detail-icon" />
                                 <h5>Nationality</h5>
                                 <p>{userDetails.nationality}</p>
                              </div>

                              <div className="detail-item-card">
                                 <FaEnvelope className="detail-icon" />
                                 <h5>Email</h5>
                                 <p>{userDetails.email}</p>
                              </div>

                              <div className="detail-item-card">
                                 <FaUser className="detail-icon" />
                                 <h5>Account Type</h5>
                                 <p>{userDetails.user_type}</p>
                              </div>
                           </Card.Body>
                        </Card>
                     </motion.div>
                  </Col>

                  {/* Companies & Investments */}
                  <Col xl={9}>
                     <motion.div
                        className="business-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                     >
                        {/* Companies */}
                        <section className="mb-5">
                           <div className="section-header">
                              <div className='company-section'>
                                 <FaBuilding className="section-icon" />
                                 <h3>Your Companies</h3>
                              </div>
                              <div className='create-company-btn'>
                                 <Button onClick={() => setRegisterCompPage(true)} variant="outline-primary" className="w-100 mt-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <FaPlus style={{ marginRight: "2px" }} />
                                    Register new Company
                                 </Button>
                              </div>
                           </div>
                           <Row className="g-4">
                              {companiesList && companiesList.length > 0 ? companiesList.map((company) => (
                                 <Col key={company.id} md={6}>
                                    <motion.div
                                       className="company-card"
                                       whileHover={{ y: -5 }}
                                    >
                                       <Card>
                                          <Card.Body>
                                             <div style={{position: 'relative'}} className="d-flex align-items-center mb-3">
                                                <FaIndustry className="me-2" />
                                                <h5 className="mb-0">{company.name}</h5>
                                                {company.updates > 0 && 
                                                <span 
                                                style={{position: 'absolute', right: '0', backgroundColor: 'darkred', borderRadius: '1rem', padding: '0.5rem', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                   {company.updates} Updates</span>}
                                             </div>
                                             <div className="company-details">
                                                <p><FaGlobe className="me-2" />{company.location}</p>
                                                <p><FaChartLine className="me-2" />{company.industry}</p>
                                                <p><FaWallet className="me-2" />{company.valuation}</p>
                                             </div>
                                             <Button
                                                onClick={() => navigate(`/company/${company.id}`)}
                                                variant="outline-primary" className="w-100 mt-2">
                                                View Dashboard
                                             </Button>
                                          </Card.Body>
                                       </Card>
                                    </motion.div>
                                 </Col>
                              )) : (
                                 <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="container text-light text-center"
                                 >
                                    <FaExclamationCircle className="text-danger-emphasis display-4 mb-3" />
                                    <h3 className="fw-semibold text-danger-emphasis">You dont registered any company</h3>
                                 </motion.div>
                              )}
                           </Row>
                        </section>

                        {/* Investments */}
                        {userDetails.user_type === 'Investor' && (
                           <section>
                              <div className="section-header">
                                 <div className='company-section'>
                                    <FaMoneyCheckAlt className="section-icon" />
                                    <h3>Active Investments</h3>
                                 </div>
                              </div>
                              <Row className="g-4">
                                 {dealsList && dealsList.length > 0 ? dealsList.map((investment, i) => (
                                    <Col key={investment.deal.id} md={6} lg={4}>
                                       <motion.div
                                          className="investment-card"
                                          whileHover={{ y: -5 }}
                                       >
                                          <Card>
                                             <Card.Body>
                                                <div className="d-flex justify-content-between align-items-center">
                                                   <h5>{investment.company.name}</h5>
                                                   <Badge bg={investment.deal.deal_status === 'Active' ? 'success' : 'secondary'}>
                                                      {investment.deal.deal_status}
                                                   </Badge>
                                                </div>
                                                <div className="investment-details mt-3">
                                                   <p><FaWallet className="me-2" />{investment.deal.amount}</p>
                                                   <p><FaRegClock className="me-2" />{investment.deal.created_at}</p>
                                                </div>
                                             </Card.Body>
                                          </Card>
                                       </motion.div>
                                    </Col>
                                 )) : (
                                    <motion.div
                                       initial={{ opacity: 0, y: 20 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       transition={{ duration: 0.5 }}
                                       className="container text-light text-center"
                                    >
                                       <FaExclamationCircle className="text-danger-emphasis display-4 mb-3" />
                                       <h3 className="fw-semibold text-danger-emphasis">You dont have any investment deal</h3>
                                    </motion.div>
                                 )}
                              </Row>
                           </section>
                        )}
                     </motion.div>
                  </Col>
               </Row>
            </Container>
         </motion.div>
      }</>
   );
};

export default Profile;
