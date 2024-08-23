import { useState } from "react";
import ProcessCss from "./Process.module.css";
import { FaSignInAlt, FaSearch, FaShoppingCart, FaSmile } from "react-icons/fa";

const Process = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleNavClick = (step) => {
    setActiveStep(step);
  };

  return (
    <section id='process' className={ProcessCss.process}>
      <h2>How milife Works</h2>
      <div className={ProcessCss.processContainer}>
        <div className={ProcessCss.nav}>
          <div
            className={`${ProcessCss.navItem} ${
              activeStep === 1 ? ProcessCss.active : ""
            }`}
            onClick={() => handleNavClick(1)}
          >
            <FaSignInAlt className={ProcessCss.icon} />
          </div>
          <div
            className={`${ProcessCss.navItem} ${
              activeStep === 2 ? ProcessCss.active : ""
            }`}
            onClick={() => handleNavClick(2)}
          >
            <FaSearch className={ProcessCss.icon} />
          </div>
          <div
            className={`${ProcessCss.navItem} ${
              activeStep === 3 ? ProcessCss.active : ""
            }`}
            onClick={() => handleNavClick(3)}
          >
            <FaShoppingCart className={ProcessCss.icon} />
          </div>
          <div
            className={`${ProcessCss.navItem} ${
              activeStep === 4 ? ProcessCss.active : ""
            }`}
            onClick={() => handleNavClick(4)}
          >
            <FaSmile className={ProcessCss.icon} />
          </div>
        </div>
        <div
          className={`${ProcessCss.content} ${
            activeStep === 1 ? ProcessCss.expanded : ""
          }`}
        >
          {activeStep === 1 && (
            <div>
              <h3>Step 1: Login or Create Account</h3>
              <p>
                Easily login or create a new account to access your personalized
                dashboard. By registering with us, you'll gain access to a
                secure and user-friendly platform where you can manage all your
                insurance policies in one place. Keep track of your coverage,
                update your information, and receive important notifications
                about your policies. Whether you're a new customer or a
                returning user, setting up your account is the first step
                towards comprehensive protection and peace of mind.
              </p>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <h3>Step 2: Browse Through Plans</h3>
              <p>
                Explore our comprehensive range of insurance plans to find the
                one that best suits your needs. Whether you're looking to
                protect your vehicle, safeguard your home, or ensure your
                health, our diverse selection of plans offers something for
                everyone. Take your time to compare the different options, read
                through the policy details, and choose a plan that aligns with
                your lifestyle and coverage requirements. Our intuitive platform
                makes it easy to filter and sort plans, so you can quickly find
                the perfect match for your specific needs and budget.
              </p>
            </div>
          )}
          {activeStep === 3 && (
            <div>
              <h3>Step 3: Purchase Plan</h3>
              <p>
                Secure your future by purchasing the plan of your choice with
                just a few clicks. Our seamless and secure payment process
                ensures that you can finalize your policy quickly and
                confidently. Once you've selected your ideal plan, simply follow
                the straightforward steps to complete your purchase. You'll
                receive immediate confirmation and access to all the benefits of
                your chosen coverage, giving you peace of mind knowing that you
                and your assets are protected. Whether it's car, health, or
                house insurance, your safety and security are just a few clicks
                away.
              </p>
            </div>
          )}
          {activeStep === 4 && (
            <div>
              <h3>Step 4: Enjoy Life</h3>
              <p>
                Relax and enjoy life with the peace of mind that you are fully
                protected. With your insurance coverage in place, you can focus
                on what truly matters, knowing that you're safeguarded against
                unexpected events. Whether you're hitting the road, taking care
                of your health, or securing your home, our comprehensive plans
                are designed to provide the ultimate reassurance. Live
                confidently, with the assurance that we've got you covered every
                step of the way. Your well-being and security are our top
                priorities, so you can now embrace life’s adventures with total
                confidence.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Process;
