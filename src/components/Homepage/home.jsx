import React from 'react'
import './home.css'
import homeimg from '../../assets/homeimg.jpg'
import homevideo from '../../assets/homevideo.mp4'
import Achievements from '../Achievements/achievements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
const home = () => {
  return (
    <>
   <div className="home">
    <div className="home-text">
        <h2>Excellence in Education, <span style={{color:'white'}}>Rooted in Values</span></h2>
        <p>Learn. Lead. Inspire.</p>
        <button className='explore-btn'><span>Explore more &#8594;</span></button>
    </div>
     </div>
    <section class="features">
  <div class="feature-box">
    <i class="fas fa-project-diagram"></i>
    <h3>UNVEILING A LEGACY</h3>
  </div>
  <div class="feature-box">
    <i class="fas fa-rocket"></i>
    <h3>BEST FACILITIES</h3>
  </div>
  <div class="feature-box">
    <i class="fas fa-globe"></i>
    <h3>STELLAR PERFORMANCE</h3>
  </div>
  <div class="feature-box">
    <i class="fas fa-feather-alt"></i>
    <h3>INSPIRED BY INNOVATORS</h3>
  </div>
  <div class="feature-box">
    <i class="fas fa-book-open"></i>
    <h3>DIFFERENT COURSES</h3>
  </div>
</section>
<div className="video-container">
      <video width="640" height="360" controls>
        <source src={homevideo} type="video/mp4" />
        
      </video>
      <div className="video-text">
        <h2>Creative Learning Environment</h2>
        <p>
          Our classrooms promote creativity, collaboration, and critical thinking.
          Teachers guide students in hands-on activities that inspire curiosity and fun learning.
        </p>
        <p>
          At our school, we believe in learning through exploration and creativity. Every child is encouraged to express themselves through hands-on activities, art, and group collaboration. 
        </p>
        
      </div>
      <Achievements/> 
      <div class="admission-section">
  <div class="admission-container">
    <div class="admission-image"></div>
    <div class="admission-text">
      <h1> Admissions Open</h1>
      <p>Enroll now for the AY 2025-26. Admissions are open for classes from Nursery to 10th.</p>
      <p> <FontAwesomeIcon icon={faPhone} /> +918265021092</p>
      <button>Apply Now</button>
    </div>
  </div>
</div>





      </div>







  
    
     
    
</>
   
   
  )
}

export default home
