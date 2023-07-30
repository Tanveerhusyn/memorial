import React from "react";
import "../about/about.css";
import logo from "../../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

function Cancel() {
    const navigate = useNavigate()
  return (
    <div className="aboutpage">
      <div className="ab-top">
        <img src={logo} />
        <div className="content1">
          <p className="tp">
            Payment Failed
          </p>
          <p className="btm">
            At willalwaysloveu, we provide a shared, easily-accessible
            virtual space where family members and friends can pay homage to a
            special life while helping each other heal by sharing their
            feelings, warm memories, and words of support.
          </p>
          <button className="memobtn" onClick={()=>{
            navigate('/')
          }}>Return to home page</button>
        </div>
      </div>

      <div className="triagnle"></div>
      <div className="ab-bottom">
       </div>
    </div>
  );
}

export default Cancel;
