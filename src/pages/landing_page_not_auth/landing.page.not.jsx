import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaHandshake, FaChartLine, FaUsers, FaFileContract, FaRegSmile, FaLinkedin, FaTwitter, FaInstagram, FaArrowUp, FaDollarSign, FaSearchDollar, FaFileInvoiceDollar, FaCommentsDollar, FaShieldAlt, FaArrowRight, FaCoins, FaRocket, FaBullhorn, FaChartArea, FaLock, FaClipboardList, FaCheckCircle, FaQuoteLeft, FaBuilding, FaStar, FaRegCheckCircle, FaUserTie, FaYoutube, FaGithub, FaFileAlt, FaMicrosoft, FaGoogle, FaApple, FaAmazon } from 'react-icons/fa';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import './landing_page_not.css';

const LandingPageNotAuth = () => {
   const [email, setEmail] = useState('');

   // Testimonial data
   const testimonials = [
      {
         name: "Sarah Johnson",
         role: "Angel Investor",
         company: "TechGrowth Ventures",
         rating: 5,
         investment: "$500K",
         roi: "45% ROI",
         img: "https://randomuser.me/api/portraits/women/44.jpg",
         text: "This platform transformed how I discover and evaluate startups. The detailed financial projections and founder verification system helped me make my best investment decision yet!",
         achievements: [
            "3 successful exits",
            "2022 Top Investor Award",
            "Portfolio 35% YOY growth"
         ],
         connections: "5K+"
      },
      {
         name: "Michael Chen",
         role: "Startup Founder",
         company: "EcoTech Solutions",
         rating: 4,
         investment: "$1.2M raised",
         roi: "300% growth",
         img: "https://randomuser.me/api/portraits/men/81.jpg",
         text: "Through Bridge Capital, we connected with strategic investors who truly understood our vision. The document management system made due diligence effortless!",
         achievements: [
            "Featured in Forbes 30 Under 30",
            "2023 Green Tech Award",
            "150% employee growth"
         ],
         connections: "2.5K+"
      },
      {
         name: "Emma Wilson",
         role: "VC Partner",
         company: "Global Ventures Fund",
         rating: 5,
         investment: "$8M deployed",
         roi: "22% average IRR",
         img: "https://randomuser.me/api/portraits/women/68.jpg",
         text: "The quality of deal flow and depth of analytics here surpasses traditional channels. We've added 3 promising startups to our portfolio through this platform.",
         achievements: [
            "$100M AUM",
            "15 portfolio companies",
            "Series A focus"
         ],
         connections: "10K+"
      }
   ];

   return (
      <div className="landing-page">
         <section className="hero-section">
            <div className="animated-background">
               {/* Floating Elements */}
               <motion.div
                  className="floating-element coin-1"
                  initial={{ y: 0, rotate: 0 }}
                  animate={{ y: [-20, 20, -20], rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               >
                  <FaDollarSign size={40} />
               </motion.div>

               <motion.div
                  className="floating-element graph-1"
                  initial={{ x: 0 }}
                  animate={{ x: [-50, 50, -50] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
               >
                  <FaChartLine size={50} />
               </motion.div>

               {/* Animated Connection Lines */}
               <div className="connection-lines">
                  <motion.div
                     className="line"
                     initial={{ scaleX: 0 }}
                     animate={{ scaleX: 1 }}
                     transition={{ duration: 2, delay: 0.5 }}
                  />
                  <motion.div
                     className="line"
                     initial={{ scaleX: 0 }}
                     animate={{ scaleX: 1 }}
                     transition={{ duration: 2, delay: 0.8 }}
                  />
               </div>

               {/* Gradient Overlay */}
               <div className="gradient-overlay" />
            </div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="hero-content"
            >
               {/* Animated Title */}
               <motion.h1
                  initial={{ letterSpacing: '2rem', opacity: 0 }}
                  animate={{ letterSpacing: '0.5rem', opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
               >
                  Bridge Capital Network
               </motion.h1>

               {/* Animated Subtitle with Particles */}
               <motion.div className="subtitle-container">
                  <p className="lead">
                     Where <span className="highlight">Innovation</span> Meets
                     <span className="highlight"> Investment</span>
                  </p>
                  <div className="animated-particles">
                     {[...Array(8)].map((_, i) => (
                        <motion.span
                           key={i}
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           transition={{
                              duration: 0.5,
                              delay: i * 0.1,
                              repeat: Infinity,
                              repeatType: 'reverse'
                           }}
                        />
                     ))}
                  </div>
               </motion.div>

               {/* Feature List */}
               <motion.div
                  className="feature-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
               >
                  {['Real-time Analytics', 'Secure Deals', 'Global Network', 'Verified Profiles'].map((text, i) => (
                     <motion.div
                        key={text}
                        className="feature-item"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                     >
                        <div className="feature-icon">
                           {i % 2 === 0 ? <FaFileContract /> : <FaRegSmile />}
                        </div>
                        <span>{text}</span>
                     </motion.div>
                  ))}
               </motion.div>

               {/* CTA Section */}
               <motion.div
                  className="cta-container"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
               >
                  <Button size="lg" className="cta-button">
                     Start Connecting Now
                     <motion.span
                        className="arrow"
                        animate={{ x: [-5, 5, -5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                     >
                        <FaArrowUp className="rotate-45" />
                     </motion.span>
                  </Button>
                  <p className="cta-subtext">
                     Join 5,000+ businesses and investors already growing together
                  </p>
               </motion.div>

               {/* Floating Preview Images */}
               <div className="hero-preview-images">
                  <motion.img
                     src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
                     alt="Dashboard preview"
                     initial={{ y: 0, rotate: -5 }}
                     animate={{ y: 20, rotate: 5 }}
                     transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror' }}
                  />
                  <motion.img
                     src="https://images.unsplash.com/photo-1556740714-a8395b3bf30f"
                     alt="Mobile app preview"
                     initial={{ y: 20, rotate: 5 }}
                     animate={{ y: 0, rotate: -5 }}
                     transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror' }}
                  />
               </div>
            </motion.div>
         </section>

         {/* About Sections */}
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

         {/* Testimonials */}
         <section className="testimonials">
            <Container>
               <motion.h2
                  className="section-title"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
               >
                  Success Stories
                  <motion.div
                     className="title-decoration"
                     initial={{ scaleX: 0 }}
                     whileInView={{ scaleX: 1 }}
                     transition={{ duration: 1 }}
                  />
               </motion.h2>

               <Row className="g-4">
                  {testimonials.map((testimonial, index) => (
                     <Col md={4} key={index}>
                        <motion.div
                           initial={{ scale: 0.9, opacity: 0, rotateY: 30 }}
                           whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ delay: index * 0.1 }}
                           className="testimonial-card"
                           whileHover={{ y: -10 }}
                        >
                           <div className="card-inner">
                              {/* Card Front */}
                              <div className="card-front">
                                 <div className="testimonial-header">
                                    <motion.img
                                       src={testimonial.img}
                                       alt={testimonial.name}
                                       whileHover={{ scale: 1.1 }}
                                    />
                                    <div className="header-info">
                                       <h5>{testimonial.name}</h5>
                                       <small>{testimonial.role}</small>
                                       <div className="company-info">
                                          <FaBuilding className="company-icon" />
                                          <span>{testimonial.company}</span>
                                       </div>
                                       <div className="rating">
                                          {[...Array(5)].map((_, i) => (
                                             <FaStar key={i} className={i < testimonial.rating ? 'filled' : ''} />
                                          ))}
                                       </div>
                                    </div>
                                 </div>

                                 <motion.div
                                    className="quote-icon"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                 >
                                    <FaQuoteLeft />
                                 </motion.div>

                                 <p>"{testimonial.text}"</p>

                                 <div className="testimonial-meta">
                                    <div className="meta-item">
                                       <FaDollarSign />
                                       <span>Invested: {testimonial.investment}</span>
                                    </div>
                                    <div className="meta-item">
                                       <FaChartLine />
                                       <span>ROI: {testimonial.roi}</span>
                                    </div>
                                 </div>
                              </div>

                              {/* Card Back */}
                              <div className="card-back">
                                 <div className="achievements">
                                    <h6>Key Achievements</h6>
                                    <ul>
                                       {testimonial.achievements.map((achievement, i) => (
                                          <li key={i}>
                                             <FaCheckCircle />
                                             {achievement}
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                                 <div className="social-proof">
                                    <FaLinkedin />
                                    <span>{testimonial.connections} connections</span>
                                 </div>
                              </div>
                           </div>

                           <div className="card-decoration">
                              <div className="glow-effect" />
                              <div className="animated-border" />
                           </div>
                        </motion.div>
                     </Col>
                  ))}
               </Row>

               {/* Testimonial Navigation */}
               <motion.div
                  className="testimonial-nav"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
               >
                  {[...Array(3)].map((_, i) => (
                     <motion.div
                        key={i}
                        className="nav-dot"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, delay: i * 0.2 }}
                     />
                  ))}
               </motion.div>
            </Container>
         </section>

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
