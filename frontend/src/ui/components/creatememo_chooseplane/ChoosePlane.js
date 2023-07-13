import React,{useState,useEffect} from "react";
import "./ChoosePlane.css";
import arrow from "../../../assets/icons/arraw.svg";
import tick from "../../../assets/icons/tick.svg";
import axios from 'axios'
import { ThreeDots } from "react-loader-spinner";
import { useUserContext } from "../../../context/MemorialContext";
function ChoosePlane() {
  const [message,setMessage] = useState()
const[loading,setLoading] = useState(false)
const {delayedTrigger} = useUserContext();
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
    event.preventDefault();
    console.log('Hello')
    try {
      const response = await axios.post('http://localhost:5000/api/create-checkout-session');
      // Handle the response from the backend
      console.log(response.data);
      if(response.data.url){
        window.location.href = response.data.url
        setLoading(false)
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  return (
    <div className="memoLogin-page">
      <div className="memoLogin-pricing1">
        <div className="pricing-text">
          <p>One Price, Endless Memories</p>
          <p>For Your</p>
          <p className="pfont">loved ones</p>
          {/* <img src={arrow} /> */}
        </div>

        <div className="memopricing-card1">
          <p className="life">Lifetime</p>
          <h2>$49.99</h2>
          <p className="flexible">Most flexible</p>

          <p className="divider"></p>

          <div className="memoLinesDiv">
            <p className="memoline">
              <img src={tick} /> <spand>Never Expire</spand>
            </p>
            <p className="memoline">
              <img src={tick} /> <spand>Unlimited Photos</spand>
            </p>
            <p className="memoline">
              <img src={tick} /> <spand>Video and Music Gallery</spand>
            </p>
            <p className="memoline">
              <img src={tick} /> <spand>Social Media Integration</spand>
            </p>
            <p className="memoline">
              <img src={tick} /> <spand>Custom Background Music</spand>
            </p>
            <p className="memoline">
              <img src={tick} /> <spand>Advanced Privacy Controls</spand>
            </p>
            <p className="memoline">
              <img src={tick} /> <spand>Additional Administrators</spand>
            </p>
            <p className="memoline">
              <img src={tick} /> <spand>Custom Notifications</spand>
            </p>
            <p>{message}</p>
            <button className="memoget-started" onClick={(e)=>{
              setLoading(true)
              delayedTrigger(()=>{
                handleSubmit(e)
               

              })
            }}>

{loading ? (
            <ThreeDots
              height="50"
              width="50"
              radius="9"
              color="#fff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Get started"
          )}
            </button>
          </div>
        </div>
      </div>
      <div className="pfbottom1" ></div>
    </div>
  );
}

export default ChoosePlane;
