
import React, {useEffect, useContext, useState} from 'react';
import "./Home.css";
import TweetPosts from '../../components/tweetPost/TweetPosts';
import UserTweeting from '../../components/tweeting/UserTweeting';
import userContext from '../../context/users/userContext';
import { css } from "@emotion/react";
import { AiOutlineTwitter } from "react-icons/ai"
import { ScaleLoader } from 'react-spinners';

import {RiWifiOffLine} from "react-icons/ri"

function Home() {
    const context = useContext(userContext);
    const {getUser, myProfile,  tweet,  fetchTweets, failedFetch, setfailedFetch} = context;
    const width = window.screen.width;

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: "#0d97ce";
`;


const [isUserLoad, setisUserLoad] = useState(false)
const [isTweetLoad, setisTweetLoad] = useState(false)



const token = localStorage.getItem("auth-token")


const fetchTweetFunc = async() => {
    await fetchTweets(token);
 }


useEffect(()=> {
    setfailedFetch(false)
    if(!myProfile.profImage){
        getUser(token);
    }
    if(!tweet[0]){
        fetchTweetFunc();
    }
}, [])

    useEffect(()=>{
        if(myProfile.profileImg){
            setisUserLoad(true)
        }
    }, [myProfile])

    useEffect(()=>{
        if(tweet[0]){
        setisTweetLoad(true)
        }
    }, [tweet])


   if(!failedFetch){

    return <div className="home">
    <div className="home-headings">
    <h3>Home</h3>
    { width < 650 && <AiOutlineTwitter size={30}/>}
    </div>
    <div className='home-userTweet-container'>
     {
        isUserLoad && <UserTweeting isReply={0} profImage={myProfile.profileImg}
        fetchTweetFunc={ fetchTweetFunc} setisTweetLoad={setisUserLoad}/>
    }
  
    </div>
    
    { tweet[0]  && isTweetLoad && tweet.map((item, index)=>{
        return (
            <TweetPosts key={item._id} tweetContent={item.tweet} userId={item.userId} totalRetweets={item.totalRetweets} totalLikes={item.totalLikes} 
            totalReplies={item.totalReplies} 
            tweetImage={item.tweetImage}
            tweetId={item._id}
            fetchTweetFunc={ fetchTweetFunc} />
        )
    })
    }
    <div className='home-loading-Spinner'>
        <ScaleLoader color={"#0d97ce"} loading={!isTweetLoad} css={override} size={15} />
  </div>
  </div>  
}
else{
    return <div className="home-serverError">
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
}

export default Home;

