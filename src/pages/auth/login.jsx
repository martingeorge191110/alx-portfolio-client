import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowRight, FaUserPlus } from 'react-icons/fa';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './auth.css'
import { LoginApi } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { AuthAction } from '../../redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
   const dispatch = useDispatch()
   const [formData, setFormData] = useState({
      email: '',
      password: '',
      rememberMe: false,
   });

   const navigate = useNavigate()

   const [errors, setErrors] = useState({});
   const [responseError, setResponseError] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
         setErrors(validationErrors)
         setIsSubmitting(false)
         return;
      }

      try {
         const response = await LoginApi({userEmail: formData.email, password: formData.password})

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
         setIsSubmitting(false)
         throw (err)
      }

   };

   const validateForm = () => {
      const errors = {};
      if (!formData.email.match(/^\S+@\S+\.\S+$/)) errors.email = 'Invalid email address';
      if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
      return errors;
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -20 }}
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
                     <h2 className="text-center mb-4">Welcome Back</h2>
                     <Form onSubmit={handleSubmit}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                           <Form.Group className="mb-3 form-group">
                              <div className={`input-icon ${errors.email && 'icon-more'}`}>
                                 <FaEnvelope />
                              </div>
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

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                           <Form.Group className="mb-3 form-group">
                              <div className={`input-icon ${errors.password && 'icon-more'}`}>
                                 <FaLock />
                              </div>
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

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                           <div className="d-flex justify-content-between mb-4">
                              <Form.Check
                                 type="checkbox"
                                 label="Remember me"
                                 checked={formData.rememberMe}
                                 onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                              />
                              <Link to="/forgot-password" className="text-decoration-none">
                                 Forgot Password?
                              </Link>
                           </div>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                           <Button
                              variant="primary"
                              type="submit"
                              className="w-100 mb-3 auth-button"
                              disabled={isSubmitting}
                           >
                              {isSubmitting ? 'Signing In...' : 'Sign In'}
                              <FaArrowRight className="ms-2" />
                           </Button>
                        </motion.div>

                        {responseError && responseError.length > 0 && <Form.Text className="text-danger" style={{textAlign: "center", display: "block"}}>{responseError}</Form.Text>}
                        <div className="text-center mt-4 auth-links">
                           <span className="text-muted">Don't have an account? </span>
                           <Link to="/register" className="text-primary text-decoration-none">
                              {/* <FaUserPlus className="me-2" /> */}
                              Create Account
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

export default Login;
