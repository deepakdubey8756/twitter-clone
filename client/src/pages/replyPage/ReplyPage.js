import React, { useContext, useState, useEffect } from 'react';
import "./ReplyPage.css";
import { useLocation } from 'react-router-dom';
import UserTweeting from '../../components/tweeting/UserTweeting';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import userContext from '../../context/users/userContext';
import ClickedTweet from '../../components/clickTweet/ClickTweet';


import { useNavigate } from "react-router-dom";
import ReplyPost from '../../components/replyPost/ReplyPost';
import { ScaleLoader } from 'react-spinners';
import { css } from "@emotion/react";

import {RiWifiOffLine} from "react-icons/ri"

import { AiOutlineTwitter } from "react-icons/ai";

function ReplyPage() {
  let location = useLocation();


  const { userProfile, tweetImage, tweetContent, tweetReplies, totalRetweeted, totalLiked, tweetId, isLikedValue, isReTweetValue } = location.state


      const override = css`
      display: block;
      margin: 0 auto;
      border-color: "#0d97ce";
    `;
    

  const context = useContext(userContext);
  const { myProfile, getreply, fetchTweets, failedFetch, setfailedFetch } = context;


  const [isLoaded, setisLoaded] = useState(false)

  
  const token = localStorage.getItem("auth-token")

  const [totalReply, setTotalReply] = useState(tweetReplies)
  const [replies, setReplies] = useState([])
  let navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  }

  const handleTweetReplies = async () => {
    const myResponse = await getreply(tweetId, token)
    setReplies(myResponse)
    setisLoaded(true)
  }

  useEffect(() => {
    setfailedFetch(false)
    if (!myProfile.profileImg) {
      navigate('/')
    }
    handleTweetReplies();
  }, [])

  useEffect(()=> {
    setTimeout(() => {
      setisLoaded(true)
    }, 7000);
  }, [])
  


  const fetchTweetFunc = async() => {
    await fetchTweets(token);
 }

 const width = window.screen.width;

  return (
    <div className="ReplyPage">
      <div className="back-arrow">
        <AiOutlineArrowLeft onClick={handleClose} />
        { width < 650 && <AiOutlineTwitter size={30}/>}
      </div>
      <div className="reply-tweet-container">
        {
          tweetId && <ClickedTweet tweetContent={tweetContent}
            tweetImage={tweetImage}
            userProfile={userProfile}
            totalReplies={totalReply}
            totalRetweets={totalRetweeted}
            totalLikes={totalLiked}
            tweetId={tweetId}
            isLikedValues={isLikedValue}
            isRetweetValues={isReTweetValue}
          />
        }
      </div>
      <div className="reply-userTweet-container">
        {
          myProfile.profileImg && <UserTweeting totalReply={totalReply} setTotalReply={setTotalReply} profImage={myProfile.profileImg} isReply={1} tweetId={tweetId} handleTweetReplies={handleTweetReplies}
          fetchTweetFunc={fetchTweetFunc} />
        }
      </div>
      <h3 style={{marginLeft:"1rem"}}>Replies</h3>

    <div className='reply-replies-container'>
    {
       !failedFetch?<> <div className='reply-loading-Spinner'>
       <ScaleLoader color={"#0d97ce"} loading={!isLoaded} css={override} size={15} />
 </div>
 {
   isLoaded && <div className="reply-replyContainer">
   {
     replies.map((item, index) => {
       return <ReplyPost key={item._id} tweetId={item._id} userId={item.replyBy} tweetContent={item.replyContent}
         tweetImage={item.replyImage}
         totalReply={totalReply}
         setTotalReply={setTotalReply}
         handleTweetReplies={handleTweetReplies}
       />
     })
   }
 </div>
 }</>:<div className="home-serverError">
 <RiWifiOffLine size={30}/>
 <p>Failed to fetch data from server. May be due to follownig things:
 </p>
 <ol>
     <li>Check your internet connection</li>
     <li>Clear your browser cache and login again.</li>
     <li>Raise issue on github</li>
     <li>Enable javaScript</li>
     
 </ol>
 </div>
     }
    </div>
    </div>
  )
}

export default ReplyPage;