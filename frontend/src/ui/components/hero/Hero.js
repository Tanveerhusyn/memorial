import React from "react";
import backgroundImage from "../../../assets/herobackground.svg";
import "./hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="hero-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        filter: "brightness(1.3)" // Adjust the brightness value as needed
      }}
    >
      <h1 className="main-text">Preserve and share memories of your</h1>
      <p className="second-para">loved ones</p>
      <p className="third-para">
        Join our compassionate community as we weave together the threads of
        remembrance, sharing stories, photos, and tributes that celebrate the
        legacies that continue to inspire us.
      </p>
      <button className="mBtn">
        <Link to="/creatememorial" className="hero-create">Create a Memorial</Link>
      </button>
    </div>
  );
};

export default Hero;
