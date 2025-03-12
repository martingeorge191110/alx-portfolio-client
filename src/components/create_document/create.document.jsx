import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave, FaFilePdf, FaUpload, FaRegFileAlt } from 'react-icons/fa';
import './create_document.css';
import { CreatingDocCompanyApi } from '../../services/company';
import LoadingSpinner from '../loading_spinners/loading';
import { useSelector } from 'react-redux';


const DocumentCreator = ({ onClose, setDocuments, documents, company }) => {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [file, setFile] = useState(null);
   const [isValid, setIsValid] = useState(false);

   const [isSubmitting, setIsSubmitting] = useState(false)

   const token = useSelector(
      state => state.user.token
   )

   useEffect(() => {
      setIsValid(title.trim() && description.trim() && file);
   }, [title, description, file]);

   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile?.type === 'application/pdf') {
         setFile(selectedFile);
      }
   };

   const handleSubmit = async () => {
      if (!isValid) {
         alert('Invalid Data')
      } 
      setIsSubmitting(true)
      const formData = new FormData();
      formData.append("file", file); // Your file object
      formData.append("upload_preset", "PortfolioPreset"); // Required if unsigned upload
      formData.append("resource_type", "raw"); // Important for PDFs

      try {
         const res = await fetch("https://api.cloudinary.com/v1_1/daghpnbz3/upload", {
            method: "POST",
            body: formData,
         });

         if (!res.ok) throw new Error("Upload failed. Check your Cloudinary settings.");

         const data = await res.json();

         if (!data.secure_url) {
            alert("Cloudinary did not return a valid URL.")
            throw new Error("Cloudinary did not return a valid URL.");
         }

         const response = await CreatingDocCompanyApi({token, company_id: company.id, data_body: {title, description, doc_url: data.secure_url}})

         if (response.success) {
            setDocuments([...documents, response.document])
            alert(response.message)
         } else
            alert(response.message)

      } catch (err) {
         alert(err)
      } finally {
         setIsSubmitting(false)
         onClose()
      }
   };

   return (
      <AnimatePresence>
         <motion.div
            initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            animate={{ backdropFilter: 'blur(8px)', opacity: 1 }}
            exit={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            className="document-modal-overlay"
         >
            {isSubmitting ? <LoadingSpinner message='Submitting new Document'/> : ''}
            <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
               transition={{ type: 'spring', stiffness: 300 }}
               className="document-modal"
            >
               <button onClick={() => onClose()} className="close-btn-document">
                  <FaTimes />
               </button>

               <h2 className="modal-title">
                  <FaRegFileAlt className="title-icon" />
                  New Document
               </h2>

               <div className="document-form">
                  <motion.div
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     className="form-group"
                  >
                     <label style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span className="input-icon"><FaFilePdf /></span>
                        <span style={{marginLeft: '2rem'}}>Document Title</span>
                     </label>
                     <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter document title"
                     />
                  </motion.div>

                  <motion.div
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.1 }}
                     className="form-group"
                  >
                     <label>
                        <span className="input-icon"><FaRegFileAlt /></span>
                        <span style={{marginLeft: '2rem'}}>Description</span>
                     </label>
                     <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter document description"
                        rows="4"
                     />
                  </motion.div>

                  <motion.div
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ delay: 0.2 }}
                     className="file-upload"
                  >
                     <input
                        type="file"
                        id="pdf-upload"
                        accept="application/pdf"
                        onChange={handleFileChange}
                     />
                     <label htmlFor="pdf-upload">
                        <FaUpload className="upload-icon" />
                        {file ? (
                           <span className="file-name">{file.name}</span>
                        ) : (
                           <>
                              <span>Upload PDF Document</span>
                              <small>(Max 10MB)</small>
                           </>
                        )}
                     </label>
                  </motion.div>

                  <div className="form-actions">
                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cancel-btn"
                        onClick={onClose}
                     >
                        Cancel
                     </motion.button>
                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="save-btn"
                        onClick={handleSubmit}
                        disabled={!isValid}
                     >
                        <FaSave className="btn-icon" />
                        Save Document
                     </motion.button>
                  </div>
               </div>
            </motion.div>
         </motion.div>
      </AnimatePresence>
   );
};

export default DocumentCreator;
