import React from "react";
import img1 from "../../../assets/img1.svg";
import img2 from "../../../assets/img2.svg";
import img3 from "../../../assets/img3.svg";
import img4 from "../../../assets/img4.svg";
import img5 from "../../../assets/img5.svg";
import img6 from "../../../assets/img6.svg";
import Ipad from "../../../assets/ipad.png";
import "./Features.css";
const Features = () => {
  return (
    <div className="features-grid-container">
      <p className="features_heading">Remember Forever, Share the Missed</p>
      <div className="content">
        <div className="features-grid-left">
         
         
          <div className="feature-grid-row">

            <div className="feature-card">
              <img src={img1} />

              <div className="feature-text-container">
                <p className="feature-heading">Background Music</p>
                <p className="feature-desc">
                  Set the emotional tone with meaningful background music.
                </p>
              </div>
            </div>


            <div className="feature-card">
              <img src={img2} />

              <div className="feature-text-container">
                <p className="feature-heading">Add Media</p>
                <p className="feature-desc">
                  Set the emotional tone with meaningful background music.
                </p>
              </div>
            </div>
          </div>

          
          <div className="feature-grid-row">
            <div className="feature-card">
              <img src={img3} />

              <div className="feature-text-container">
                <p className="feature-heading">45+ Themes</p>
                <p className="feature-desc">
                  Set the emotional tone with meaningful background music.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <img src={img4} />

              <div className="feature-text-container">
                <p className="feature-heading">Manage Visitors</p>
                <p className="feature-desc">
                  Set the emotional tone with meaningful background music.
                </p>
              </div>
            </div>
          </div>
          <div className="feature-grid-row">
            <div className="feature-card">
              <img src={img5} />

              <div className="feature-text-container">
                <p className="feature-heading">Send Tributes</p>
                <p className="feature-desc">
                  Express your love, gratitude, and heartfelt tributes by
                  messages
                </p>
              </div>
            </div>
            <div className="feature-card">
              <img src={img6} />

              <div className="feature-text-container">
                <p className="feature-heading">Share Moments</p>
                <p className="feature-desc">
                  Share the extraordinary life stories of your beloved ones
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="features-grid-right">
          <img className="ipad_img" src={Ipad} />
        </div>
      </div>
    </div>
  );
};

export default Features;
