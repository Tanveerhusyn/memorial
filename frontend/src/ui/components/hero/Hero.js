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
        filter: "grayscale(100%)"}}
    >
      <h1 className="main-text">RESERVE AND CHERISH MEMORIES OF YOUR</h1>
      <p className="second-para">loved one</p>
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
