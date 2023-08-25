import React from 'react'
import './Share.css'
import { useUserContext } from '../../../context/MemorialContext'
import { Link } from 'react-router-dom';

function Share() {
const {handleChange} = useUserContext();
  return (
    <div className="share-container" >
    <h1 className='share-main-text'>RESERVE AND CHERISH MEMORIES OF YOUR</h1>
    <p className='share-second-para'>loved one</p>
    <div className='share-bottom-section'>
    <p className='share-text'>share memories of</p>
  <div className='action-section'>
    <input name="firstName" className='share-input'  onChange={(e)=>handleChange( e)} placeholder='First Name'/>
    <input name="lastName" className='share-input' placeholder='Last Name' onChange={(e )=>handleChange(e)}/>
   <Link to="/creatememorial">
   <button className='share-mBtn'>Create</button>
   </Link>
  </div>
    </div>
  </div>
  )
}

export default Share