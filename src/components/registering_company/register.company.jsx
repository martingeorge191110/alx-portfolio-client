import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaCheck, FaBuilding, FaInfoCircle, FaPhone, FaEnvelope, FaIndustry, FaMapMarker, FaChartLine, FaUserTie, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { Button, Col, Form, Row } from 'react-bootstrap';
import './register_company.css';
import LoadingSpinner from '../loading_spinners/loading';
import { CreateStripeForCompanyApi } from '../../services/company';
import { useSelector } from 'react-redux';

const CreateCompanyModal = ({ onClose }) => {

   const [isSubmitting, setIsSubmitting] = useState(false)
   const token = useSelector(
      state => state.user.token
   )

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      show: {
         opacity: 1,
         y: 0,
         transition: { type: 'spring', stiffness: 150 }
      }
   };

   const currentYear = new Date().getFullYear();
   const [formData, setFormData] = useState({
      name: '',
      description: '',
      contact_number: '',
      contact_email: '',
      industry: '',
      location: '',
      stock_market: false,
      user_role: '',
      founder_year: currentYear,
      valuation: ''
   });

   const [isValid, setIsValid] = useState(false);

   useEffect(() => {
      const validateForm = () => {
         return (
            formData.name.trim() &&
            formData.description.trim() &&
            /^\d+$/.test(formData.contact_number) &&
            /^\S+@\S+\.\S+$/.test(formData.contact_email) &&
            formData.industry.trim() &&
            formData.location.trim() &&
            formData.user_role.trim() &&
            formData.founder_year >= 1900 &&
            formData.founder_year <= currentYear &&
            !isNaN(formData.valuation) &&
            formData.valuation >= 0
         );
      };
      setIsValid(validateForm());
   }, [formData, currentYear]);

   const handleInputChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
   };

   const handleSubmit = async () => {

      setIsSubmitting(true)

      if (!isValid) return;

      try {
         const response = await CreateStripeForCompanyApi({token, data_body: formData})

         if (response.success)
            window.location.href = response.url;
         else
            alert(response.message)

      } catch (err) {
         alert(err)
         console.log(err)
      } finally {
         setIsSubmitting(false)
         onclose()
      }
   };

   return (
      <div className={'modal-overlay'}>
         <motion.div
            initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            animate={{ backdropFilter: 'blur(8px)', opacity: 1 }}
            exit={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={'overlay-background'}
         />
         {isSubmitting ? <LoadingSpinner message='Creating a new session to pay the amount.....'/> : ''}
         <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={'modal-content'}
         >
            <div className={'modal-header'}>
               <h3 className={'modal-title'}>
                  <FaBuilding className="me-2" />
                  Register New Company
               </h3>
               <Button variant="link" onClick={onClose} className={'close-btn'}>
                  <FaTimes />
               </Button>
            </div>

            <motion.div className={'form-container'}>
               <Row className="g-3">
                  {/* Name */}
                  <Col md={6}>
                     <motion.div variants={itemVariants}>
                        <div className="input-group">
                           <FaBuilding className="input-icon" />
                           <Form.Control
                              placeholder="Company Name"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                           />
                        </div>
                     </motion.div>
                  </Col>

                  {/* Description */}
                  <Col md={12}>
                     <motion.div variants={itemVariants}>
                        <div className="input-group">
                           <FaInfoCircle className="input-icon" />
                           <Form.Control
                              as="textarea"
                              placeholder="Company Description"
                              value={formData.description}
                              onChange={(e) => handleInputChange('description', e.target.value)}
                              rows={3}
                           />
                        </div>
                     </motion.div>
                  </Col>

                  {/* Contact Information */}
                  <Col md={6}>
                     <motion.div variants={itemVariants}>
                        <div className="input-group">
                           <FaPhone className="input-icon" />
                           <Form.Control
                              type="tel"
                              placeholder="Contact Number"
                              value={formData.contact_number}
                              onChange={(e) => handleInputChange('contact_number', e.target.value)}
                           />
                        </div>
                     </motion.div>
                  </Col>

                  <Col md={6}>
                     <motion.div variants={itemVariants}>
                        <div className="input-group">
                           <FaEnvelope className="input-icon" />
                           <Form.Control
                              type="email"
                              placeholder="Contact Email"
                              value={formData.contact_email}
                              onChange={(e) => handleInputChange('contact_email', e.target.value)}
                           />
                        </div>
                     </motion.div>
                  </Col>

                  {/* Industry & Location */}
                  <Col md={6}>
                     <motion.div variants={itemVariants}>
                        <div className="input-group">
                           <FaIndustry className="input-icon" />
                           <Form.Control
                              placeholder="Industry"
                              value={formData.industry}
                              onChange={(e) => handleInputChange('industry', e.target.value)}
                           />
                        </div>
                     </motion.div>
                  </Col>

                  <Col md={6}>
                     <motion.div variants={itemVariants}>
                        <div className="input-group">
                           <FaMapMarker className="input-icon" />
                           <Form.Control
                           className='form-control'
                              placeholder="Location"
                              value={formData.location}
                              onChange={(e) => handleInputChange('location', e.target.value)}
                           />
                        </div>
                     </motion.div>
                  </Col>

                  {/* Stock Market & User Role */}
                  <Col md={6}>
                     <motion.div variants={itemVariants}>
                        <div className="input-group" style={{paddingLeft: '5rem'}}>
                           <FaChartLine className="input-icon" />
                           <Form.Check
                              type="switch"
                              label="Publicly Traded"
                              checked={formData.stock_market}
                              onChange={(e) => handleInputChange('stock_market', e.target.checked)}
                           />
                        </div>
                     </motion.div>
                  </Col>

                  <Col md={6}>
                     <motion.div variants={itemVariants}>
                        <div className="input-group">
                           <FaUserTie className="input-icon" />
                           <Form.Control
                              placeholder="Your Role"
                              value={formData.user_role}
                              onChange={(e) => handleInputChange('user_role', e.target.value)}
                           />
                        </div>
                     </motion.div>
                  </Col>

                  {/* Founder Year & Valuation */}
                  <Col md={6}>
                     <motion.div variants={itemVariants}>
                        <div className="input-group">
                           <FaCalendarAlt className="input-icon" />
                           <Form.Control
                              type="number"
                              placeholder="Founder Year"
                              min="1900"
                              max={currentYear}
                              value={formData.founder_year}
                              onChange={(e) => handleInputChange('founder_year', Number(e.target.value))}
                           />
                        </div>
                     </motion.div>
                  </Col>

                  <Col md={6}>
                     <motion.div variants={itemVariants}>
                        <div className="input-group">
                           <FaDollarSign className="input-icon" />
                           <Form.Control
                              type="number"
                              placeholder="Valuation ($)"
                              min="0"
                              step="0.01"
                              value={formData.valuation}
                              onChange={(e) => handleInputChange('valuation', Number(e.target.value))}
                           />
                        </div>
                     </motion.div>
                  </Col>
            </Row>
            </motion.div>

            <div className={'modal-footer'}>
               <div className={'action-buttons'}>
                  <motion.button
                     className={'cancel-btn'}
                     onClick={onClose}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     Cancel
                  </motion.button>
                  <motion.button
                     className={'submit-btn'}
                     onClick={handleSubmit}
                     disabled={!isValid}
                     whileHover={{ scale: isValid ? 1.05 : 1 }}
                     whileTap={{ scale: isValid ? 0.95 : 1 }}
                  >
                     <FaCheck className="me-2" />
                     Register Company
                  </motion.button>
               </div>
            </div>
         </motion.div>
      </div>
   );
};

export default CreateCompanyModal;
