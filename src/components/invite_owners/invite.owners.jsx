import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSearch, FaSpinner, FaUserCircle, FaGlobe, FaArrowDown, FaPlus, FaCheck } from 'react-icons/fa';
import './invite_owners.css'
import { UserSearchingApi } from '../../services/user';
import { useSelector } from 'react-redux';
import { array } from 'yup';
import LoadingSpinner from '../loading_spinners/loading';
import { InvitOwnerApi } from '../../services/company';


const UserSearchModal = ({ onClose, company }) => {
   const [query, setQuery] = useState('');
   const [f_name, setF_name] = useState('')
   const [l_name, setL_name] = useState('')

   const [results, setResults] = useState([]);
   const [loading, setLoading] = useState(false);
   const [page, setPage] = useState(null);
   const [hasMore, setHasMore] = useState(false);
   const token = useSelector(
      state => state.user.token
   )
   const userId = useSelector(
      state => state.user.info.id
   )

   const [inviting, setInviting] = useState(false)

   const searchUsers = async (reset = false, query) => {
      setLoading(true);
      const f_name = query.split(" ")[0]
      const l_name = query.split(" ")[1] || null
      setF_name(f_name)
      setL_name(l_name)

      try {

         const response = await UserSearchingApi({ token, f_name, l_name, page: 1 })

         setResults([...response.users]);
         setHasMore(true);
         setPage(prev => prev + 1);
      } catch (error) {
         console.error('Search failed:', error);
      } finally {
         setLoading(false);
      }
   };

   const handleSearch = async (e) => {
      e.preventDefault();
      if (query.trim()) {
         setPage(1);
         searchUsers(true, query);
      }
   };

   useEffect(() => {
      if (!page)
         return;
      if (results.length < 10 || page < 2) {
         return;
      }

      setLoading(true)
      UserSearchingApi({ token, f_name, l_name, page }).then(
         res => {
            setResults([...res.users]);
         }
      ).catch(
         rej => {
            alert(rej)
         }
      ).finally(
         () => {
            setLoading(false)
         }
      )
   }, [page])


   const invitationSubmit = async () => {
      setInviting(true)

      try {
         const response = await InvitOwnerApi({token, user_id: invitedUsers, company_id: company.id})

         alert(response.message)
      } catch (err) {
         alert(err)
      } finally {
         setInviting(false)
         onClose()
      }
   }

   const [invitedUsers, setInvitedUsers] = useState(null);

   const toggleInvite = (userId) => {
      setInvitedUsers(userId);
   };


   return (
      <AnimatePresence>
         <motion.div
            initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            animate={{ backdropFilter: 'blur(8px)', opacity: 1 }}
            exit={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            className="search-modal-overlay"
         >
            {inviting ? <LoadingSpinner message='Inviting another owner....' /> : ''}
            <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
               transition={{ type: 'spring', stiffness: 300 }}
               className="search-modal"
            >
               <button onClick={onClose} className="close-btn-invite">
                  <FaTimes />
               </button>

               <h2 className="modal-title">
                  <FaSearch className="title-icon" />
                  User Search
               </h2>

               <form onSubmit={handleSearch} className="search-form">
                  <motion.div
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     className="search-input-group"
                  >
                     <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name..."
                     />
                     <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="search-btn"
                        disabled={loading}
                     >
                        {loading ? <FaSpinner className="spin" /> : <FaSearch />}
                     </motion.button>
                  </motion.div>
               </form>

               <div className="results-container">
                  {results.length > 0 ? (
                     <>
                        <div className="results-grid">
                           <AnimatePresence>
                              {results.map((user) => (
                                 <motion.div
                                    key={user.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="user-card"
                                    whileHover={{ scale: 1.02 }}
                                 >
                                    <img
                                       src={user.avatar}
                                       alt={`${user.f_n} ${user.l_n}`}
                                       className="user-avatar"
                                       onError={(e) => {
                                          e.target.src = <FaUserCircle />;
                                       }}
                                    />
                                    <div className="user-info">
                                       <h4>{user.f_n} {user.l_n}</h4>
                                       <div className="user-nationality">
                                          <FaGlobe />
                                          <span>{user.nationality}</span>
                                       </div>
                                    </div>

                                    {userId === user.id ?
                                       <motion.button
                                          className="btn btn-primary rounded-pill px-4 d-flex align-items-center"
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          disabled={true}
                                       >
                                          <FaPlus className="me-2" />
                                          Invite
                                       </motion.button>
                                       : invitedUsers ? (  // 🔥 Controlled by global state
                                          <motion.div
                                             className="d-flex gap-2"
                                             initial={{ opacity: 0 }}
                                             animate={{ opacity: 1 }}
                                          >
                                             <button
                                                className="btn btn-success btn-sm px-3"
                                                onClick={invitationSubmit}
                                                disabled={inviting}
                                             >
                                                {inviting ? (
                                                   <div className="spinner-border spinner-border-sm" />
                                                ) : (
                                                   <><FaCheck className="me-1" /> Sure</>
                                                )}
                                             </button>
                                             <button
                                                className="btn btn-danger btn-sm px-3"
                                                onClick={() => toggleInvite(user.id)}  // 🔥 Reset only this user's invite state
                                                disabled={inviting}
                                             >
                                                <FaTimes className="me-1" /> Cancel
                                             </button>
                                          </motion.div>
                                       ) : (
                                          <motion.button
                                             onClick={() => toggleInvite(user.id)}  // 🔥 Toggle only this user's state
                                             className="btn btn-primary rounded-pill px-4 d-flex align-items-center"
                                             whileHover={{ scale: 1.05 }}
                                             whileTap={{ scale: 0.95 }}
                                          >
                                             <FaPlus className="me-2" />
                                             Invite
                                          </motion.button>
                                       )}
                                 </motion.div>
                              ))}
                           </AnimatePresence>
                        </div>

                        {results.length < 10 ? '' : hasMore && (
                           <motion.button
                              onClick={() => {
                                 /* Handling lasy loading */
                                 setPage(page + 1)
                              }}
                              className="load-more"
                              whileHover={{ scale: 1.05 }}
                              disabled={loading}
                           >
                              {loading ? (
                                 <FaSpinner className="spin" />
                              ) : (
                                 <>
                                    <FaArrowDown />
                                    Load More
                                 </>
                              )}
                           </motion.button>
                        )}
                     </>
                  ) : (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="empty-state"
                     >
                        <FaUserCircle />
                        <p>Start searching to find users</p>
                     </motion.div>
                  )}
               </div>
            </motion.div>
         </motion.div>
      </AnimatePresence>
   );
};

export default UserSearchModal;
