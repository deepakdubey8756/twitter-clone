import userContext from "./userContext";
import { useState } from "react";

const UserState = (props) => {

  const [myProfile, setmyProfile] = useState({});


  const [recomUser, setrecomUser] = useState([])


  const [tweet, setTweet] = useState([]);

  const [failedFetch, setfailedFetch] = useState(false)

  const getUser = async (token) => {
    try{
      const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const json = await response.json();
    const status =  response.status;
    setmyProfile(json)
    if(status !== 200){
      setfailedFetch(true);
    }
    return json;
    }
    catch(error){
      setfailedFetch(true);
    }
  }


    const handleRecomUser = async (token) => {
      try{
        const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/auth/recomuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

    const json = await response.json();
    const status = response.status;
    if(status !== 200){
      setfailedFetch(true)
    }
    setrecomUser(json);
    }
    catch(err){
      setfailedFetch(true)
    }
  }



  const getreply = async (id, token) => {
    try{
      const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/reply/getreply/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const json = await response.json();
    const status = response.status;
    if(status !== 200){
      setfailedFetch(true)
    }
    return json; 
    } 
    catch(err){
      const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/reply/getreply/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
  
    const json = await response.json();
    const status = response.status;
    if(status !== 200){
      setfailedFetch(true)
    }
    return json; 
    }
  }



  const updateUser = async (text, bio, profileString, imageString, token) => {
    try{
      const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/auth/updateUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },

      body: JSON.stringify({name:text, aboutUser:bio, profileImage:profileString, backImage:imageString})
    });

  const json = await response.json();
  const status = response.status;
    if(status !== 200){
      setfailedFetch(true)
    }
  return {json, status};
    }
    catch(err){
      setfailedFetch(true)
    }
  }

  

  const addTweet = async (text, imageString, token) => {
    const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/tweets/addtweet`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({tweet:text, tweetImage:imageString})
    });
 
  const json = await response.json();
  const status =  response.status;
  let tweetRes = {}
  tweetRes.json = json;
  tweetRes.status = status;
  return tweetRes;
  }


  const addReply = async (text, imageString, id, token) => {
    const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/reply/addreply/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({replyContent:text, replyImage:imageString})
    });
  const json = await response.json();
  const status =  response.status;
  let replyRes = {}
  replyRes.json = json;
  replyRes.status = status;
  return replyRes;
  }
  


  const handleLiking = async (twitterId, token) => {
    const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/tweets/liketweet/${twitterId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    let likedtweet = {}
    likedtweet.json = await response.json();
    likedtweet.status = response.status;
    return likedtweet;
  }

  

  const handleRetweeting = async (twitterId, token) => {
    const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/tweets/retweet/${twitterId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    let reTweet = {}
    reTweet.json = await response.json();
    reTweet.status = response.status;
    return reTweet;
  }



  const handleFollowFunc = async(userId, token)=>{
    const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/auth/handleFollow/${userId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    let status= response.status;
    return status;
  }


  
  const unfollowfunc = async(userId, token)=>{
    const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/auth/unFollow/${userId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    let status= response.status;
    return status;
  }

 

  


  const handleDetweeting = async (twitterId, token) => {
    const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/tweets/detweet/${twitterId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    let deTweet = {}
    deTweet.json = await response.json();
    deTweet.status = response.status;
    return deTweet;
  }

 

  const handlingDisLiking = async (twitterId, token) => {
    const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/tweets/dislikeTweet/${twitterId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    let deTweet = {}
    deTweet.json = await response.json();
    deTweet.status = response.status;
    return deTweet;
  }



  

const fetchTweets = async(token) => {
  try{
    const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/tweets/gettweets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const json = await response.json();
    const status = response.status;
    if(status !== 200){
      setfailedFetch(true)
    }
    setTweet(json);
  }
  catch(err){
    setfailedFetch(true)
  }
  }

  const getOthers = async (userId, token) => {
    try{
      const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/auth/getOthers/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
  
    const json = await response.json();
    const status =  response.status;
    let myObject = {}
    myObject.json = json;
    myObject.status = status;
    return myObject;
    }
    catch{
      setfailedFetch(true);
    }
  }

    const handleDeleteTweet = async (twitterId, token) => {
      const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/tweets/deletetweet/${twitterId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      let deTweet = {}
      deTweet.json = await response.json();
      deTweet.status = response.status;
      return deTweet;
    }
  
  

    const handleDelteReply = async (twitterId, token) => {
      const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/reply/deletereply/${twitterId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      let deTweet = {}
      deTweet.json = await response.json();
      deTweet.status = response.status;
      return deTweet;
    }
  
  


  return (
    <userContext.Provider value={{myProfile, getUser, updateUser, addTweet, fetchTweets, tweet, getOthers, handleLiking, handleRetweeting,
    handleDetweeting, handlingDisLiking, handleDeleteTweet, handleFollowFunc,
    unfollowfunc, addReply, getreply, handleDelteReply, recomUser, setrecomUser, handleRecomUser, setTweet,
    failedFetch, setfailedFetch}}>
      {props.children}
    </userContext.Provider>
  ) 

}
export default UserState;