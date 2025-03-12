import React from "react";
import { motion, useInView } from 'framer-motion';
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaBuilding, FaChartLine, FaCheckCircle, FaDollarSign, FaLinkedin, FaQuoteLeft, FaStar } from "react-icons/fa";
import './testimonials.css'

const TestimonialsNotAuth = () => {

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
   )
}

export default TestimonialsNotAuth;
