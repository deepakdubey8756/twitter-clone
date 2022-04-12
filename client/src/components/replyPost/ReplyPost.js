
import React, { useState, useEffect, useContext } from 'react';

import {useNavigate} from "react-router-dom";


import { AiOutlineHeart, AiOutlineDelete, AiOutlineAliwangwang, AiOutlineRetweet, AiOutlineUpload, AiOutlineBarChart } from "react-icons/ai"


import "./ReplyPost.css"

import userContext from '../../context/users/userContext';

import {Link} from "react-router-dom"



function ReplyPost(props) {
    const context = useContext(userContext);
    let navigate = useNavigate();

    const {getOthers, setClickedTweet, myProfile, handleDelteReply, } = context;

    const {tweetImage, tweetContent, userId, tweetId, totalReply, setTotalReply,  handleTweetReplies} = props;


    const token = localStorage.getItem("auth-token")

    
    const [userProfile, setuserProfile] = useState({})




  const handleDeletefunc = async() => {
      alert("You are going to delted your reply")
      const response = await handleDelteReply(tweetId, token)
      if (response.status === 200){
          alert("Your reply has been deleted")
      }
      if(totalReply){
        setTotalReply(totalReply - 1);
      }
      handleTweetReplies();
      
  }

  

  const handleProfileClicked = () => {
      setClickedTweet(props);
      navigate("/profile");
  }


  const handleUserSetting = async() => {
    if(!userProfile.name){
        const myResult =  await getOthers(userId, token);
        setuserProfile(myResult.json)
    }
  }

 
  

    useEffect(() => {   
        handleUserSetting();
     }, [])
 
    
    const handleUnusedClick = () => {
        alert("This functionality is not availble yet")
    }

    const myProfileData = {
        userProfile:userProfile
    }
    
   if(userProfile.profileImg){
    return <div className="replies-tweetPost-container">
    <Link to="/profile" state={myProfileData}><img src={userProfile.profileImg} alt="user profile" onClick={handleProfileClicked} className="replies-image" /></Link>
    <div className="replies-post">
        <Link to="/profile" state={myProfileData} className="reply-user-name" onClick={handleProfileClicked}>
            {userProfile.name} <span className="userId"> {userProfile.address && userProfile.address.slice(0, 4)}...{userProfile.address && userProfile.address.slice(-5)}</span>
        </Link>
        
        <div className="reply-post-content">
            {tweetContent}
        </div>
        {tweetImage && <img src={tweetImage} alt="user-tweet" />}
        <div className="reply-options">
            <div>
            <AiOutlineAliwangwang className="tweet-option" onClick={ handleUnusedClick}/>
            </div>
            <div >
            <AiOutlineRetweet className="tweet-option" onClick={handleUnusedClick}/>
            </div>
            <div>
                <AiOutlineHeart onClick={handleUnusedClick} className="tweet-option"/>
            </div>
            <div onClick={ handleUnusedClick }>
            <AiOutlineUpload className="tweet-option" />
            </div>
            <div onClick={handleUnusedClick}>
            <AiOutlineBarChart className="tweet-option" />
            </div>
        </div>
    </div>
    {
        myProfile._id === userId && <div className="rest-options" onClick={handleDeletefunc}>
        <AiOutlineDelete/>
    </div>
    }
</div>;
   }
   else{
       return <div></div>
   }
}

export default ReplyPost;

