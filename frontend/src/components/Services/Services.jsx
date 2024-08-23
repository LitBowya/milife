import { FaCar, FaHospital, FaHome } from "react-icons/fa";
import ServicesCss from "./Services.module.css";

const Services = () => {
  return (
    <section id="services" className={ServicesCss.services}>
      <h2 className="mb-5">milfe Services</h2>
      <div className={ServicesCss.serviceCards}>
        <div className={ServicesCss.card}>
          <div className={ServicesCss.iconBox}>
            <FaCar className={ServicesCss.icon} />
          </div>

          <div className={ServicesCss.info}>
            <h3>Car Insurance</h3>
            <p>
              Drive with confidence knowing that your vehicle is protected by
              our comprehensive car insurance plans. Whether you’re looking for
              coverage against accidents, theft, or natural disasters, our
              policies offer extensive protection to keep you and your car
              secure on the road. Enjoy peace of mind with 24/7 support and
              quick claims processing.
            </p>
            <hr />
          </div>
        </div>
        <div className={ServicesCss.card}>
          <div className={ServicesCss.iconBox}>
            <FaHospital className={ServicesCss.icon} />
          </div>

          <div className={ServicesCss.info}>
            <h3>Health Insurance</h3>
            <p>
              Safeguard your well-being with our tailored health insurance
              solutions. Our plans cover a wide range of medical expenses,
              including doctor visits, hospital stays, and prescription
              medications. With access to a network of top healthcare providers
              and support for preventive care, we ensure that you and your
              family receive the best possible medical attention.
            </p>
            <hr />
          </div>
        </div>
        <div className={ServicesCss.card}>
          <div className={ServicesCss.iconBox}>
            <FaHome className={ServicesCss.icon} />
          </div>

          <div className={ServicesCss.info}>
            <h3>House Insurance</h3>
            <p>
              Protect your home and belongings with our reliable house insurance
              policies. Our coverage includes protection against fire, theft,
              and natural calamities, ensuring that your property and
              possessions are safeguarded. Additionally, we offer liability
              coverage to protect you from unexpected legal expenses, providing
              you with complete peace of mind.
            </p>
            <hr />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
