import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import './Admission.css'
const Admission = () => {
  return (
    <div>
        <div class="admi-section">
  <div class="admi-container">
    <div class="admi-image"></div>
    <div class="admi-text">
      <h1> Admissions Open</h1>
      <p>Enroll now for the AY 2025-26. Admissions are open for classes from Nursery to 10th.</p>
      <p> <FontAwesomeIcon icon={faPhone} /> +918265021092</p>
      <button>Apply Now</button>
    </div>
  </div>
</div>

    </div>
  )
}

export default Admission
