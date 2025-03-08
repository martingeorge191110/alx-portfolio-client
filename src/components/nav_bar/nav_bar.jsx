import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FaHome, FaInfoCircle, FaPhone, FaTags, FaUserPlus,
   FaSignInAlt, FaBars, FaTimes, FaUser, FaBell, FaCog,
   FaSignOutAlt, FaEnvelope, FaRegBell
} from 'react-icons/fa';
import './nav_bar.css';

const Navbar = ({tokenValidation}) => {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
   const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [notifications, setNotifications] = useState([]);
   const navbarRef = useRef(null);

   // Check auth status on mount
   useEffect(() => {
      setIsLoggedIn(tokenValidation);
   }, []);

   const navItems = [
      { icon: <FaInfoCircle />, text: 'About', path: '/about' },
      { icon: <FaPhone />, text: 'Contact', path: '/contact' },
      { icon: <FaTags />, text: 'Pricing', path: '/pricing' },
   ];

   const profileItems = [
      { icon: <FaUser />, text: 'Profile', path: '/profile' },
      { icon: <FaCog />, text: 'Settings', path: '/settings' },
      {
         icon: <FaSignOutAlt />, text: 'Logout', path: '/logout', action: () => {
            localStorage.removeItem('authToken');
            setIsLoggedIn(false);
         }
      },
   ];

   const notificationItems = [
      { id: 1, text: 'New message received', read: false },
      { id: 2, text: 'Account update required', read: true },
      { id: 3, text: 'New feature available', read: false },
   ];

   const unreadNotifications = notificationItems.filter(n => !n.read).length;

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
                        <a className="nav-link" href={item.path}>
                           <span className="nav-icon">{item.icon}</span>
                           {item.text}
                        </a>
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
                              {showNotificationsDropdown && (
                                 <motion.ul
                                    className="dropdown-menu show"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                 >
                                    <div className="dropdown-header">Notifications</div>
                                    {notificationItems.map(notification => (
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
                                    ))}
                                    {notificationItems.length === 0 && (
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
                                    className="dropdown-menu show"
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
                                             onClick={item.action}
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
