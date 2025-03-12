import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FaHome, FaInfoCircle, FaPhone, FaTags, FaUserPlus,
   FaSignInAlt, FaBars, FaTimes, FaUser, FaBell, FaCog,
   FaSignOutAlt, FaEnvelope, FaRegBell,
   FaSearch
} from 'react-icons/fa';
import './nav_bar.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RetreiveAllNotificationsApi } from '../../services/notifications';

const Navbar = ({tokenValidation}) => {
   const navigate = useNavigate()

   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
   const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [notifications, setNotifications] = useState([]);
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

   const notificationItems = [
      { id: 1, text: 'New message received', read: false },
      { id: 2, text: 'Account update required', read: true },
      { id: 3, text: 'New feature available', read: false },
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
      RetreiveAllNotificationsApi({token, page: page}).then(
         res => {
            console.log(res)
            setUnreadNotifications(res.notifications.length + res.owner_notifications.length)
            setNotifications({notifications: res.notifications, owners: res.owner_notifications})
         }
      ).finally(
         () => setIsLoading(false)
      )
   }, [])

   useEffect(() => {
      if (notifications) {
         console.log(notifications)
      }
   }, [notifications])
   return (
      <motion.nav
         ref={navbarRef}
         className="navbar navbar-expand-lg navbar-light fixed-top"
         initial={{ y: -100 }}
         animate={{ y: 0 }}
         transition={{ duration: 0.5, type: 'spring' }}
      >
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
                              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                              whileHover={{ scale: 1.05 }}
                           >
                              <FaBell className="nav-icon" />
                              {unreadNotifications > 0 && (
                                 <span className="notification-badge">
                                    {unreadNotifications}
                                 </span>
                              )}
                           </motion.button>

                           <AnimatePresence>
                              { showNotificationsDropdown ? isLoading ? '.....' :  (
                                 <motion.ul
                                    className="dropdown-menu-nav show"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                 >
                                    <div className="dropdown-header">Notifications</div>
                                    
                                    {notifications.owners.map((noti) => (
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
                                          <div>
                                             <button style={{background: 'lightgreen', border: 'none'}}>Accecpt</button>
                                             <button style={{background: 'red', border: 'none'}}>Cancel</button>
                                          </div>
                                       </motion.li>
                                    ))
                                    }
                                    {/* {notifications.map(notification => (
                                       <motion.li
                                          key={notification.id}
                                          className={`dropdown-item ${!notification.read ? 'unread' : ''}`}
                                          whileHover={{ x: 5 }}
                                       >
                                          <div className="d-flex align-items-center">
                                             <FaRegBell className="me-2" />
                                             {notification.text}
                                          </div>
                                       </motion.li>
                                    ))} */}
                                    {/* {unreadNotifications.length === 0 && (
                                       <div className="dropdown-item text-muted">
                                          No new notifications
                                       </div>
                                    )} */}
                                 </motion.ul>
                              ) : ''}
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
      </motion.nav>
   );
};

export default Navbar;
