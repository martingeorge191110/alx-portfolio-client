import React from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import './loading.css';

const LoadingSpinner = ({ message = 'Loading companies...' }) => {
   return (
      <div className="loading-overlay">
         <div className="loading-content">
            <FaSpinner className="spinner-icon" />
            <p className="loading-text">{message}</p>
         </div>
      </div>
   );
};

LoadingSpinner.propTypes = {
   message: PropTypes.string
};

export default LoadingSpinner;
