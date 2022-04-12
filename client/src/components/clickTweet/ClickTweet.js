
import React, { useState, useContext } from 'react';

import { AiOutlineHeart,  AiOutlineAliwangwang, AiOutlineRetweet, AiOutlineUpload, AiOutlineBarChart, AiFillHeart } from "react-icons/ai"

import "./ClickTweet.css"

import userContext from '../../context/users/userContext';

import {Link} from "react-router-dom"

import {MdVerified} from "react-icons/md"

function ClickedTweet(props) {

    const context = useContext(userContext);


    const {handleLiking, handleRetweeting, handlingDisLiking, handleDetweeting, fetchTweets, getUser} = context;
    


    const {tweetImage, tweetContent, userProfile, totalReplies, totalRetweets, totalLikes, tweetId, isRetweetValues, isLikedValues} = props

     const [isLikedLocal, SetIsLiked] = useState(isLikedValues);

    const token = localStorage.getItem("auth-token");




    const [isReTweetLocal, setisReTweet] = useState(isRetweetValues)

    const [totalLiked, setTotaLiked] = useState(totalLikes)
    let totalRetweeted = totalRetweets

    const fetchTweetFunc = async() => {
        await fetchTweets(token);
     }

    const handleLike = async() => {
        if (isLikedLocal === 0) {
            SetIsLiked(1);
            setTotaLiked(totalLiked + 1)
            await handleLiking(tweetId, token);
            fetchTweetFunc();
            getUser(token);
            
        }
        else {
            SetIsLiked(0)
            setTotaLiked(totalLiked-1)
            await handlingDisLiking(tweetId, token)
            fetchTweetFunc();
            getUser(token);
        }
    }


    const handleRetweet = async() => {
        if (isReTweetLocal === 0) {
            setisReTweet(1);
            await handleRetweeting(tweetId, token);
            fetchTweets(token)
            fetchTweetFunc();
            getUser(token);
        }
        else {
            await handleDetweeting(tweetId, token);
            setisReTweet(0)
            fetchTweets(token)
            fetchTweetFunc();
            getUser(token);
        }
    }

    

    const handleUnusedClick = () => {
        alert("This functionality is not availble yet")
    }

    const myProfileData ={
        userProfile: userProfile,
    }
    
    if(userProfile.profileImg){
        return  <div className="clickedTweetPost-container">
        <Link to="/profile" state={myProfileData}><img src={userProfile.profileImg} alt="user profile" className='clickedTweet-image' /></Link>
        <div className="clickedTweetPost">
            <Link className="clicked-user-name" to="/profile" state={userProfile}>
                {userProfile.name} 
                {
                userProfile.isVip && <MdVerified color='skyblue'/>
              }    
                <span className="userId"> {userProfile.address && userProfile.address.slice(0, 4)}...{userProfile.address && userProfile.address.slice(-5)}</span>
            </Link>
            
            <div className="clicked-post-content">
                {tweetContent}
            </div>
            {tweetImage && <img src={tweetImage} alt="user-tweet" />}
            <div className="clickedTweet-options">
                <div>
                <AiOutlineAliwangwang className="tweet-option"/> {totalReplies && totalReplies}
                </div>
                <div>
                <AiOutlineRetweet className={isReTweetLocal===1?"tweet-option tweet-active":"tweet-option"} onClick={handleRetweet}/> <span>{totalRetweeted}</span>
                </div>
                <div>
                    {isLikedLocal ===0 ? <AiOutlineHeart onClick={handleLike} className="tweet-option"/>:  <AiFillHeart onClick={handleLike} className="liked-tweet tweet-option" />} <span>{totalLiked}</span>
                </div>
                <div  onClick={ handleUnusedClick }>
                <AiOutlineUpload className="tweet-option" />
                </div>
                <div  onClick={handleUnusedClick}>
                <AiOutlineBarChart className="tweet-option" />
                </div>
            </div>
        </div>

    </div>;
    }
    else{
        return <p className="home-loadingSpiner">Loading...</p>
    }
}

export default ClickedTweet;

