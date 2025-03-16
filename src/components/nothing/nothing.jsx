import { motion } from "framer-motion";
import { PiBinocularsDuotone } from "react-icons/pi";
import "./nothing.css";

const NothingFound = ({ message = "Nothing found here" }) => {
   return (
      <motion.div
         className="nothing-found-container"
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.3 }}
      >
         <motion.div
            className="nothing-found-icon"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 3 }}
         >
            <PiBinocularsDuotone />
         </motion.div>
         <p className="nothing-found-message">{message}</p>
      </motion.div>
   );
};

export default NothingFound;
