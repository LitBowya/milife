import { useState } from "react";
import TestimonialCss from "./Testimonials.module.css";

const testimonials = [
  {
    name: "Jane Doe",
    text: "milife provided excellent coverage and customer service. Highly recommend!",
    image: "path-to-jane-image.jpg",
  },
  {
    name: "John Smith",
    text: "The process was smooth and the insurance plans were just what I needed. Great experience!",
    image: "path-to-john-image.jpg",
  },
  {
    name: "Emily Johnson",
    text: "Professional and reliable. I feel secure with milife protecting my family.",
    image: "path-to-emily-image.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id='testimonials' className={TestimonialCss.testimonials}>
      <h2>What They Say About milife</h2>
      <div className={TestimonialCss.carouselWrapper}>
        <div className={TestimonialCss.testimonialContainer}>
          <div className={TestimonialCss.cardWrapper}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${TestimonialCss.card} ${
                  currentIndex === index ? TestimonialCss.active : ""
                }`}
              >
                <p>{testimonial.text}</p>
                <div className={TestimonialCss.down}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className={TestimonialCss.image}
                  />

                  <h4>{testimonial.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className={TestimonialCss.prevButton} onClick={handlePrev}>
          &lt;
        </button>
        <button className={TestimonialCss.nextButton} onClick={handleNext}>
          &gt;
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
