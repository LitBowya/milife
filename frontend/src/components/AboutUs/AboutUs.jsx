
import AboutUsCss from "./AboutUs.module.css";
import image1 from "../../assets/about-image1.jpg";
import image2 from "../../assets/about-image2.jpg";
import image3 from "../../assets/about-image3.jpg";

const AboutUs = () => {
  return (
    <section id="about" className={AboutUsCss.aboutSection}>
      <div className={AboutUsCss.aboutContent}>
        <h2 className={AboutUsCss.sectionTitle}>About milife</h2>
        <p className={AboutUsCss.sectionSubtitle}>
          Our Commitment to Your Peace of Mind
        </p>
        <p className={AboutUsCss.aboutText}>
          At milife, we are dedicated to providing comprehensive insurance
          solutions that safeguard your future and help you live with
          confidence. With years of experience in the industry, our team of
          experts is committed to delivering personalized service and tailored
          coverage options that fit your unique needs.
        </p>
        <p className={AboutUsCss.aboutText}>
          Our mission is to protect what matters most to you—whether it's your
          health, your home, or your vehicle. We believe in building lasting
          relationships with our clients and offering peace of mind through
          reliable and transparent insurance products. Explore our range of
          policies and discover how milife can make a difference in your life
          today.
        </p>
        <div className={AboutUsCss.imagesContainer}>
          <div className={AboutUsCss.imageWrapper}>
            <img src={image1} alt="Our Team" />
          </div>
          <div className={AboutUsCss.imageWrapper}>
            <img src={image2} alt="Client Care" />
          </div>
          <div className={AboutUsCss.imageWrapper}>
            <img src={image3} alt="Insurance Solutions" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
