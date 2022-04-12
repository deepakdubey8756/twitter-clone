import React, { useState, useEffect, useContext } from 'react'
import './Profile.css'
import profileImage from "../../assets/images/myBlack.png"
import coverImage from "../../assets/images/twitterCover.jpg"
import TweetPost from "../../components/tweetPost/TweetPosts"
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai"
import { MdVerified } from "react-icons/md"
import { useLocation } from 'react-router-dom';
import ReplyPost from '../../components/replyPost/ReplyPost'
import userContext from '../../context/users/userContext';


import {RiWifiOffLine} from "react-icons/ri"

import {Link} from "react-router-dom"

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

function Profile() {

  
  const context = useContext(userContext)

  let navigate = useNavigate();

  let location = useLocation();

  const [isLoaded, setisLoaded] = useState(false);

  const { userProfile} = location.state


  const override = css`
  display: block;
  margin: 0 auto;
  border-color: "#0d97ce";
`;



  const { unfollowfunc, handleFollowFunc, myProfile,  getUser, faliedFetch, setfailedFetch} = context;

  const [tweetMenu, setTweetMenu] = useState(1)


  const [increFollow, setincreFollow] = useState(0);


  const [isFollowed, setisFollowed] = useState(0)

  const [userTweets, setuserTweets] = useState([])
  
  const token = localStorage.getItem("auth-token")

  const handleFollow = async() => {
    if(isFollowed===0){
      const followStatus = await handleFollowFunc(userProfile._id, token)
      if (followStatus===200){
        setisFollowed(1);
        setincreFollow(1);
      }
    }
    else{
      const unfollowStatus = await unfollowfunc(userProfile._id, token)
      if(unfollowStatus===200){
        setisFollowed(0);
        setincreFollow(increFollow-1)
      };
    }
  }
  
  const fetchLocalTweets = async(_path) => {
      if(myProfile._id){ 
        let response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/${_path}/${userProfile._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const json = await response.json();
      const status = response.status;
      if(status === 200){
        setuserTweets(json);
        setisLoaded(true);
        setfailedFetch(false);
      }
      else{
        setfailedFetch(true);
      }
      }
    }

    useEffect(()=>{
      if(!myProfile._id){
        getUser(token);
      }
    }, [])

    const handleTweetReplies = async () => {
      fetchLocalTweets("reply/getUserReplies");
    }

    const fetchLikedTweetFunc = async() => {
      fetchLocalTweets("tweets/getLikedTweets");
   }
    const fetchReTweetFunc = async() => {
      fetchLocalTweets("tweets/getUserReTweets");
   }
   const fetchUserTweetFunc = async() =>{
    fetchLocalTweets("tweets/getUserTweets");
   }


  useEffect(() => {
      if(myProfile.following && myProfile.following.find((item)=> item === userProfile._id)){
        setisFollowed(1);
      }
      else{
        setisFollowed(0);
      }
      fetchLocalTweets("tweets/getUserTweets");
  }, [])


  const handleClose = () => {
    navigate("/");
  }


    const handleTweetMenu =  (index) => {
      setisLoaded(false)
      if (index === 1){
        fetchLocalTweets("tweets/getUserTweets");
      }
      else if (index === 2){
        fetchLocalTweets("tweets/getUserReTweets")
      }
      else if (index === 3){
        fetchLocalTweets("tweets/getLikedTweets")
      }
      else if (index === 4){
        fetchLocalTweets("reply/getUserReplies")
      }
      setTweetMenu(index)
    }

    const myFollowings = {
      followingData:userProfile.following
    }
    const myFollowers = {
      followingData: userProfile.followers
    }


  return (
    <>
      <div className="back-arrow">
        <AiOutlineArrowLeft  onClick={handleClose}/>
        {userProfile.name}
      </div>
      <div className='profile'>
        <div className="banner-image">
          {
            userProfile.backImage? <img src={userProfile.backImage} alt="back banner" />: <img src={coverImage} alt="user banner" />
          }
        </div>
        <div className="profileImage">
        {
            userProfile.profileImg? <img src={userProfile.profileImg} alt="profile banner" />: <img src={profileImage} alt="user banner" />
          }
        </div>
        <div className="profileDetails">
          <div className="profile-userDetails">
            <div className="profile-userName">
              {userProfile.name} {
                userProfile.isVip && <MdVerified color='skyblue'/>
              }
            </div>
            <div className="profile-userId">
              {userProfile.address}
            </div>
          </div>
          {
            (userProfile._id===myProfile._id)?<div className="profile-userFollow" onClick={() => navigate("/setting")}>
            setting
          </div>:<div className="profile-userFollow" onClick={handleFollow}>
          {isFollowed===0?"Follow":"unfollow"}
        </div>
          }
        </div>
        <div className="">
          <div className="aboutUser">
            {userProfile.aboutUser}
          </div>
          <div className='profile-connection'>
            <Link to="/following" state={myFollowings} className='total-followers'>
              {
                userProfile.following? userProfile.following.length: 0
              } following
            </Link>
            <Link  to="/following" state={myFollowers} className="total-following">
            {
              userProfile.followers?userProfile.followers.length + increFollow: 0
              } followers
            </Link>
          </div>
        </div>
        <div className="bottomPart">
          <div className="profile-navs">
            <div className={tweetMenu === 1 ? "profile-nav-itmes active" : "profile-nav-itmes"} onClick={() => handleTweetMenu(1)}>
              tweets
            </div>
            <div className={tweetMenu === 2 ? "profile-nav-itmes active" : "profile-nav-itmes"} onClick={() => handleTweetMenu(2)}>
              re-tweets
            </div>
            <div className={tweetMenu === 3 ? "profile-nav-itmes active" : "profile-nav-itmes"} onClick={() => handleTweetMenu(3)}>
              liked
            </div>
            <div className={tweetMenu === 4 ? "profile-nav-itmes active" : "profile-nav-itmes"} onClick={() => handleTweetMenu(4)}>
              replies
            </div>
          </div>
        </div>
        <div className="tweet-container">
        { isLoaded && userTweets.map((item, index)=>{
            if(tweetMenu === 1){
              return (
                <TweetPost key={item._id} tweetContent={item.tweet} userId={item.userId} totalRetweets={item.totalRetweets} totalLikes={item.totalLikes} 
                replies={item.replies} 
                tweetImage={item.tweetImage}
                fetchTweetFunc={fetchUserTweetFunc}
                tweetId={item._id}/>
            )
            }
            else if(tweetMenu === 2){
              return (
                <TweetPost key={item._id} tweetContent={item.tweet} userId={item.userId} totalRetweets={item.totalRetweets} totalLikes={item.totalLikes} 
                replies={item.replies} 
                tweetImage={item.tweetImage}
                fetchTweetFunc={fetchReTweetFunc}
                tweetId={item._id}/>
            )
            }
            else if(tweetMenu === 3){
              return (
                <TweetPost key={item._id} tweetContent={item.tweet} userId={item.userId} totalRetweets={item.totalRetweets} totalLikes={item.totalLikes} 
                replies={item.replies} 
                tweetImage={item.tweetImage}
                fetchTweetFunc={fetchLikedTweetFunc}
                tweetId={item._id}/>
            )
            }
            else if (tweetMenu ===4) {
              return (
                <ReplyPost key={item._id} tweetId={item._id} userId={item.replyBy} tweetContent={item.replyContent}
                tweetImage={item.replyImage}
                handleTweetReplies={handleTweetReplies}
              />
            )
            }
        })}
        {
          !faliedFetch ? <div className='profile-loading-Spinner'>
          <ClipLoader color={"#0d97ce"} loading={!isLoaded} css={override} size={50} />
          </div>:
          <div className="home-serverError">
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
    </>
  )
}

export default Profile;