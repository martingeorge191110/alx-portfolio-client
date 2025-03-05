import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaSignInAlt, FaCity } from 'react-icons/fa';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './auth.css';



const countries = [
   { value: 'us', label: 'United States' },
   { value: 'ca', label: 'Canada' },
];

const Register = () => {
   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      nationality: '',
   });

   const [errors, setErrors] = useState({});

   const handleSubmit = (e) => {
      e.preventDefault();
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length === 0) {
         // Submit form
         console.log('Form submitted:', formData);
      } else {
         setErrors(validationErrors);
      }
   };

   const validateForm = () => {
      const errors = {};
      if (!formData.firstName.trim()) errors.firstName = 'First name is required';
      if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
      if (!formData.email.match(/^\S+@\S+\.\S+$/)) errors.email = 'Invalid email address';
      if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
      if (!formData.nationality) errors.nationality = 'Nationality is required';
      console.log(errors)
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
                                    <div className={`input-icon ${errors.firstName && 'icon-more'}`}>
                                       <FaUser />
                                    </div>
                                    <Form.Control
                                       type="text"
                                       placeholder="First Name"
                                       value={formData.firstName}
                                       onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                       isInvalid={!!errors.firstName}
                                    />
                                    {errors.firstName && <Form.Text className="text-danger">{errors.firstName}</Form.Text>}
                                 </Form.Group>
                              </motion.div>
                           </Col>
                           <Col md={6}>
                              <motion.div initial={{ x: 20 }} animate={{ x: 0 }}>
                                 <Form.Group className="mb-3 form-group">
                                    <div className={`input-icon ${errors.lastName && 'icon-more'}`}>
                                       <FaUser />
                                    </div>
                                    <Form.Control
                                       type="text"
                                       placeholder="Last Name"
                                       value={formData.lastName}
                                       onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                       isInvalid={!!errors.lastName}
                                    />
                                    {errors.lastName && <Form.Text className="text-danger">{errors.lastName}</Form.Text>}
                                 </Form.Group>
                              </motion.div>
                           </Col>
                        </Row>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
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

                        <Row>
                           <Col md={6}>
                              <motion.div initial={{ y: 10 }} animate={{ y: 0 }} transition={{ delay: 0.3 }}>
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
                           </Col>
                           <Col md={6}>
                              <motion.div initial={{ y: 10 }} animate={{ y: 0 }} transition={{ delay: 0.4 }}>
                                 <Form.Group className="mb-3 form-group">
                                    <Form.Control
                                       type="password"
                                       placeholder="Confirm Password"
                                       value={formData.confirmPassword}
                                       onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                       isInvalid={!!errors.confirmPassword}
                                    />
                                    {errors.confirmPassword && (
                                       <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>
                                    )}
                                 </Form.Group>
                              </motion.div>
                           </Col>
                        </Row>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                           <Form.Group className="mb-4 form-group">
                              <div className={`input-icon ${errors.nationality && 'icon-more'}`}>
                                 <FaCity />
                              </div>
                              <Select
                                 options={countries}
                                 placeholder="Select Nationality"
                                 value={formData.nationality}
                                 onChange={(selected) => setFormData({ ...formData, nationality: selected })}
                                 classNamePrefix="react-select"
                                 isInvalid={!!errors.nationality}
                              />
                              {errors.nationality && <Form.Text className="text-danger">{errors.nationality}</Form.Text>}
                           </Form.Group>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                           <Button variant="primary" type="submit" className="w-100 mb-3 auth-button">
                              Register <FaArrowRight className="ms-2" />
                           </Button>
                        </motion.div>

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
