import React from "react";
import "./MyAccount.css";
import { useUserContext } from "../../../context/MemorialContext";
import { ProgressBar } from "react-loader-spinner";
import dummy from "../../../assets/dummy.jpg";
import Button from "../../components/button/Button";
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from "../../../utils/firebaseConfig";
import {toast} from 'react-toastify'

function MyAccount() {
  const {user,signOut,fetchUser} = useUserContext();
  const [email, setEmail] = React.useState('');
  const [resetEmail, setResetEmail] = React.useState('');
  const [sendPasswordResetEmail, loading, error] = useSendPasswordResetEmail(
    auth
  );

  const notifyError = () => toast.error(error, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const notifySuccess = ()=>toast("Password Reset Email Sent")
  
  const {meta} = user; 
  const [isImgLoading, setIsImageLoading] = React.useState(false)
  const handleDisplayPictureChange = async (event) => {
    const selectedFile = event.target.files[0];
    setIsImageLoading(true)
    // Create a new FormData object to store the selected file
    const formData = new FormData();
    formData.append('displayPicture', selectedFile);
    
    try {
      // Make a request to the backend endpoint to upload the display picture
      const response = await fetch(`http://localhost:5000/api/users/${meta._id}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (response.ok) {
        // Display picture uploaded successfully, you can handle the response as needed
        console.log('Display picture uploaded successfully',response);
        setIsImageLoading(false)
        fetchUser();
         
      } else {
        // Error uploading display picture, handle the error
        console.error('Error uploading display picture:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading display picture:', error);
    }
  };
  const name = user?.displayName?.split(' ') || []
  const fileInputRef = React.useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  const firstName = name[0]
  const lastName = name[1]

  return (
    <div className="myAccountPage">
      <h2>My Account</h2>
      
      <div className="myAccountCard">
        <h2>Personal Information</h2>
        <div className="profile-picture-account" onClick={handleAvatarClick}>
     {
      isImgLoading?  (
<div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'80px'}}>
<ProgressBar
  height="80"
  width="80"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = "#757575"
  barColor = "#757575"
/>
</div>
      ):(
        <>
         <img  src={meta?.displayPicture || dummy}    />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleDisplayPictureChange}
        style={{ display: 'none' }}
      />
        </>
      )
     }
      </div>
        <div className="detailsSection">
          
          <div className="firstLine">
            <div className="singleInput">
              <p>First Name</p>
              <input value={firstName} type="text" placeholder="Marina" />
            </div>
            <div className="singleInput">
              <p>Last Name</p>
              <input value={lastName} type="text" placeholder="D." />
            </div>
          </div>

          <div className="secondLine">
            <p>Email</p>
            <input value={user?.email} type="text" placeholder="marina@gmail.com" />
          </div>
          <div className="thirdLine">
            <h2>Change Password </h2>
            <div className='flex-card'>
           
            <div className="SInputs">
            <div className="singleInput">
                <p>Email:</p>
                <input placeholder="Enter your email" value={resetEmail} type="text" onChange={(e)=>setResetEmail(e.target.value)}/>
              </div>
               
              <div className="singleInput">
              <Button
                isLoading={loading}
               onClick={async () => {
                const success = await sendPasswordResetEmail(
                  resetEmail,
                
                );
                if (success) {
                  alert('Sent email');
                  notifySuccess();
                }
                else{
                  console.log(error)
                  notifyError()
                }
              }}
               text="Reset Password"/>
              </div>
           
              
            </div>
            </div>
          
          </div>

          <button>Save</button>
          <button  onClick={async () => {
          const success = await signOut();
          if (success) {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('formData');
            window.location.href = "/login";
          }
        }}>Log out</button>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
