import React,{useEffect} from "react";
import "../about/about.css";
import logo from "../../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/MemorialContext";

function Success() {
    const navigate = useNavigate()
  const {user} = useUserContext();
  useEffect(() => {
    // Make the backend request to update the hasPaid field
    const updateHasPaid =  () => {
      fetch(`http://localhost:5000/api/users/${user.meta._id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ hasPaid: true }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error updating user');
    }
    return response.json();
  })
  .then((data) => {
    // Handle the response from the backend
    console.log('User updated:', data.user);
    sessionStorage.setItem('user',JSON.stringify({ ...user, meta: { ...data.user } }))


  })
  .catch((error) => {
    // Handle any errors that occur during the request
    console.error('Error updating user:', error);
  });
    };

     // Call the function to update the hasPaid field

     if(user){
      updateHasPaid();
     }

    // Clean up function
    return () => {
      // Perform any cleanup if needed
    };
  }, [user]); 
  return (
    <div className="aboutpage">
      <div className="ab-top">
        <img src={logo} />
        <div className="content1">
          <p className="tp">
            Payment Successful
          </p>
          <p className="btm">
            At RememberedandMissed, we provide a shared, easily-accessible
            virtual space where family members and friends can pay homage to a
            special life while helping each other heal by sharing their
            feelings, warm memories, and words of support.
          </p>
          <button className="memobtn" onClick={()=>{
            // navigate('/creatememorial')
            window.location.href ='/creatememorial'
          }}>Create A Memorial</button>
        </div>
      </div>

      <div className="triagnle"></div>
      <div className="ab-bottom">
       </div>
    </div>
  );
}

export default Success;
