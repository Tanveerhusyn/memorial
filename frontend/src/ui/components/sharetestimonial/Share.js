import React from 'react'
import './Share.css'
import { useUserContext } from '../../../context/MemorialContext'
import { Link, useNavigate } from 'react-router-dom';
 import LovedOne from '../lovedone/LovedOne';
 import MemoLogin from '../creatememo_login/MemoLogin';
 import ChoosePlane from '../creatememo_chooseplane/ChoosePlane';
 import PrivacyOption from '../privacyoption/PrivacyOption';
function Share() {
const {handleChange, setOptions,user,setShowOption} = useUserContext();
const navigate = useNavigate();
  return (
    <div className="share-container" >
    <h1 className='share-main-text'>RESERVE AND CHERISH MEMORIES OF YOUR</h1>
    <p className='share-second-para'>loved one</p>
    <div className='share-bottom-section'>
    <p className='share-text'>share memories of</p>
  <div className='action-section'>
    <input name="firstName" className='share-input'  onChange={(e)=>handleChange( e)} placeholder='First Name'/>
    <input name="lastName" className='share-input' placeholder='Last Name' onChange={(e )=>handleChange(e)}/>
 
   <button onClick={()=>{
     setOptions([
      {
        title: "About your loved one",
        isCompleted: false,
        isActive: true,
        show: true,
        component: <LovedOne title="About your loved one" /> || "",
      },
      {
        title: "Account details",
        isCompleted: false,
        isActive: false,
        show: !user,
        component: <MemoLogin title="Account details" />,
      },
      {
        title: "Choose your plan",
        isCompleted: false,
        isActive: false,
        show: user?.meta.hasPaid ? false : true || true,
        component: <ChoosePlane title="Choose your plan" />,
      },
      {
        title: "Privacy options",
        isCompleted: false,
        isActive: false,
        show: true,
        component: <PrivacyOption title="Privacy options" />,
      },
    ]);
    setShowOption( {
      title: "About your loved one",
      isCompleted: false,
      isActive: true,
      show: true,
      component: <LovedOne title="About your loved one" /> || "",
    },);

    navigate('/creatememorial')
   }}  className='share-mBtn'>Create</button>
   
  </div>
    </div>
  </div>
  )
}

export default Share