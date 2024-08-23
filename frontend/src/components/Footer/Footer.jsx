
import FooterCss from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={FooterCss.footer}>
      <div className={FooterCss.footerContent}>
        <p>&copy; 2024 milife. All rights reserved.</p>
        <div className={FooterCss.socialMedia}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className={FooterCss.contactInfo}>
          <p>Email: support@milife.com</p>
          <p>Phone: +1 (234) 567-890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
