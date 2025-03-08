import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';


const LoadingPage = () => {
   return (
      <>
         <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
            <motion.div
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
               className="text-center"
            >
               <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
               >
                  <FaSpinner className="display-4 text-primary spinning-icon" />
               </motion.div>
               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="mt-3 fs-5"
               >
                  Loading, please wait...
               </motion.p>
            </motion.div>
         </div>
      </>
   );
}

export default LoadingPage;
