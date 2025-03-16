import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPercentage, FaDollarSign, FaTimes, FaPaperPlane } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './request_investment.css';
import { CreateDealApi } from '../../services/investment';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../loading_spinners/loading';

const RequestingInvestmentCard = ({ onClose, company }) => {

   const token = useSelector(
      state => state.user.token
   )

   const [equity, setEquity] = useState('');
   const [amount, setAmount] = useState('');
   const [isLoading, setIsLoading] = useState(false)

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true)
      try {
         const response = await CreateDealApi({token, company_id: company.id, data_body: {amount: Number(amount), equity_percentage: Number(equity)}})

         console.log(response)
         if (response.success) {
            company.investments.push(response.investment_deal)
         }
         alert(response.message)
      } catch (err) {
         alert(err)
         throw (err)
      } finally {
         setIsLoading(false)
      }
      onClose();
   };

   return (
      <div className="investment-card-backdrop">
         {isLoading ? <LoadingSpinner message='Submitting deal request .....'/> : ""}
         <motion.div
            className="investment-card-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
         >
            <div className="investment-card-header">
               <h3 className="mb-0" style={{color: "rgb(100, 100, 255)"}}>
                  Investment Proposal for <span className="company-name-card">TechCorp Inc.</span>
               </h3>
               <button onClick={onClose} className="close-btn">
                  <FaTimes />
               </button>
            </div>

            <div className="card-body">
               <form onSubmit={handleSubmit}>
                  <div className="form-group mb-4">
                     <label className="d-flex mb-2 fw-bold">
                        <FaPercentage style={{marginBottom: '2.5rem'}} className="input-icon" />
                        Equity Percentage Request
                     </label>
                     <div className="input-wrapper">
                        <input
                           type="number"
                           className="form-control custom-input"
                           value={equity}
                           onChange={(e) => setEquity(e.target.value)}
                           min="1"
                           max="100"
                           required
                        />
                        <span className="input-suffix">%</span>
                     </div>
                  </div>

                  <div className="form-group mb-5">
                     <label className="d-flex mb-2 fw-bold" style={{justifyContent: "space-between", position: "relative", width: "100%"}}>
                        <FaDollarSign style={{marginBottom: '2.5rem'}}  className="input-icon" />
                        <span>Investment Amount</span>
                     </label>
                     <div className="input-wrapper">
                        <input
                           type="number"
                           className="form-control custom-input"
                           value={amount}
                           onChange={(e) => setAmount(e.target.value)}
                           min="1000"
                           step="500"
                           required
                        />
                        <span className="input-suffix">USD</span>
                     </div>
                  </div>

                  <div className="button-group">
                     <motion.button
                        type="button"
                        className="btn btn-cancel"
                        onClick={onClose}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                     >
                        Cancel
                     </motion.button>
                     <motion.button
                        type="submit"
                        className="btn btn-submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                     >
                        <FaPaperPlane className="me-2" />
                        Submit Proposal
                     </motion.button>
                  </div>
               </form>
            </div>
         </motion.div>
      </div>
   );
};

export default RequestingInvestmentCard;
