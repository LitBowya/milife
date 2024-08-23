import { useState } from "react";
import ContactUsCss from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState(null); // State to hold error messages
  const [success, setSuccess] = useState(null); // State to hold success messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before submitting
    setSuccess(null); // Reset success state before submitting

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message);
        setFormData({ name: "", email: "", message: "" }); // Clear form on success
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error sending message");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error sending message");
    }
  };

  return (
    <section id="contact" className={ContactUsCss.contact}>
      <h2>Contact Us</h2>
      <p>
        Have questions or need assistance?<br />
        <span>Get in touch with us using the contact form below or reach us at:</span>
      </p>
      <div className={ContactUsCss.contactDetails}>
        <p>Email: support@milife.com</p>
        <p>Phone: +1 (234) 567-890</p>
        <p>Address: 123 Insurance St, City, Country</p>
      </div>
      {error && <p className={ContactUsCss.error}>{error}</p>}
      {success && <p className={ContactUsCss.success}>{success}</p>}
      <form className={ContactUsCss.contactForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="5"
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
