import "../styles/Contact.css";

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            Have questions about our Smart Business Management System? We'd love
            to hear from you.
          </p>

          <h4>📍 Address</h4>
          <p>Kathmandu, Nepal</p>

          <h4>📧 Email</h4>
          <p>smartbusiness@gmail.com</p>

          <h4>📞 Phone</h4>
          <p>+977-9800000000</p>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
