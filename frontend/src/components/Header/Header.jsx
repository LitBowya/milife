import { Link } from 'react-router-dom';
import HeaderCss from './Header.module.css'

const Header = () => {
  return (
    <section className={HeaderCss.heroSection}>
      <div className={HeaderCss.heroContent}>
        <h1 className={HeaderCss.title}>
          <span>Protect</span> Your Future with <span>milife</span>
        </h1>
        <p className={HeaderCss.subtitle}>
          Comprehensive insurance solutions designed to <span>grow</span> with
          your needs and safeguard your loved ones.
        </p>
        <button className={HeaderCss.ctaButton}>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Start Now
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Header
