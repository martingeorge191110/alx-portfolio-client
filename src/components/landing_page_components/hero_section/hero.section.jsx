import React from "react";
import { motion } from 'framer-motion';
import { FaArrowUp, FaChartLine, FaDollarSign, FaFileContract, FaRegSmile } from "react-icons/fa";
import './hero_section.css'
import { Button } from "react-bootstrap";


const HeroSectionNotAuth = () => {


   return (
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
   )
}

export default HeroSectionNotAuth;
