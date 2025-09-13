import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section className="map-section">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.840151632494!2d73.8524533724775!3d18.626258165942705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c7cc80a7ee61%3A0xe7e49bd227d11ccf!2sShriram%20Mandir%20Bhosari!5e0!3m2!1sen!2sin!4v1757143439340!5m2!1sen!2sin"
        width="100%"
        height="550"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Shriram Mandir Location"
      ></iframe>
    </section>
  );
};

export default ContactSection;
