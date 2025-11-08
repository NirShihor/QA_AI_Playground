import FeedbackSlideout from '../components/FeedbackSlideout';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="aboutUsPage">
      <h1>About Us</h1>
      <div className="aboutContent">
        <section className="aboutSection">
          <h2>Our Mission</h2>
          <p>
            We are dedicated to providing a comprehensive testing platform for QA AI software.
            Our playgrund offers various interactive features and scenarios to help test and
            validate AI-powered quality assurance tools.
          </p>
        </section>
        <section className="aboutSection">
          <h2>What We Offer</h2>
          <p>
            This platform includes multiple pages with different functionalities including forms,
            drag-and-drop interfaces, shopping experinces, and more. Each feature is designed
            to test different aspects of AI-driven quality assurance.
          </p>
        </section>
        <section className="aboutSection">
          <h2>Contact</h2>
          <p>
            For more information or inquiries, pleas reach out through our contact form
            or visit our main website.
          </p>
        </section>
      </div>
      <FeedbackSlideout />
    </div>
  );
};

export default AboutUs;

