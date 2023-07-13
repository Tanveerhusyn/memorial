import React from "react";
import Vector from "../../../assets/Vector.svg";
import Vector1 from "../../../assets/Vector-1.svg";
import Vector2 from "../../../assets/Vector-2.svg";
import Vector3 from "../../../assets/Vector-3.svg";
import Search from "../../../assets/Search.svg";
import arrow from "../../../assets/icons/arraw.svg";
import "./FindMemorial.css";
import { BsArrowRight } from "react-icons/bs";
const FindMemorial = () => {
  return (
    <div className="grid-container">
      <p className="intro-text">find a memorial</p>
      {/* <div className="grid-row">
        <a className="btn">
          <img src={Vector} />

          <div className="btnContent">
            <p>All Memorials </p>

            <BsArrowRight className="btnIcon" />
          </div>
        </a>
        <a className="btn">
          <img src={Vector1} />
          <div className="btnContent">
            <p>First Responders </p>
            <BsArrowRight className="btnIcon" />
          </div>
        </a>
      </div>
      <div className="grid-row">
        <a className="btn">
          <img src={Vector2} />
          <div className="btnContent">
            <p>Veterans Memorials</p>
            <BsArrowRight className="btnIcon" />
          </div>
        </a>
        <a className="btn">
          <img src={Vector3} />
          <div className="btnContent">
            <p>COVID-19 Memorials</p>
            <BsArrowRight className="btnIcon" />
          </div>
        </a>
      </div> */}
      <div className="grid-row">
        <div className="input-container">
          <input type="text" placeholder="Search .." className="full-width" />
          <img src={Search} />
        </div>
      </div>
    </div>
  );
};

export default FindMemorial;
