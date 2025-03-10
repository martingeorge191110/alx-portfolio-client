import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";


const NotFoundPage = () => {
   return (
      <div style={{textAlign: 'center'}} className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center text-gray bg-light">
         {/* Icon */}
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-3"
         >
            <FaExclamationTriangle className="text-warning display-1" />
         </motion.div>

         {/* Title */}
         <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="fw-bold display-3"
         >
            404
         </motion.h1>

         {/* Subtitle */}
         <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="fw-semibold fs-4 mb-3"
         >
            Page Not Found
         </motion.h2>

         {/* Message */}
         <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-secondary mb-4 fs-5"
         >
            The page you are looking for does not exist.
         </motion.p>

         {/* Button */}
         <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            onClick={() => window.history.back()}
            className="btn btn-primary px-4 py-2 fs-5"
         >
            Go Back
         </motion.button>
      </div>
   );
};

export default NotFoundPage;
