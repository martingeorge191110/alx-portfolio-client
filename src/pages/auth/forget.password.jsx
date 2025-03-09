import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './auth.css';
import { SendCodeApi } from '../../services/auth';



const ForgotPassword = () => {
   const [email, setEmail] = useState('');
   const [error, setError] = useState('');
   const [isSubmitted, setIsSubmitted] = useState(false);

   const handleSubmit = async () => {
      if (!email.match(/^\S+@\S+\.\S+$/)) {
         setError('Please enter a valid email address');
         return;
      }

      try {
         setError('');
         setIsSubmitted(true);
   
         const response = await SendCodeApi({email})

         console.log(response)
      } catch (err) {
         throw (err)
      }
      setIsSubmitted(false)
   };

   return (
      <div>
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
                     <Link to="/login" className="text-decoration-none d-block mb-4">
                        <FaArrowLeft className="me-2" />
                        Back to Login
                     </Link>

                     <h2 className="text-center mb-4">Reset Password</h2>

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
                                 {isSubmitted ? "Code is sending....." : "Send a Code via email"}
                              </Button>
                           </motion.div>
                        </Form>
                     ) }
                  </motion.div>
               </Col>
            </Row>
         </Container>
      </motion.div>
      </div>
   );
}

export default ForgotPassword;
