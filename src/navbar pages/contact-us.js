import React from 'react';
import '../style/contactus.css';

function ContactUs() {
  return (
    <div className="contact-bg">
      <div className="contact-overlay">
        <h2>تماس با ما</h2>
        <p>در صورت هرگونه سوال، پیشنهاد یا مشکل با ما در ارتباط باشید.</p>
        <div className="contact-details">
          <p>📞 شماره تماس: ۰۹۱۲۳۴۵۶۷۸۹</p>
          <p>📧 ایمیل: info@fashionstore.ir</p>
          <p>📍 آدرس: تهران، خیابان ولیعصر، پلاک ۱۵۲</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
