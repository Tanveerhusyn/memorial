import React, { useState, useEffect } from "react";

import "./Mymemorial.css";
import avatart from "../../../assets/icons/avatart.svg";
import { RiDeleteBinLine } from "react-icons/ri";
import dummy from "../../../assets/dummy.jpg";

import { useUserContext } from "../../../context/MemorialContext";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
function Mymemorial() {
  const {user,fetchUser,handleChange} = useUserContext();
  const [memorials, setMemorials] = useState([]);
  const { meta } = user;
  const userId = meta._id;
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleDelete = async(id) =>{
    try {
       
      const response = await fetch(`${backendUrl}/api/memorials/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Deleted Successfully:', data);
    
  
        fetchMemorials()
      } else {
        console.error('Failed to add tribute:', response.statusText);
        // Handle the error case
      }
    } catch (error) {
      console.error('Error adding tribute:', error);
      // Handle the error case
    }
   }
   const fetchMemorials = async () => {
     

    try {
      const response = await fetch(`${backendUrl}/api/memorials/user/${userId}/memorials`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Memorials",data.memorials)
        setMemorials(data.memorials);
      } else {
        // Handle error case
        console.error("Failed to fetch memorials");
      }
    } catch (error) {
      // Handle error case
      console.error("Error fetching memorials:", error);
    }
  };
console.log(user)
  useEffect(() => {
 

    fetchMemorials();
  }, [userId]);
  return (
    <div className="memorialPage">
      <h2>My Memorials</h2>

      <div className="memorialCard">
        <h2>Create a memorial</h2>
        <div className="firstlineInputs">
          <input name="firstName" onChange={(e)=>handleChange(e)} className="f_input" type="text" placeholder="First Name" />
          <input name="lastName" onChange={(e)=>handleChange(e)} className="f_input" type="text" placeholder="Last Name" />
          <Link to="/creatememorial">
          <Button text="Create"/>
          </Link>
        </div>
        <h2>MY memorials</h2>
        {memorials.map((memorial) => (
            <div className="secondLine">
            <div className="innerCard">
              <div className="left">
                <div className="avatart">
                  <img src={memorial.displayPicture || dummy} />
                </div>
                <div className="nameEmail">
                  <span>{memorial.firstName}</span>
  
                  <p>{memorial.webAddress}</p>
                </div>
              </div>
              <div className="memoButtons">
                 
                <button onClick={()=>handleDelete(memorial._id)} className="delBtn">
                  <RiDeleteBinLine />
                  Delete Memorial
                </button>
              </div>
            </div>
          </div>
        ))}
      
      </div>
    </div>
  );
}

export default Mymemorial;
