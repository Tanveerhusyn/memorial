import React,{useState,useEffect} from "react";
import "./PlaneFeature.css";
import arrow from "../../../assets/icons/arraw.svg";
import tick from "../../../assets/icons/tick.svg";
import getStripe from "../../../utils/getStripe";
import axios from 'axios'
function PlaneFeature() {
  const [message,setMessage] = useState()

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleSubmit = async (event) => {
     console.log("hi")
 
  };

  return (
    <div className="pf-page">
      <div className="pf-top">
        <h2>PLANS AND FEATURES</h2>
      </div>
      <div className="pf-pricing">
        <div className="pricing-text">
          <p>One Price, Endless Memories</p>
          <p>For Your</p>
          <p className="pfont">loved ones</p>
          <img src={arrow} alt="Arrow" />
        </div>

        <div className="pricing-card">
          <p className="life">Lifetime</p>
          <h2>$49.99</h2>
          <p className="flexible">Most flexible</p>

          <p className="divider"></p>

          <p className="line">
            <img src={tick} alt="Tick" /> <span>Never Expire</span>
          </p>
          <p className="line">
            <img src={tick} alt="Tick" /> <span>Unlimited Photos</span>
          </p>
          <p className="line">
            <img src={tick} alt="Tick" /> <span>Video and Music Gallery</span>
          </p>
          <p className="line">
            <img src={tick} alt="Tick" /> <span>Social Media Integration</span>
          </p>
          <p className="line">
            <img src={tick} alt="Tick" /> <span>Custom Background Music</span>
          </p>
          <p className="line">
            <img src={tick} alt="Tick" /> <span>Advanced Privacy Controls</span>
          </p>
          <p className="line">
            <img src={tick} alt="Tick" /> <span>Additional Administrators</span>
          </p>
          <p className="line">
            <img src={tick} alt="Tick" /> <span>Custom Notifications</span>
          </p>
          <p>{message}</p>
           
          <button className="get-started" onClick={(e)=>handleSubmit(e)}>Get Started</button>

     
        </div>
      </div>
      <div className="pfbottom"></div>
    </div>
  );
}

export default PlaneFeature;
