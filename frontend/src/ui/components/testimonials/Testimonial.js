import React, { useState } from "react";
import "./Testimonial.css";

const testimonialsData = [
  {
    author: "Veronica Schade",
    text: "Thank you - love the Father’s Day themes! So happy to see more options! Will send any ideas I come up with! This website has been my healing. I come to my dads site and meet with him in my mind. Going through our memories together, whenever I want. I tell everyone about your great website! Ty!!",
  },
  {
    author: "Cherry Fouts",
    text: "I'm glad to have found your website and thank you for offering a free plan, I really appreciate it. It's nice to have an online memorial like this where people who can't come to the funeral in person can leave their tribute online. We really appreciate you for building this website. From my family and I, thank you! God bless you more.",
  },
  {
    author: "John Wick",
    text: "Thank you - love the Father’s Day themes! So happy to see more options! Will send any ideas I come up with! This website has been my healing. I come to my dads site and meet with him in my mind. Going through our memories together, whenever I want. I tell everyone about your great website! Ty!!",
  },
  {
    author: "Daniel",
    text: "Thank you - love the Father’s Day themes! So happy to see more options! Will send any ideas I come up with! This website has been my healing. I come to my dads site and meet with him in my mind. Going through our memories together, whenever I want. I tell everyone about your great website! Ty!!",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };
  const testimonialContainerStyle = {
    display: "flex",
    flexDirection: "row",
    transition: "transform 0.3s ease",
    // transform: `translateX(calc(-${currentIndex} * (100% / ${testimonialsData.length+2})))`,
    justifyContent: "space-between",
  };

  return (
    <div className="testimonials-container">
      <h2 className="testimonials-heading">Testimonials</h2>
      <div className="testimonials-slider">
        <button
          className="arrow-button previous-button"
          onClick={handlePrevious}
        >
          &lt;
        </button>
        <div
          className="testimonials-slide-container"
          style={testimonialContainerStyle}
        >
          {testimonialsData.map((item, idx) => (
            <div
              className={`testimonial ${currentIndex == idx ? "active" : ""}`}
              key={idx}
            >
              <svg
                width="47"
                height="37"
                viewBox="0 0 47 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.67132 5.21996C7.8421 1.7825 12.6401 0.0400391 18.9297 0.0400391H21.1897V6.41098L19.3726 6.77484C16.2764 7.39408 14.1226 8.61222 12.97 10.3999C12.3686 11.3629 12.0276 12.4656 11.9802 13.6H18.9297C19.529 13.6 20.1039 13.8381 20.5277 14.262C20.9516 14.6858 21.1897 15.2606 21.1897 15.86V31.68C21.1897 34.1728 19.1624 36.2 16.6697 36.2H3.10966C2.51027 36.2 1.93543 35.9619 1.5116 35.5381C1.08777 35.1143 0.84966 34.5394 0.84966 33.94V22.64L0.85644 16.0431C0.8361 15.7922 0.4067 9.84844 4.67132 5.21996ZM41.5297 36.2H27.9697C27.3703 36.2 26.7954 35.9619 26.3716 35.5381C25.9478 35.1143 25.7097 34.5394 25.7097 33.94V22.64L25.7164 16.0431C25.6961 15.7922 25.2667 9.84844 29.5313 5.21996C32.7021 1.7825 37.5001 0.0400391 43.7897 0.0400391H46.0497V6.41098L44.2326 6.77484C41.1364 7.39408 38.9826 8.61222 37.83 10.3999C37.2286 11.3629 36.8876 12.4656 36.8402 13.6H43.7897C44.389 13.6 44.9639 13.8381 45.3877 14.262C45.8116 14.6858 46.0497 15.2606 46.0497 15.86V31.68C46.0497 34.1728 44.0224 36.2 41.5297 36.2Z"
                  fill="white"
                  fillOpacity="0.25"
                />
              </svg>
              <p className="testimonials-slide">{item.text}</p>
              <p style={{ color: "white" }} className="testimonials-author">
                {item.author}
              </p>
            </div>
          ))}
        </div>
        <button className="arrow-button next-button" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
