import React, { useState } from "react";
import "./Contactus..css";
import arrow from "../../../assets/icons/arraw.svg";
import tick from "../../../assets/icons/tick.svg";
import Button from "../../components/button/Button";
import { toast } from "react-toastify";
 

function Contactus() {
  const [selectedOption, setSelectedOption] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [memorialName, setMemorialName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] =  useState(false)
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    // Create an object with the email details
    const emailData = {
      from:'tanveerhussain465@gmail.com',
      to: 'willalwaysloveutech@gmail.com', // Change this to your backend endpoint
      text: message,
      subject: selectedOption
    };

    // Make an HTTP POST request to your backend endpoint
    fetch(`${backendUrl}/api/contactus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false)
        toast('Email Send successfully')
        // Handle success or error response from the backend
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <div className="cu-page">
      <div className="cu-top">
        <h2>
          Love to hear from you <br></br> get in touch
        </h2>
      </div>
      <div className="cu-content">
        <p>
          Do you have any questions or ideas to improve this website? Please
          email us at <br></br> <b>WillAlwaysLoveUTech@gmail.com</b>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="single-line">
            <div className="single-input">
              <p>Type of Inquiry</p>
              <select
                id="dropdown"
                className="drop"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="">Select</option>
                <option value="General">General Inquiry</option>
                <option value="Technical">Technical Inquiry</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other Inquiry</option>
              </select>
            </div>
            <div className="single-input">
              <p>Your email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="single-line">
            <div className="single-input">
              <p>Your name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="single-input">
              <p>Memorial name (if applies)</p>
              <input
                type="text"
                value={memorialName}
                onChange={(e) => setMemorialName(e.target.value)}
              />
            </div>
          </div>

          <div className="single-line textara">
            <div className="single-input area">
              <p>Message</p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleSubmit} text="Just Send" isLoading={loading}/>
          
        </form>
      </div>
      <div className="cubottom"></div>
    </div>
  );
}

export default Contactus;

