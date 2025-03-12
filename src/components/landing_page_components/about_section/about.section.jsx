import React from "react";
import { motion, useInView } from 'framer-motion';
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaArrowRight, FaBullhorn, FaChartArea, FaChartLine, FaClipboardList, FaCoins, FaCommentsDollar, FaFileInvoiceDollar, FaHandshake, FaLock, FaRocket, FaSearchDollar, FaShieldAlt, FaUsers } from "react-icons/fa";
import './about_section.css';


const AboutSectionNotAuth = () => {

   return (
      <section className="about-section">
         <Container>
            {/* Investors Section */}
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               className="investor-card"
            >
               <div className="decorative-line"></div>
               <Row className="align-items-center">
                  <Col md={6}>
                     <motion.div
                        className="icon-container"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                     >
                        <FaChartLine size={40} />
                     </motion.div>

                     <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                     >
                        For <span className="gradient-text">Investors</span>
                     </motion.h2>

                     <ul className="benefits-list">
                        {[
                           { icon: <FaSearchDollar />, text: "Premium access to vetted investment opportunities" },
                           { icon: <FaFileInvoiceDollar />, text: "Detailed financial analytics & growth projections" },
                           { icon: <FaCommentsDollar />, text: "Direct communication with business owners" },
                           { icon: <FaShieldAlt />, text: "Document verification system" }
                        ].map((item, index) => (
                           <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                           >
                              <span className="benefit-icon">{item.icon}</span>
                              {item.text}
                              <motion.div
                                 className="hover-line"
                                 initial={{ scaleX: 0 }}
                                 whileHover={{ scaleX: 1 }}
                              />
                           </motion.li>
                        ))}
                     </ul>

                     <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="button-container"
                     >
                        <Button variant="outline-primary" className="glow-button">
                           Explore Investments <FaArrowRight className="button-icon" />
                        </Button>
                     </motion.div>
                  </Col>

                  <Col md={6}>
                     <motion.div
                        className="image-container"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                     >
                        <img
                           src="https://images.unsplash.com/photo-1554224155-3a58922a22c3"
                           alt="Investor dashboard preview"
                           className="section-image floating-image"
                        />
                        <div className="image-overlay">
                           <div className="stats-card">
                              <FaChartLine />
                              <h5>+45% ROI</h5>
                              <small>Average Return</small>
                           </div>
                           <div className="stats-card">
                              <FaCoins />
                              <h5>$2.4B+</h5>
                              <small>Total Investments</small>
                           </div>
                        </div>
                     </motion.div>
                  </Col>
               </Row>
            </motion.div>

            {/* Business Section */}
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               className="business-card"
            >
               <Row className="align-items-center">
                  <Col md={6}>
                     <motion.div
                        className="image-container"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                     >
                        <img
                           src="https://images.unsplash.com/photo-1556740714-a8395b3bf30f"
                           alt="Business dashboard preview"
                           className="section-image floating-image"
                        />
                        <div className="image-overlay">
                           <div className="stats-card">
                              <FaRocket />
                              <h5>1.2k+</h5>
                              <small>Startups Funded</small>
                           </div>
                           <div className="stats-card">
                              <FaHandshake />
                              <h5>98%</h5>
                              <small>Success Rate</small>
                           </div>
                        </div>
                     </motion.div>
                  </Col>

                  <Col md={6}>
                     <motion.div
                        className="icon-container"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                     >
                        <FaUsers size={40} />
                     </motion.div>

                     <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                     >
                        For <span className="gradient-text">Business Owners</span>
                     </motion.h2>

                     <ul className="benefits-list">
                        {[
                           { icon: <FaBullhorn />, text: "Showcase to qualified investors" },
                           { icon: <FaChartArea />, text: "Interactive growth charts" },
                           { icon: <FaLock />, text: "Secure document sharing" },
                           { icon: <FaClipboardList />, text: "Investment tracking dashboard" }
                        ].map((item, index) => (
                           <motion.li
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                           >
                              <span className="benefit-icon">{item.icon}</span>
                              {item.text}
                              <motion.div
                                 className="hover-line"
                                 initial={{ scaleX: 0 }}
                                 whileHover={{ scaleX: 1 }}
                              />
                           </motion.li>
                        ))}
                     </ul>

                     <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="button-container"
                     >
                        <Button variant="outline-success" className="glow-button">
                           List Your Business <FaArrowRight className="button-icon" />
                        </Button>
                     </motion.div>
                  </Col>
               </Row>
            </motion.div>
         </Container>
      </section>

   )
}

export default AboutSectionNotAuth;
