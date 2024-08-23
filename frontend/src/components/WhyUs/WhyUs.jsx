import { FaShieldAlt, FaRegHandshake, FaHeadset } from "react-icons/fa";
import WhyUsCss from "./WhyUs.module.css";

const WhyUs = () => {
  return (
    <section id="whymilife" className={WhyUsCss.whyUs}>
      <h2>Why milife?</h2>
      <div className={WhyUsCss.reasons}>
        <div className={WhyUsCss.reason}>
          <FaShieldAlt className={WhyUsCss.icon} />
          <h3>Trusted Expertise</h3>
          <p>
            Our team of experts has decades of experience in the insurance
            industry, ensuring you receive the best coverage and advice.
          </p>
        </div>
        <div className={WhyUsCss.reason}>
          <FaRegHandshake className={WhyUsCss.icon} />
          <h3>Tailored Solutions</h3>
          <p>
            We offer personalized insurance plans that cater specifically to
            your needs and preferences.
          </p>
        </div>
        <div className={WhyUsCss.reason}>
          <FaHeadset className={WhyUsCss.icon} />
          <h3>24/7 Support</h3>
          <p>
            Our dedicated support team is available around the clock to assist
            with any queries or claims.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
