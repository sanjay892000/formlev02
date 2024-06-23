import React, { useState } from 'react';
import Modal from './Modal';
import '../styles/jobform.css';

const Jobform = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    interviewTime: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        additionalSkills: checked
          ? [...prevFormData.additionalSkills, value]
          : prevFormData.additionalSkills.filter((skill) => skill !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.fullName) tempErrors.fullName = "Full Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.phoneNumber) {
      tempErrors.phoneNumber = "Phone Number is required";
    } else if (isNaN(formData.phoneNumber)) {
      tempErrors.phoneNumber = "Phone Number must be a valid number";
    }
    if ((formData.position === 'Developer' || formData.position === 'Designer') && !formData.relevantExperience) {
      tempErrors.relevantExperience = "Relevant Experience is required";
    } else if ((formData.position === 'Developer' || formData.position === 'Designer') && formData.relevantExperience <= 0) {
      tempErrors.relevantExperience = "Relevant Experience must be greater than 0";
    }
    if (formData.position === 'Designer' && !formData.portfolioURL) {
      tempErrors.portfolioURL = "Portfolio URL is required";
    } else if (formData.position === 'Designer' && !/^https?:\/\/\S+\.\S+$/.test(formData.portfolioURL)) {
      tempErrors.portfolioURL = "Portfolio URL is invalid";
    }
    if (formData.position === 'Manager' && !formData.managementExperience) {
      tempErrors.managementExperience = "Management Experience is required";
    }
    if (formData.additionalSkills.length === 0) {
      tempErrors.additionalSkills = "At least one skill must be selected";
    }
    if (!formData.interviewTime) {
      tempErrors.interviewTime = "Preferred Interview Time is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1>Job Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>

        <div >
          <label>Applying for Position:</label>
          <select name="position" value={formData.position} onChange={handleChange} >
            <option style={{color:"black"}} value="">Select</option>
            <option style={{color:"black"}} value="Developer">Developer</option>
            <option style={{color:"black"}} value="Designer">Designer</option>
            <option style={{color:"black"}} value="Manager">Manager</option>
          </select>
          {errors.position && <p className="error">{errors.position}</p>}
        </div>

        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <div>
            <label>Relevant Experience (years):</label>
            <input
              type="number"
              name="relevantExperience"
              value={formData.relevantExperience}
              onChange={handleChange}
            />
            {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
          </div>
        )}

        {formData.position === 'Designer' && (
          <div>
            <label>Portfolio URL:</label>
            <input
              type="text"
              name="portfolioURL"
              value={formData.portfolioURL}
              onChange={handleChange}
            />
            {errors.portfolioURL && <p className="error">{errors.portfolioURL}</p>}
          </div>
        )}

        {formData.position === 'Manager' && (
          <div>
            <label>Management Experience:</label>
            <textarea
              name="managementExperience"
              value={formData.managementExperience}
              onChange={handleChange}
            ></textarea>
            {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
          </div>
        )}

        <div>
          <label>Additional Skills:</label>
          <div>
          <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="Python"
                checked={formData.additionalSkills.includes('Python')}
                onChange={handleChange}
              />
              Python
            </label>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="Java"
                checked={formData.additionalSkills.includes('Java')}
                onChange={handleChange}
              />
              Java
            </label>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="HTML5"
                checked={formData.additionalSkills.includes('HTML5')}
                onChange={handleChange}
              />
              HTML5
            </label>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="CSS"
                checked={formData.additionalSkills.includes('CSS')}
                onChange={handleChange}
              />
              CSS3
            </label>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="JavaScript"
                checked={formData.additionalSkills.includes('JavaScript')}
                onChange={handleChange}
              />
              JavaScript
            </label>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="reactjs"
                checked={formData.additionalSkills.includes('reactjs')}
                onChange={handleChange}
              />
              Reactjs
            </label>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="Angularjs"
                checked={formData.additionalSkills.includes('Angularjs')}
                onChange={handleChange}
              />
              Angularjs
            </label>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="Nodejs"
                checked={formData.additionalSkills.includes('Nodejs')}
                onChange={handleChange}
              />
              Nodejs
            </label>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="MongoDB"
                checked={formData.additionalSkills.includes('MongoDB')}
                onChange={handleChange}
              />
              MongoDB
            </label>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="MySQL"
                checked={formData.additionalSkills.includes('MySQL')}
                onChange={handleChange}
              />
              MySQL
            </label>
            
          </div>
          {errors.additionalSkills && <p className="error">{errors.additionalSkills}</p>}
        </div>

        <div>
          <label>Preferred Interview Time:</label>
          <input
            type="datetime-local"
            name="interviewTime"
            value={formData.interviewTime}
            onChange={handleChange}
          />
          {errors.interviewTime && <p className="error">{errors.interviewTime}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      <Modal show={showModal} handleClose={handleCloseModal}>
        <h2>Form Summary</h2>
        <p>Full Name: {formData.fullName}</p>
        <p>Email: {formData.email}</p>
        <p>Phone Number: {formData.phoneNumber}</p>
        <p>Applying for Position: {formData.position}</p>
        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <p>Relevant Experience: {formData.relevantExperience} years</p>
        )}
        {formData.position === 'Designer' && <p>Portfolio URL: {formData.portfolioURL}</p>}
        {formData.position === 'Manager' && <p>Management Experience: {formData.managementExperience}</p>}
        <p>Additional Skills: {formData.additionalSkills.join(', ')}</p>
        <p>Preferred Interview Time: {new Date(formData.interviewTime).toLocaleString()}</p>
      </Modal>
    </div>
  );
};

export default Jobform
