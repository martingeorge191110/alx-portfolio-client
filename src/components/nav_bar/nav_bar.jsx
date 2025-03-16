import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FaHome, FaInfoCircle, FaPhone, FaTags, FaUserPlus,
   FaSignInAlt, FaBars, FaTimes, FaUser, FaBell, FaCog,
   FaSignOutAlt, FaEnvelope, FaRegBell,
   FaSearch,
   FaCheck,
   FaOpenid,
   FaUserAlt
} from 'react-icons/fa';
import './nav_bar.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RetreiveAllNotificationsApi, SeenAllNotificationsApi } from '../../services/notifications';
import { PiTrendUp } from 'react-icons/pi';
import LoadingPage from '../../pages/loading/loading.page';
import { AcceptingInvitaionApi, RejectingInvitaionApi } from '../../services/company';
import LoadingSpinner from '../loading_spinners/loading';
import UserNotificationCard from '../notifications/notifications';

const Navbar = ({ tokenValidation }) => {
   const navigate = useNavigate()

   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
   const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [notifications, setNotifications] = useState(null);
   const navbarRef = useRef(null);
   const [isLoading, setIsLoading] = useState(true)

   const [page, setPage] = useState(1)
   const user = useSelector(
      state => state.user.info
   )
   const token = useSelector(
      state => state.user.token
   )

   // Check auth status on mount
   useEffect(() => {
      setIsLoggedIn(tokenValidation);
   }, []);

   const navItems = [
      { icon: <FaInfoCircle />, text: 'About', path: '/about' },
      { icon: <FaPhone />, text: 'Contact', path: '/contact' },
   ];

   if (!user || !user.paid) {
      navItems.push({ icon: <FaTags />, text: 'Pricing', path: '/pricing' })
   }
   if (tokenValidation) {
      navItems.push({ icon: <FaSearch />, text: 'Company Search', path: '/company/search' })
   }

   const profileItems = [
      { icon: <FaUser />, text: 'Profile', path: '/profile' },
      { icon: <FaCog />, text: 'Settings', path: '/settings' },
      {
         icon: <FaSignOutAlt />, text: 'Logout', path: '/logout', action: () => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            navigate('/')
         }
      },
   ];

   const [unreadNotifications, setUnreadNotifications] = useState(0)

   const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
         setShowProfileDropdown(false);
         setShowNotificationsDropdown(false);
      }
   };

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   useLayoutEffect(() => {
      RetreiveAllNotificationsApi({ token, page: page }).then(
         res => {
            console.log(res)
            if (res.success) {
               let unreadNotif = 0
               res.notifications.forEach(ele => {
                  if (!ele.is_seen)
                     unreadNotif += 1
               });
               setUnreadNotifications(unreadNotif + res.owner_notifications.length)
               setNotifications({ notifications: res.notifications, owners: res.owner_notifications, deals: res.deals })
            }
         }
      ).catch(
         err => {
            throw (err)
         }
      ).finally(
         () => setIsLoading(false)
      )
   }, [])


   const [isAccepting, setIsAccepting] = useState(false)
   const toggleAcceptingInvite = async (rel_id, company_id) => {
      setIsAccepting(true)

      try {
         const response = await AcceptingInvitaionApi({ token: token, rel: rel_id })

         if (response.success)
            navigate(`/company/${company_id}`)

         alert(response.message)
      } catch (err) {
         alert(err)
      } finally {
         setIsAccepting(false)
      }
   };

   const toggleRejectingInvite = async (rel_id, company_id) => {
      setIsAccepting(true)

      try {
         const response = await RejectingInvitaionApi({ token: token, rel: rel_id })

         if (response.success)
            navigate(`/company/${company_id}`)

         alert(response.message)
      } catch (err) {
         alert(err)
      } finally {
         setIsAccepting(false)
      }
   };


   return (
      <>
         <motion.nav
            ref={navbarRef}
            className="navbar navbar-expand-lg navbar-light fixed-top"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
         >
            {/* {toUser ? <UserNotificationCard user={toUser} /> : ''} */}
            <div className="container">
               {/* Brand Logo */}
               <motion.a
                  className="navbar-brand"
                  href="/"
                  whileHover={{ scale: 1.05 }}
               >
                  <FaHome className="brand-icon" />
                  <span>WebSolutions</span>
               </motion.a>

               {/* Mobile Toggle */}
               <button
                  className="navbar-toggler"
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               >
                  {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
               </button>

               {/* Desktop Menu */}
               <div className="collapse navbar-collapse">
                  <ul className="navbar-nav ms-auto align-items-center">
                     {navItems.map((item) => (
                        <motion.li
                           key={item.text}
                           className="nav-item"
                           whileHover={{ scale: 1.05 }}
                        >
                           <Link className="nav-link" to={item.path}>
                              <span className="nav-icon">{item.icon}</span>
                              {item.text}
                           </Link>
                        </motion.li>
                     ))}

                     {isLoggedIn ? (
                        <>
                           {/* Notifications Dropdown */}
                           <li className="nav-item dropdown">
                              <motion.button
                                 className="nav-link notification-btn"
                                 onClick={() => {
                                    setShowNotificationsDropdown(!showNotificationsDropdown)
                                    const notifications_ids = []
                                    for (const ele of notifications.notifications)
                                       if (!ele.is_seen)
                                          notifications_ids.push(ele.id)

                                    if (notifications_ids.length > 0) {
                                       SeenAllNotificationsApi({ token, notifications_arr: notifications_ids }).then(
                                          res => {
                                             if (res.success) {
                                                const Notifs = notifications - notifications.owners.length
                                                setUnreadNotifications(unreadNotifications - Notifs)
                                             }
                                          }).catch(
                                             err => console.log(err)
                                          )
                                    }
                                 }}
                                 whileHover={{ scale: 1.05 }}
                              >
                                 <FaBell className="nav-icon" />
                                 {isLoading ? '' : unreadNotifications > 0 && (
                                    <span className="notification-badge">
                                       {unreadNotifications}
                                    </span>
                                 )}
                              </motion.button>

                              <AnimatePresence>
                                 {showNotificationsDropdown && !isLoading && (
                                    <motion.ul
                                       className="dropdown-menu-nav show"
                                       initial={{ opacity: 0, y: 10 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       exit={{ opacity: 0, y: -10 }}
                                    >
                                       <div className="dropdown-header">Notifications</div>
                                       {!notifications || !notifications.owners ? "" : notifications.owners.map((noti) => (
                                          <motion.li
                                             key={noti.rel_id}
                                             className={`dropdown-item `}
                                             whileHover={{ x: 5 }}
                                          >
                                             <div className="d-flex align-items-center">
                                                <FaRegBell className="me-2" />
                                                {noti.f_n} is invited you to be owner
                                                at {noti.company_name}
                                             </div>
                                             <div style={{ marginTop: "1rem" }}>
                                                <button
                                                   className="btn btn-success btn-sm px-3"
                                                   onClick={() => toggleAcceptingInvite(noti.rel_id, noti.company_id)}
                                                   disabled={isAccepting}
                                                >
                                                   {isAccepting ? (
                                                      <div className="spinner-border spinner-border-sm" />
                                                   ) : (
                                                      <><FaCheck className="me-1" />Accept invitation</>
                                                   )}
                                                </button>
                                                <button
                                                   className="btn btn-danger btn-sm px-3"
                                                   style={{ marginLeft: '2rem' }}
                                                   onClick={() => toggleRejectingInvite(noti.rel_id, noti.company_id)}  // 🔥 Reset only this user's invite state
                                                   disabled={isAccepting}
                                                >
                                                   <FaTimes className="me-1" />Cancel
                                                </button>
                                             </div>
                                          </motion.li>
                                       ))
                                       }
                                       {!notifications || !notifications.notifications ? "" : notifications.notifications.map((notification, i) => (
                                          <motion.li
                                             key={notification.id}
                                             className={`dropdown-item ${!notification.is_seen ? 'unread' : ''}`}
                                             whileHover={{ x: 5 }}
                                          >
                                             <div className="d-flex align-items-center flex-wrap">
                                                <FaRegBell className="me-2" />
                                                {notification.content}
                                             </div>
                                             <div style={{ marginLeft: "0" }}>
                                                <img
                                                   src={notification.user.avatar || 'https://th.bing.com/th/id/OIP.nYjTZMgoAAgpLUBL5ooqWwHaHa?rs=1&pid=ImgDetMain'}
                                                   alt={"Awdawd"}
                                                   className="rounded-circle me-1"
                                                   width="60"
                                                   height="60"
                                                />
                                                {`${notification.user.f_n} ${notification.user.l_n}`}
                                             </div>
                                          </motion.li>
                                       ))}
                                       {unreadNotifications.length === 0 && (
                                          <div className="dropdown-item text-muted">
                                             No new notifications
                                          </div>
                                       )}
                                    </motion.ul>
                                 )}
                              </AnimatePresence>
                           </li>

                           {/* Profile Dropdown */}
                           <li className="nav-item dropdown">
                              <motion.button
                                 className="nav-link profile-btn"
                                 onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                 whileHover={{ scale: 1.05 }}
                              >
                                 <FaUser className="nav-icon" />
                              </motion.button>

                              <AnimatePresence>
                                 {showProfileDropdown && (
                                    <motion.ul
                                       className="dropdown-menu-nav show"
                                       initial={{ opacity: 0, y: 10 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       exit={{ opacity: 0, y: -10 }}
                                    >
                                       {profileItems.map(item => (
                                          <motion.li
                                             key={item.text}
                                             className="dropdown-item"
                                             whileHover={{ x: 5 }}
                                          >
                                             <a
                                                href={item.path}
                                                className="d-flex align-items-center"
                                                onClick={() => item.action()}
                                             >
                                                <span className="me-2">{item.icon}</span>
                                                {item.text}
                                             </a>
                                          </motion.li>
                                       ))}
                                    </motion.ul>
                                 )}
                              </AnimatePresence>
                           </li>
                        </>
                     ) : (
                        <>
                           <motion.li className="nav-item" whileHover={{ scale: 1.05 }}>
                              <a className="btn btn-outline-primary me-2" href="/login">
                                 <FaSignInAlt className="me-2" />
                                 Login
                              </a>
                           </motion.li>
                           <motion.li className="nav-item" whileHover={{ scale: 1.05 }}>
                              <a className="btn btn-primary" href="/register">
                                 <FaUserPlus className="me-2" />
                                 Register
                              </a>
                           </motion.li>
                        </>
                     )}
                  </ul>
               </div>

               {/* Mobile Menu */}
               {isMobileMenuOpen && (
                  <motion.div
                     className="mobile-menu"
                     initial={{ opacity: 0, y: -20 }}
                     animate={{ opacity: 1, y: 0 }}
                  >
                     <ul className="navbar-nav">
                        {[...navItems, ...(isLoggedIn ? [] : [
                           { icon: <FaSignInAlt />, text: 'Login', path: '/login' },
                           { icon: <FaUserPlus />, text: 'Register', path: '/register' }
                        ])].map((item) => (
                           <motion.li
                              key={item.text}
                              className="nav-item"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                           >
                              <a
                                 className="nav-link"
                                 href={item.path}
                                 onClick={() => setIsMobileMenuOpen(false)}
                              >
                                 <span className="nav-icon">{item.icon}</span>
                                 {item.text}
                              </a>
                           </motion.li>
                        ))}

                        {isLoggedIn && (
                           <>
                              <li className="nav-item">
                                 <a className="nav-link" href="/notifications">
                                    <FaBell className="me-2" />
                                    Notifications ({unreadNotifications})
                                 </a>
                              </li>
                              {profileItems.map(item => (
                                 <li key={item.text} className="nav-item">
                                    <a className="nav-link" href={item.path}>
                                       <span className="nav-icon">{item.icon}</span>
                                       {item.text}
                                    </a>
                                 </li>
                              ))}
                           </>
                        )}
                     </ul>
                  </motion.div>
               )}
            </div>
         </motion.nav></>
   );
};

export default Navbar;
