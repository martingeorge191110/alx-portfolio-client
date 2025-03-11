import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes, FaCheck, FaDollarSign } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import './add_growth_rates.css';
import LoadingSpinner from '../loading_spinners/loading';
import { ChangeCompanyGrowtRatesApi } from '../../services/company';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const ProfitModal = ({ onClose, company }) => {
   const token = useSelector(
      state => state.user.token
   )
   const navigate = useNavigate()

   const currentYear = new Date().getFullYear();
   const [entries, setEntries] = useState([{ year: currentYear - 1, profit: '' }]);
   const [isValid, setIsValid] = useState(false);
   const [error, setError] = useState('')

   const [isSubmitting, setIsSubmitting] = useState(false)
   useEffect(() => {
      const allValid = entries.every(entry =>
         !isNaN(entry.profit) && entry.profit !== '' && entry.profit >= 0
      );
      setIsValid(allValid && entries.length > 0);
   }, [entries]);

   const addYearEntry = () => {
      const lastYear = entries[entries.length - 1].year;
      if (lastYear > currentYear - 10) {
         setEntries([...entries, { year: lastYear - 1, profit: '' }]);
      }
   };

   const removeYearEntry = (index) => {
      if (index !== 0) {
         const newEntries = entries.filter((_, i) => i !== index);
         setEntries(newEntries);
      }
   };

   const handleProfitChange = (index, value) => {
      const newEntries = [...entries];
      newEntries[index].profit = Number(value);
      setEntries(newEntries);
   };

   const handleSubmit = async () => {
      if (!isValid)  return;
      setIsSubmitting(true)
      try {
         const response = await ChangeCompanyGrowtRatesApi({token, company_id: company.id, rates: entries})

         if (response.success){
            company.growthRates = response.growthRates
         }
      } catch (err) {
         alert(err)
      } finally {
         setIsSubmitting(false)
         onClose()
      }
   };

   return (
      <>
      {isSubmitting ? 
      <LoadingSpinner message='Submitting new profit growth rates model.....'/>
      :
      <div className="profit-modal-overlay">
         <motion.div
            initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            animate={{ backdropFilter: 'blur(8px)', opacity: 1 }}
            exit={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overlay-background"
         />

         <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="profit-modal-content"
         >
            <div className="modal-header">
               <h3 className="modal-title">
                  <FaDollarSign className="me-2" />
                  Add Profit History
               </h3>
               <Button variant="link" onClick={onClose} className="close-btn">
                  <FaTimes />
               </Button>
            </div>

            <motion.div className="entries-container">
               <AnimatePresence>
                  {entries.map((entry, index) => (
                     <motion.div
                        key={entry.year}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="entry-row"
                     >
                        <div className="year-label">{entry.year}</div>
                        <Form.Control
                           type="number"
                           value={entry.profit}
                           onChange={(e) => handleProfitChange(index, e.target.value)}
                           placeholder="Enter profit amount"
                           className="profit-input"
                           min="0"
                        />
                        <motion.button
                           whileHover={{ scale: 1.1 }}
                           whileTap={{ scale: 0.9 }}
                           className={`remove-btn ${index === 0 ? 'disabled' : ''}`}
                           onClick={() => removeYearEntry(index)}
                           disabled={index === 0}
                        >
                           <FaTimes />
                        </motion.button>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </motion.div>

            <div className="modal-footer">
               <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="add-year-btn"
                  onClick={addYearEntry}
                  disabled={entries.length >= 10}
               >
                  <FaPlus className="me-2" />
                  Add Previous Year ({currentYear - entries.length - 1})
               </motion.button>

               <div className="action-buttons">
                  <motion.button
                     className="cancel-btn"
                     onClick={onClose}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     Cancel
                  </motion.button>
                  <motion.button
                     className="submit-btn"
                     onClick={handleSubmit}
                     disabled={!isValid}
                     whileHover={{ scale: isValid ? 1.05 : 1 }}
                     whileTap={{ scale: isValid ? 0.95 : 1 }}
                  >
                     <FaCheck className="me-2" />
                     Submit Profits
                  </motion.button>
               </div>
            </div>
         </motion.div>
      </div>}
      </>
   );
};

export default ProfitModal;
