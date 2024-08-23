import { useState } from "react";
import FAQCss from "./FAQ.module.css";

const faqData = [
  {
    question: "What types of insurance do you offer?",
    answer:
      "We offer Car Insurance, Health Insurance, and House Insurance to cover a variety of needs.",
  },
  {
    question: "How can I manage my policy?",
    answer:
      "You can manage your policy through your account dashboard, where you can view your details, make changes, and update your information.",
  },
  {
    question: "How do I file a claim?",
    answer:
      "To file a claim, please contact our support team or visit our 'Claims' section for detailed instructions.",
  },
];

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="faq" className={FAQCss.faq}>
      <h2>FAQ</h2>
      <div className={FAQCss.tabContainer}>
        <nav className={FAQCss.tabNav}>
          {faqData.map((item, index) => (
            <button
              key={index}
              className={`${FAQCss.tab} ${
                activeTab === index ? FAQCss.activeTab : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {item.question}
            </button>
          ))}
        </nav>
        <div className={FAQCss.tabContent}>
          <p>{faqData[activeTab].answer}</p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
