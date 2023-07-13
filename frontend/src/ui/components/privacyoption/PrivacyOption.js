import React from "react";
import "./PrivacyOption.css";
import { BsArrowRight } from "react-icons/bs";
import { useUserContext } from "../../../context/MemorialContext";
import { useNavigate } from "react-router-dom";
function PrivacyOption() {
  const {formData, handleChange} = useUserContext()
  const [agree, setAgree] = React.useState(false)
  console.log(agree)
  const navigate = useNavigate()
  return (
    <div className="Seperator">
      <div className="memoLogin-page">
        <div className="memoLogin-pricing privacy">
          <p>
            Would you like to share your memorial with others, or keep it
            private:
          </p>


          <div className="pr-options">
            <div className="singleOPt">
              <input
                type="radio"
                id="visible-only-to-me"
                name="publicVisibility"
                value={false}
                onChange={(e)=>handleChange(e)}

              />
              <label for="visible-only-to-me">Visible only to me</label>
              <p>
                Choose this option if you do not want the memorial to be visible
                to others at this time.
              </p>
            </div>
            <div className="singleOPt">
              <input
                type="radio"
                id="all-visitors"
                name="publicVisibility"
                value={true}
                onChange={(e)=>handleChange(e)}
              />
              <label for="all-visitors">
                All visitors can view and contribute
              </label>
              <p>
                Recommended for most memorials. This option allows easy access
                to the website and facilitates collaboration.{" "}
              </p>
            </div>
          </div>

          <div className="contnu">
            <div className="trms">
              <input
                type="radio"
                id="visible-only-to-me"
                name="visibility"
                value="true"
                onChange={(e)=>setAgree(e.target.value)}
              />
              <label for="visible-only-to-me">
                I agree to <b>Term of use</b>{" "}
              </label>
            </div>
            <button 
            disabled={!agree}
            onClick={()=>{
              console.log(formData)
              navigate('/theme')
            }}>
              Continue to memorial <BsArrowRight className="arro" />
            </button>
          </div>
        </div>
        {/* <div className="pfbottom1sdprivcy1"></div> */}
      </div>
    </div>
  );
}

export default PrivacyOption;
