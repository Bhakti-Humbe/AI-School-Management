import React from 'react'
import './navbar.css';
import { Link } from 'react-router-dom';
const navbar = () => {
  return (
   
      <div className="navbar">
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/campus">Campus</Link></li>
        <li><Link to="/admissions">Admissions</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
         </ul>
         <div className="button-group">
            <button className='login-btn'><Link to='/login'><span>Login</span></Link></button>
            <button className='login-btn'><Link to='/register'><span>Register</span></Link></button>
       </div>
      </div>
  )
}

export default navbar
