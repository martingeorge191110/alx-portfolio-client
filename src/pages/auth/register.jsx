import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FaArrowRight, FaSignInAlt } from 'react-icons/fa';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './auth.css';
import { RegisterApi } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { AuthAction } from '../../redux/actions';
import countries from 'world-countries';



const countriesList = countries.map((country) => ({
   label: country.name.common,
   value: country.cca2,
}));

const Register = () => {

   const dispatch = useDispatch()
   const [formData, setFormData] = useState({
      f_n: '',
      l_n: '',
      email: '',
      password: '',
      confirm_password: '',
      nationality: '',
      user_type: ''
   });

   const navigate = useNavigate()

   const [errors, setErrors] = useState({});
   const [responseError, setResponseError] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false)

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true)
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
         setErrors(validationErrors)
         setIsSubmitting(false)
         return;
      }

      setErrors({})
      try {
         const response = await RegisterApi({f_n: formData.f_n, l_n: formData.l_n, email: formData.email, password: formData.password,
            confirm_password: formData.confirm_password, nationality: formData.nationality['value'], user_type: formData.user_type['value']
         })

         console.log(response)
         setIsSubmitting(false)
         if (!response.success) {
            setResponseError(response.message)
         } else {
            setResponseError('')
            localStorage.setItem("token", response.token)
            dispatch(AuthAction({token: response.token, info: response.user}))
            navigate("/")
         }
      } catch (err) {
         throw (err)
      }
   };

   const validateForm = () => {
      const errors = {};
      if (!formData.f_n.trim()) errors.f_n = 'First name is required';
      if (!formData.l_n.trim()) errors.l_n = 'Last name is required';
      if (!formData.email.match(/^\S+@\S+\.\S+$/)) errors.email = 'Invalid email address';
      if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirm_password) errors.confirm_password = 'Passwords do not match';
      if (!formData.nationality) errors.nationality = 'Nationality is required';
      if (!formData.user_type) errors.user_type = 'Account type is required';

      return (errors);
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="whole-page"
      >
         <Container>
            <Row className="justify-content-center">
               <Col xs={12} md={8} lg={6}>
                  <motion.div
                     className="auth-box"
                     initial={{ scale: 0.95 }}
                     animate={{ scale: 1 }}
                     transition={{ duration: 0.3 }}
                  >
                     <h2 className="text-center mb-4">Create Account</h2>
                     <Form onSubmit={handleSubmit}>
                        <Row>
                           <Col md={6}>
                              <motion.div initial={{ x: -20 }} animate={{ x: 0 }}>
                                 <Form.Group className="mb-3 form-group">
                                    {/* <div className={`input-icon ${errors.f_n && 'icon-more'}`}>
                                       <FaUser />
                                    </div> */}
                                    <Form.Control
                                       type="text"
                                       placeholder="First Name"
                                       value={formData.f_n}
                                       onChange={(e) => setFormData({ ...formData, f_n: e.target.value })}
                                       isInvalid={!!errors.f_n}
                                    />
                                    {errors.f_n && <Form.Text className="text-danger">{errors.f_n}</Form.Text>}
                                 </Form.Group>
                              </motion.div>
                           </Col>
                           <Col md={6}>
                              <motion.div initial={{ x: 20 }} animate={{ x: 0 }}>
                                 <Form.Group className="mb-3 form-group">
                                    {/* <div className={`input-icon ${errors.l_n && 'icon-more'}`}>
                                       <FaUser />
                                    </div> */}
                                    <Form.Control
                                       type="text"
                                       placeholder="Last Name"
                                       value={formData.l_n}
                                       onChange={(e) => setFormData({ ...formData, l_n: e.target.value })}
                                       isInvalid={!!errors.l_n}
                                    />
                                    {errors.l_n && <Form.Text className="text-danger">{errors.l_n}</Form.Text>}
                                 </Form.Group>
                              </motion.div>
                           </Col>
                        </Row>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                           <Form.Group className="mb-3 form-group">
                              {/* <div className={`input-icon ${errors.email && 'icon-more'}`}>
                                 <FaEnvelope />
                              </div> */}
                              <Form.Control
                                 type="email"
                                 placeholder="Email"
                                 value={formData.email}
                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                 isInvalid={!!errors.email}
                              />
                              {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                           </Form.Group>
                        </motion.div>

                        <Row>
                           <Col md={6}>
                              <motion.div initial={{ y: 10 }} animate={{ y: 0 }} transition={{ delay: 0.3 }}>
                                 <Form.Group className="mb-3 form-group">
                                    {/* <div className={`input-icon ${errors.password ? 'icon-more' : ''}`} style={{transform: `${errors.password ? 'translateY(-150%)' : ''}`}}>
                                       <FaLock />
                                    </div> */}
                                    <Form.Control
                                       type="password"
                                       placeholder="Password"
                                       value={formData.password}
                                       onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                       isInvalid={!!errors.password}
                                    />
                                    {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                                 </Form.Group>
                              </motion.div>
                           </Col>
                           <Col md={6}>
                              <motion.div initial={{ y: 10 }} animate={{ y: 0 }} transition={{ delay: 0.4 }}>
                                 <Form.Group className="mb-3 form-group">
                                    <Form.Control
                                       type="password"
                                       placeholder="Confirm Password"
                                       value={formData.confirm_password}
                                       onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                                       isInvalid={!!errors.confirm_password}
                                    />
                                    {errors.confirm_password && (
                                       <Form.Text className="text-danger">{errors.confirm_password}</Form.Text>
                                    )}
                                 </Form.Group>
                              </motion.div>
                           </Col>
                        </Row>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                           <Form.Group className="mb-4 form-group">
                              {/* <div className={`input-icon ${errors.nationality && 'icon-more'}`}>
                                 <FaCity />
                              </div> */}
                              <Select
                                 options={countriesList}
                                 placeholder="Select Nationality"
                                 value={formData.nationality}
                                 onChange={(selected) => setFormData({ ...formData, nationality: selected })}
                                 classNamePrefix="react-select"
                                 isInvalid={!!errors.nationality}
                              />
                              {errors.nationality && <Form.Text className="text-danger">{errors.nationality}</Form.Text>}
                           </Form.Group>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                           <Form.Group className="mb-4 form-group">
                              {/* <div className={`input-icon ${errors.nationality && 'icon-more'}`}>
                                 <FaCity />
                              </div> */}
                              <Select
                                 options={[{ value: 'Investor', label: 'Investor' },
                                 { value: 'Business', label: 'Business' }]}
                                 placeholder="Select your account type"
                                 value={formData.user_type}
                                 onChange={(selected) => setFormData({ ...formData, user_type: selected })}
                                 classNamePrefix="react-select"
                                 isInvalid={!!errors.user_type}
                                 isSearchable={false}
                              />
                              {errors.user_type && <Form.Text className="text-danger">{errors.user_type}</Form.Text>}
                           </Form.Group>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                           <Button variant="primary" type="submit" className="w-100 mb-3 auth-button">
                           {isSubmitting ? 'Registering...' : 'Register'} <FaArrowRight className="ms-2" />
                           </Button>
                        </motion.div>

                        {responseError && responseError.length > 0 && <Form.Text className="text-danger" style={{textAlign: "center", display: "block"}}>{responseError}</Form.Text>}
                        <div className="text-center mt-4 auth-links">
                           <Link to="/login" className="d-block mb-2">
                              <FaSignInAlt className="me-2" />
                              Already have an account? Login Here
                           </Link>
                        </div>
                     </Form>
                  </motion.div>
               </Col>
            </Row>
         </Container>
      </motion.div>
   );
};

export default Register;
