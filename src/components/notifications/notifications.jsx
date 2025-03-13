import { useState } from 'react';
import { motion, AnimatePresence, findSpring } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaCommentDots, FaUserCircle } from 'react-icons/fa';
import './notifications.css';
import { SendNotificationNotificationsApi } from '../../services/notifications';
import { useSelector } from 'react-redux';


const UserNotificationCard = ({ user, onClose }) => {
   const token = useSelector(
      state => state.user.token
   )

   const [message, setMessage] = useState('');
   const [isSending, setIsSending] = useState(false);

   const handleSend = async () => {
      setIsSending(true);
      
      try {
         const response = await SendNotificationNotificationsApi({token, user_id: user.id, content: message})

         alert(response.message)
      } catch (err) {
         alert(err)
      } finally {
         setIsSending(false);
         setMessage('');
      }
   };

   return (
      <AnimatePresence>
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="notification-card"
         >
            <div className="notification-header">
               <div className="user-info">
                  <motion.img
                     src={user.avatar}
                     alt={`${user.f_n} ${user.l_n}`}
                     className="user-avatar"
                     whileHover={{ scale: 1.1 }}
                     onError={(e) => {
                        e.target.src = <FaUserCircle />;
                     }}
                  />
                  <div>
                     <h4>{user.f_n} {user.l_n}</h4>
                  </div>
               </div>
               <motion.button
                  onClick={onClose}
                  className="close-btn"
                  whileHover={{ scale: 1.1 }}
               >
                  <FaTimes />
               </motion.button>
            </div>

            <div className="message-container">
               <FaCommentDots className="message-icon" />
               <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="message-input"
                  rows="1"
               />
            </div>

            <motion.button
               onClick={handleSend}
               className="send-btn"
               disabled={!message || isSending}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
            >
               {isSending ? (
                  <motion.div
                     className="loading-dots"
                     animate={{ opacity: [0.5, 1, 0.5] }}
                     transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                     Sending
                  </motion.div>
               ) : (
                  <>
                     <FaPaperPlane className="send-icon" />
                     Send Message
                  </>
               )}
            </motion.button>
         </motion.div>
      </AnimatePresence>
   );
};

export default UserNotificationCard;
