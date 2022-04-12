import React, {useState, useEffect, useContext} from 'react'
import "./ItemNotify.css"
import userContext from '../../context/users/userContext'
import {Link} from "react-router-dom"
function ItemNotify(props) {

  let context = useContext(userContext);

  const [userProfile, setuserProfile] = useState({})

    const token = localStorage.getItem("auth-token")

  const {content, message, tweetId, userId} = props;
  const {getOthers}  = context;
  const handleUserProfile = async()=>{
    if(!userProfile.name){
        const myResult =  await getOthers(userId, token);
        setuserProfile(myResult.json)
    }
}

useEffect(() => {   
    handleUserProfile();
 }, [])



 const myProfileData = {
   userProfile:userProfile
 }
  return (
    <div className='itemNotify'>
        <div>
       {
         userProfile.profileImg &&  <Link to="/profile"  state={myProfileData}><img src={userProfile.profileImg} alt="user profile twitter.com" className="notify-profileImage"/></Link>
       }
          </div>
        <div className="userName-tweet">
          <div className="userName-container">
            <div className="userName">
              {userProfile.name}
            </div>
            <div className="userId">
            {userProfile.address && userProfile.address.slice(0, 4)}...{userProfile.address && userProfile.address.slice(-5)}
            </div>
          </div>
          <div className="notifi-tweet">
            <div className="notifi-context">
              {message} <span>{tweetId && tweetId.slice(0, 9)}..</span>
            </div>
            <div className="notifiy-content">
              {content}
            </div>
          </div>
        </div>
    </div>
  )
}

export default ItemNotify;