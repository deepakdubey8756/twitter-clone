
import React, {useContext, useState, useEffect} from 'react'
import userContext from '../../context/users/userContext';
import {Link} from "react-router-dom"
import "./UserComponent.css"
import { css } from "@emotion/react";

import { MdVerified } from 'react-icons/md';

import profile2 from "../../assets/images/myBlack.png"

import { ClipLoader } from 'react-spinners';




function UserComponent(props) {
    
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: "#0d97ce";    
  `;


    let context =  useContext(userContext);

     const { unfollowfunc, handleFollowFunc, getOthers } = context;
     const {userId} = props;
     const [userProfile, setUserProfile] = useState({})
    
     const token = localStorage.getItem("auth-token")
  

    useEffect(() => {
        fetchUser(userId)
    }, [])

    
    const [isFollowed, setisFollowed] = useState(false)

    const fetchUser = async(_id) => {
        const response = await  getOthers(_id, token)
        if(response.status === 200){
            setUserProfile(response.json)
        }
     }

     const myProfileData = {
        userProfile:userProfile
     }
     const handleFollow = async () => {
        if (isFollowed === 0) {
            const followStatus = await handleFollowFunc(userId, token)
            if (followStatus === 200) {
                setisFollowed(1);
            }
        }
        else {
            const unfollowStatus = await unfollowfunc(userId, token)
            if (unfollowStatus === 200) {
                setisFollowed(0);
            };
        }
    }
  return (
       <div className='userComponent'>
            {
                userProfile.profileImg ?<div className="recUser">
                <Link to="/profile" state={myProfileData}><img className="recoImage" src={userProfile.profileImg !== "" ? userProfile.profileImg : profile2} alt="recomended Users"></img></Link>
                <Link to="/profile" state={myProfileData} className='recomDetails'>
                    <div className='recomUserName'>
                        {userProfile.name}
                        {
                        userProfile.isVip && <MdVerified color='skyblue'/>
                      } 
                         <span className='recomUserId'> {userProfile.address && userProfile.address.slice(0, 4)}...{userProfile.address && userProfile.address.slice(-4)}</span>
                    </div>
                    <div className='recomUserId'>
                    </div>
                    <div className="recom-aboutUser">
                        {userProfile.aboutUser}
                    </div>
                </Link>
                {
                    isFollowed === 0 ? <div className="recomFollow" onClick={handleFollow}>
                        Follow
                    </div> : <div className="recomFollow" onClick={handleFollow}>
                        Unfollow
                    </div>
                }
            </div>:
             <div className='tweet-loading-Spinner'>
             <ClipLoader color={"#0d97ce"} loading={true} css={override} size={25} />
       </div>
            }
       </div>
  )
}

export default UserComponent


                
                
// <div>
// <Link to="/profile" state={myProfileData} className="recUser">
// <img className="recoImage" src={userProfile.profileImg} alt="recomended Users"></img>
// <div className='recomDetails'>
// <div className='recomUserName'>
//    {userProfile.name}
// </div>
// <div className='recomUserId'>
//    {userProfile.address}
// </div>
// <div className='recomUser-aboutUser'>
//   {userProfile.aboutUser}
// </div>
// </div>
// </Link>

// </div>