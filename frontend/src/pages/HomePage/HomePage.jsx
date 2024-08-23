import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AboutUs from "../../components/AboutUs/AboutUs";
import Services from "../../components/Services/Services";
import WhyUs from "../../components/WhyUs/WhyUs";
import Process from "../../components/Process/Process";
import Testimonials from "../../components/Testimonials/Testimonials";
import FAQ from "../../components/FAQ/FAQ";
import MeetOurTeam from "../../components/MeetOurTeam/MeetOurTeam";
import Contact from "../../components/Contact/Contact";
import { Container } from "react-bootstrap";
const HomePage = () => {
  return (
    <div>
      <Header />
      <Container>
        <AboutUs />
        <Services />
        <WhyUs />
        <Process />
        <Testimonials />
        <FAQ />
        <MeetOurTeam />
        <Contact />
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;
