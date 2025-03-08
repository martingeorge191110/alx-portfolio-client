import { useEffect, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
   FaUser, FaEnvelope, FaGlobe, FaBuilding, FaWallet,
   FaRegClock, FaEdit, FaCamera, FaSave, FaTimes,
   FaIndustry, FaChartLine, FaMoneyCheckAlt, FaIdBadge, FaPlus,
   FaTimesCircle,
   FaExclamationCircle
} from 'react-icons/fa';
import { Container, Row, Col, Card, Form, Button, Badge, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './profile.css';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../loading/loading.page';
import { IsLoadingAction } from '../../redux/actions';
import { UserProfileApi } from '../../services/user';



// Validation Schema
const profileSchema = Yup.object().shape({
   firstName: Yup.string().required('Required'),
   lastName: Yup.string().required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
   nationality: Yup.string().required('Required'),
});

const Profile = () => {


   const token = useSelector(
      state => state.user.token
   )
   const dispatch = useDispatch()
   const [isLoading, setIsLoading] = useState(false)
   const [userDetails, setUserDetailes] = useState(null)
   const [companiesList, setCompaniesList] = useState(null)
   const [dealsList, setDealsList] = useState(null)

   const [user, setUser] = useState({
      id: 'user-123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      nationality: 'United States',
      avatar: 'https://via.placeholder.com/150',
      userType: 'investor',
      isPaid: true,
      subscriptionEnd: '2025-12-31',
   });

   const [companies] = useState([
      {
         id: 'comp-001',
         name: 'Tech Innovators',
         industry: 'Technology',
         location: 'Silicon Valley',
         valuation: '$2.5B',
         founded: 2012
      },
      // Add more companies...
   ]);

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


   const [showEditModal, setShowEditModal] = useState(false);
   const [selectedFile, setSelectedFile] = useState(null);

   const formik = useFormik({
      initialValues: user,
      validationSchema: profileSchema,
      onSubmit: (values) => {
         setUser({ ...values, avatar: selectedFile || user.avatar });
         setShowEditModal(false);
      },
   });

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => setSelectedFile(reader.result);
         reader.readAsDataURL(file);
      }
   };

   return (
      <> {isLoading ? <LoadingPage /> : userDetails &&
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="profile-page"
         >
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
                           <motion.div
                              className="avatar-container"
                              whileHover={{ scale: 1.05 }}
                           >
                              <img
                                 src={selectedFile || userDetails.avatar}
                                 alt="Profile"
                                 className="profile-avatar"
                              />
                              <OverlayTrigger
                                 placement="bottom"
                                 overlay={<Tooltip>Change Avatar</Tooltip>}
                              >
                                 <Button
                                    variant="primary"
                                    className="avatar-edit-btn"
                                    onClick={() => document.getElementById('avatarInput').click()}
                                 >
                                    <FaEdit />
                                 </Button>
                              </OverlayTrigger>
                              <input
                                 type="file"
                                 id="avatarInput"
                                 hidden
                                 onChange={handleFileChange}
                              />
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
                              <Button
                                 variant="outline-primary"
                                 onClick={() => setShowEditModal(true)}
                              >
                                 <FaEdit className="me-2" />
                                 Edit Profile
                              </Button>
                           </div>

                           <motion.div className="status-container mt-3">
                              <Badge bg={userDetails.paid ? 'success' : 'secondary'} className="me-2">
                                 {user.paid ? 'Premium Member' : 'Free Tier'}
                              </Badge>
                              <Badge bg="info">
                                 <FaRegClock className="me-2" />
                                 {`${userDetails.paid ? 'subscription Ends: ' + user.subis_end_date : "No subscription"}`}
                              </Badge>
                              <Button variant="outline-primary" className="w-20 mt-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                 <FaPlus style={{ marginRight: "5px" }} />
                                 Start new subiscription as an investor account!
                              </Button>
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
                              <div className="detail-item">
                                 <FaIdBadge className="detail-icon" />
                                 <h5>Nationality</h5>
                                 <p>{userDetails.nationality}</p>
                              </div>

                              <div className="detail-item">
                                 <FaEnvelope className="detail-icon" />
                                 <h5>Email</h5>
                                 <p>{userDetails.email}</p>
                              </div>

                              <div className="detail-item">
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
                                 <Button variant="outline-primary" className="w-100 mt-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                                             <div className="d-flex align-items-center mb-3">
                                                <FaIndustry className="me-2" />
                                                <h5 className="mb-0">{company.name}</h5>
                                             </div>
                                             <div className="company-details">
                                                <p><FaGlobe className="me-2" />{company.location}</p>
                                                <p><FaChartLine className="me-2" />{company.industry}</p>
                                                <p><FaWallet className="me-2" />{company.valuation}</p>
                                             </div>
                                             <Button variant="outline-primary" className="w-100 mt-2">
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
                                 {dealsList && dealsList.length > 0 ? dealsList.map((investment) => (
                                    <Col key={investment.id} md={6} lg={4}>
                                       <motion.div
                                          className="investment-card"
                                          whileHover={{ y: -5 }}
                                       >
                                          <Card>
                                             <Card.Body>
                                                <div className="d-flex justify-content-between align-items-center">
                                                   <h5>{investment.company}</h5>
                                                   <Badge bg={investment.status === 'Active' ? 'success' : 'secondary'}>
                                                      {investment.status}
                                                   </Badge>
                                                </div>
                                                <div className="investment-details mt-3">
                                                   <p><FaWallet className="me-2" />{investment.amount}</p>
                                                   <p><FaRegClock className="me-2" />{investment.date}</p>
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

               {/* Edit Profile Modal */}
               <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                  <Modal.Header closeButton>
                     <Modal.Title>Edit Profile</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3">
                           <Form.Label>First Name</Form.Label>
                           <Form.Control
                              name="firstName"
                              value={formik.values.firstName}
                              onChange={formik.handleChange}
                              isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                           />
                           <Form.Control.Feedback type="invalid">
                              {formik.errors.firstName}
                           </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                           <Form.Label>Last Name</Form.Label>
                           <Form.Control
                              name="lastName"
                              value={formik.values.lastName}
                              onChange={formik.handleChange}
                              isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                           />
                           <Form.Control.Feedback type="invalid">
                              {formik.errors.lastName}
                           </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                           <Form.Label>Email</Form.Label>
                           <Form.Control
                              name="email"
                              type="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              isInvalid={formik.touched.email && !!formik.errors.email}
                           />
                           <Form.Control.Feedback type="invalid">
                              {formik.errors.email}
                           </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                           <Form.Label>Nationality</Form.Label>
                           <Form.Control
                              name="nationality"
                              value={formik.values.nationality}
                              onChange={formik.handleChange}
                              isInvalid={formik.touched.nationality && !!formik.errors.nationality}
                           />
                           <Form.Control.Feedback type="invalid">
                              {formik.errors.nationality}
                           </Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                           <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                              <FaTimes className="me-2" />
                              Cancel
                           </Button>
                           <Button variant="primary" type="submit">
                              <FaSave className="me-2" />
                              Save Changes
                           </Button>
                        </div>
                     </Form>
                  </Modal.Body>
               </Modal>
            </Container>
         </motion.div>
      }</>
   );
};

export default Profile;
