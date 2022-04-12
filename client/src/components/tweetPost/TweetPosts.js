
import React, { useState, useEffect, useContext } from 'react';


import { AiOutlineHeart, AiOutlineDelete, AiOutlineAliwangwang, AiOutlineRetweet, AiOutlineUpload, AiOutlineBarChart, AiFillHeart 

} from "react-icons/ai"

import {MdVerified} from "react-icons/md"

import "./TweetPost.css"


import userContext from '../../context/users/userContext';


import { Link } from "react-router-dom"
import { css } from "@emotion/react";


import { ClipLoader } from 'react-spinners';


function TweetPosts(props) {


    const override = css`
    display: block;
    margin: 0 auto;
    border-color: "#0d97ce";
  `;


    const context = useContext(userContext);

    const {getOthers, handleLiking, handleRetweeting,  handleDeleteTweet, handlingDisLiking, handleDetweeting, myProfile, getUser} = context;

    const [isTweetLoad, setisTweetLoad] = useState(false)

    const [isLiked, SetIsLiked] = useState(0);
    

    const {tweetImage, tweetContent, userId, totalReplies, totalRetweets, totalLikes, tweetId, fetchTweetFunc } = props;


    const token = localStorage.getItem("auth-token")

    const [totalLiked, setTotaLiked] = useState(totalLikes)
    const [totalRetweeted, settotalRetweeted] = useState(totalRetweets)



    const [userProfile, setuserProfile] = useState({})

    const [isReTweet, setisReTweet] = useState(0)


    const handleLike = async() => {
        if (isLiked === 0) {
            SetIsLiked(1);
            setTotaLiked(totalLiked + 1)
            await handleLiking(tweetId, token);
            fetchTweetFunc(token);
            getUser(token);
        }
        else {
            await handlingDisLiking(tweetId, token)
            setTotaLiked(totalLiked - 1);
            SetIsLiked(0);
            fetchTweetFunc(token);
            getUser(token);
        }
    }
 

    const handleMatchLike = () => {
        let isFound = 0;
        for (let i in myProfile.likedTweets){
            if (myProfile.likedTweets[i]===tweetId){
                SetIsLiked(1);
                isFound = 1;
            }
        }
        if(isFound === 0){
            SetIsLiked(0);
        }
    }

    const handleRetweetfunc = () => {
        let isFound = 0;
        for (let i in myProfile.reTweets){
            if (myProfile.reTweets[i]===tweetId){
                setisReTweet(1);
                isFound = 1;
            }
        }
        if(isFound === 0){
            setisReTweet(0)
        }
  }



  const handleDeletefunc = async() => {
      alert("You are going to delted your post")
      setisTweetLoad(false)
      const response = await handleDeleteTweet(tweetId, token)
      if (response.status === 200){
        fetchTweetFunc(token);
        getUser(token);

      }
      else{
          alert("Unable to delete. Try after sometime");
          setisTweetLoad(true);
      }
  }




    const handleRetweet = async() => {
        if (isReTweet === 0) {
            setisReTweet(1);
            settotalRetweeted(totalRetweeted + 1);
            await handleRetweeting(tweetId, token);
            fetchTweetFunc(token);
            getUser(token);
        }
        else {
            await handleDetweeting(tweetId, token);
            settotalRetweeted(totalRetweeted - 1)
            setisReTweet(0);
            fetchTweetFunc(token);
            getUser(token);
        }
    }


    
    useEffect(()=>{
        handleMatchLike()
        handleRetweetfunc()
        if(userProfile.profileImg){
            setisTweetLoad(true)
            setTotaLiked(totalLikes)
            settotalRetweeted(totalRetweets)
        }
        
    }, [userProfile])
    
    const handleUserProfile = async()=>{
        if(!userProfile.name){
            const myResult =await getOthers(userId, token);
            setuserProfile(myResult.json)
        }
    }
    useEffect(() => {   
        handleUserProfile();
     }, [])



     const myData = {
        userProfile:userProfile,
        tweetImage: tweetImage,
        tweetContent: tweetContent, 
        tweetReplies: totalReplies,
        totalRetweeted: totalRetweeted,
        totalLiked: totalLiked,
        tweetId: tweetId, 
        isLikedValue: isLiked,
        isReTweetValue: isReTweet,
      }
      const myProfileData = {
          userProfile:userProfile,
      }
    const handleUnusedClick = () => {
        alert("This functionality is not availble yet")
    }

    
    if(isTweetLoad){
        return  <div className="tweetPost-container">
       <Link to="/profile" state={myProfileData}><img src={userProfile.profileImg} alt="user profile" className="tweetPost-container-img" /></Link> 
        <div className="tweetPost">
            <Link  to="/profile" state={myProfileData} className="user-name" >
                {userProfile.name}
                {
                userProfile.isVip && <MdVerified color='skyblue'/>
              }            
                <span className="userId"> {userProfile.address && userProfile.address.slice(0, 4)}...{userProfile.address && userProfile.address.slice(-5)}</span>
            </Link>
            
            <Link className="post-content" to="/reply" state={myData}>
                {tweetContent}
            </Link>
            {tweetImage && <img src={tweetImage} alt="user-tweet" />}
            <div className="tweet-post-options">
                <Link to="/reply" state={myData}>
                <AiOutlineAliwangwang className="tweet-option"/> {totalReplies && totalReplies}
                </Link>
                <div >
                <AiOutlineRetweet className={isReTweet===1?"tweet-option tweet-active":"tweet-option"} onClick={handleRetweet}/> <span>{totalRetweeted}</span>
                </div>
                <div >
                    {isLiked ===0 ? <AiOutlineHeart onClick={handleLike} className="tweet-option"/>:  <AiFillHeart onClick={handleLike} className=" tweet-option liked-tweet" />} <span>{totalLiked}</span>
                </div>
                <div  onClick={ handleUnusedClick }>
                <AiOutlineUpload className="tweet-option" />
                </div>
                <div onClick={handleUnusedClick}>
                <AiOutlineBarChart className="tweet-option" />
                </div>
            </div>
        </div>
        {
            myProfile._id && myProfile._id.toString() == userId && <div className="rest-options">
            <AiOutlineDelete onClick={handleDeletefunc}/>
        </div>
        }
    </div>;
    }
    else{
        return  <div className='tweet-loading-Spinner'>
        <ClipLoader color={"#0d97ce"} loading={!isTweetLoad} css={override} size={25} />
  </div>
    }
}

export default TweetPosts;

