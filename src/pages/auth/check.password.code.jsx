import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './auth.css';
import { CheckCodeApi, CreateNewPassowrdApi } from '../../services/auth.js';



const CheckPasswordCode = () => {
   const navigate = useNavigate()

   const [email, setEmail] = useState('');
   const [code, setcode] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');
   const [passwordError, setPasswordError] = useState('')
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [isSubmittedPassword, setIsSubmittedPassword] = useState(false);
   const [resetPassword, setResetPassword] = useState(false);

   const handleSubmit = async () => {
      setError('')
      if (!email.match(/^\S+@\S+\.\S+$/)) {
         setError('Please enter a valid email address');
         return;
      }
      if (!code || code === '') {
         setError('Please enter the code');
         return;
      }

      try {
         setError('');
         setIsSubmitted(true);
   
         const response = await CheckCodeApi({email, code})

         if (response.success) {
            setResetPassword(true)
         } else {
            setError(response.message)
         }
      } catch (err) {
         setError(err)
         throw (err)
      }
      setIsSubmitted(false)
   };


   const newPasswordSubmitting = async () => {
      setPasswordError('')
      if (!newPassword || newPassword === '') {
         setError('Please enter the password');
         return;
      }
      if (!confirmPassword || confirmPassword === '') {
         setError('Please Confirm the new password!');
         return;
      }

      try {
         setIsSubmittedPassword(true);
   
         const response = await CreateNewPassowrdApi({email, password: newPassword, confirm_password: confirmPassword})

         if (response.success) {
            navigate("forgot-password")
         } else {
            setPasswordError(response.message)
         }
      } catch (err) {
         setPasswordError(err)
         throw (err)
      }
      setIsSubmittedPassword(false)
   }


   return (
      <div>
      {!resetPassword ? <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="whole-page"
      >
         <Container>
            <Row className="justify-content-center">
               <Col xs={12} md={8} lg={6}>
                  <motion.div
                     className="auth-box"
                     initial={{ scale: 0.95 }}
                     animate={{ scale: 1 }}
                  >
                     <Link to="/reset-password" className="text-decoration-none d-block mb-4">
                        <FaArrowLeft className="me-2" />
                        Back to Sending another code
                     </Link>

                     <h2 className="text-center mb-4">Check Code Validation</h2>

                     {(
                        <Form >
                           <Form.Group className="mb-4">
                              <Form.Control
                                 type="email"
                                 placeholder="Enter your email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 isInvalid={!!error}
                              />
                              <Form.Control
                                 type="code"
                                 style={{marginTop: "2rem"}}
                                 placeholder="Enter your code"
                                 value={code}
                                 onChange={(e) => setcode(e.target.value)}
                                 isInvalid={!!error}
                              />
                              {error && <Form.Text className="text-danger">{error}</Form.Text>}
                           </Form.Group>

                           <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button
                                 onClick={(e) => {
                                    e.preventDefault()
                                    handleSubmit()
                                 }}
                                 variant="primary"
                                 type="submit"
                                 className="w-100 auth-button"
                                 disabled={isSubmitted}
                                 >
                                 {isSubmitted ? "Checking the Code....." : "Check Code Validation"}
                              </Button>
                           </motion.div>
                        </Form>
                     ) }
                  </motion.div>
               </Col>
            </Row>
         </Container>
      </motion.div>
      :
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="whole-page"
      >
         <Container>
            <Row className="justify-content-center">
               <Col xs={12} md={8} lg={6}>
                  <motion.div
                     className="auth-box"
                     initial={{ scale: 0.95 }}
                     animate={{ scale: 1 }}
                  >
                     <h2 className="text-center mb-4">Creating new Password</h2>

                     {(
                        <Form >
                           <Form.Group className="mb-4">
                              <Form.Control
                                 type="password"
                                 placeholder="Enter your new Password"
                                 value={newPassword}
                                 onChange={(e) => setNewPassword(e.target.value)}
                                 isInvalid={!!passwordError}
                              />
                              <Form.Control
                                 type="code"
                                 style={{marginTop: "2rem"}}
                                 placeholder="Confirm Password"
                                 value={confirmPassword}
                                 onChange={(e) => setConfirmPassword(e.target.value)}
                                 isInvalid={!!passwordError}
                              />
                              {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
                           </Form.Group>

                           <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button
                                 onClick={(e) => {
                                    e.preventDefault()
                                    newPasswordSubmitting()
                                 }}
                                 variant="primary"
                                 type="submit"
                                 className="w-100 auth-button"
                                 disabled={!!passwordError}
                                 >
                                 {isSubmittedPassword ? "Creating new Password....." : "Submit new Passowrd"}
                              </Button>
                           </motion.div>
                        </Form>
                     ) }
                  </motion.div>
               </Col>
            </Row>
         </Container>
      </motion.div>}
      </div>
   );
}

export default CheckPasswordCode;
