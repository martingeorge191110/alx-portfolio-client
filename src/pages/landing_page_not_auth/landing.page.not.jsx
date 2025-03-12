import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaChartLine, FaBuilding, FaStar, FaRegCheckCircle, FaUserTie, FaYoutube, FaGithub, FaFileAlt, FaMicrosoft, FaGoogle, FaApple, FaAmazon, FaLinkedin, FaTwitter, FaInstagram, FaShieldAlt, FaLock, FaArrowUp } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import './landing_page_not.css';


const HeroSectionNotAuth = lazy(() => import('../../components/landing_page_components/hero_section/hero.section'));
const AboutSectionNotAuth = lazy(() => import('../../components/landing_page_components/about_section/about.section'));
const TestimonialsNotAuth = lazy(() => import('../../components/landing_page_components/testimonials/testimonials'));


const LandingPageNotAuth = () => {
   const [email, setEmail] = useState('');

   return (
      <div className="landing-page">
         <Suspense fallback={<div>Loading Hero...</div>}>
            <HeroSectionNotAuth />
         </Suspense>

         {/* About Sections */}
         <Suspense fallback={<div>Loading About Section...</div>}>
            <AboutSectionNotAuth />
         </Suspense>
         {/* Testimonials */}
         <Suspense fallback={<div>Loading Testimonials...</div>}>
            <TestimonialsNotAuth />
         </Suspense>

         {/* Footer */}
         <footer className="main-footer">
            <Container>
               <Row>
                  <Col md={4} className="footer-brand">
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                     >
                        <h5 className="footer-logo">
                           <FaHandshake className="logo-icon" />
                           Bridge Capital
                        </h5>
                        <p className="footer-tagline">Connecting Innovation with Opportunity</p>
                        <div className="social-icons">
                           {[
                              { icon: <FaLinkedin />, name: "LinkedIn" },
                              { icon: <FaTwitter />, name: "Twitter" },
                              { icon: <FaInstagram />, name: "Instagram" },
                              { icon: <FaYoutube />, name: "YouTube" },
                              { icon: <FaGithub />, name: "GitHub" }
                           ].map((social, index) => (
                              <motion.a
                                 key={index}
                                 href="#"
                                 className="social-link"
                                 whileHover={{ y: -3 }}
                                 whileTap={{ scale: 0.95 }}
                                 aria-label={social.name}
                              >
                                 {social.icon}
                              </motion.a>
                           ))}
                        </div>
                     </motion.div>
                  </Col>

                  <Col md={4} className="footer-links">
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                     >
                        <h6>Quick Navigation</h6>
                        <ul>
                           {[
                              { icon: <FaChartLine />, text: "Investment Opportunities" },
                              { icon: <FaBuilding />, text: "Business Listings" },
                              { icon: <FaFileAlt />, text: "Documentation" },
                              { icon: <FaUserTie />, text: "Careers" },
                              { icon: <FaShieldAlt />, text: "Security" }
                           ].map((link, index) => (
                              <motion.li
                                 key={index}
                                 whileHover={{ x: 5 }}
                                 transition={{ type: "spring", stiffness: 300 }}
                              >
                                 <span className="link-icon">{link.icon}</span>
                                 {link.text}
                              </motion.li>
                           ))}
                        </ul>
                     </motion.div>
                  </Col>

                  <Col md={4} className="footer-legal">
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                     >
                        <h6>Legal & Compliance</h6>
                        <div className="badges">
                           <motion.div
                              className="compliance-badge"
                              whileHover={{ scale: 1.05 }}
                           >
                              <FaRegCheckCircle />
                              <span>GDPR Compliant</span>
                           </motion.div>
                           <motion.div
                              className="compliance-badge"
                              whileHover={{ scale: 1.05 }}
                           >
                              <FaLock />
                              <span>256-bit Encryption</span>
                           </motion.div>
                        </div>
                        <div className="legal-links">
                           <a href="#">Privacy Policy</a>
                           <a href="#">Terms of Service</a>
                           <a href="#">Cookie Settings</a>
                        </div>
                     </motion.div>
                  </Col>
               </Row>

               <motion.div
                  className="footer-bottom"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
               >
                  <div className="partner-logos">
                     {[FaMicrosoft, FaGoogle, FaApple, FaAmazon].map((Icon, index) => (
                        <motion.div
                           key={index}
                           className="partner-icon"
                           whileHover={{ y: -3 }}
                        >
                           <Icon />
                        </motion.div>
                     ))}
                  </div>

                  <p>© 2023 Bridge Capital. All rights reserved</p>

                  <motion.div
                     className="scroll-top"
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                     <FaArrowUp />
                     <span>Top</span>
                  </motion.div>
               </motion.div>
            </Container>
         </footer>
      </div>
   );
};

export default LandingPageNotAuth;
