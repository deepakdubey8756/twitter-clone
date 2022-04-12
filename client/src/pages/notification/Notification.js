import React, {useEffect, useState} from 'react'
import ItemNotify from './ItemNotify';
import "./Notification.css"
import { AiOutlineArrowLeft, AiOutlineGithub, AiOutlineTwitter} from 'react-icons/ai';
import {useNavigate} from "react-router-dom"

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

function Notification() {
  let navigate = useNavigate();
  const token = localStorage.getItem("auth-token")

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: "#0d97ce";
`;
  

  const [notifications, setNotifications] = useState([])
  const [isLoaded, setisLoaded] = useState(false)
  const handleClose = () => {
    navigate(-1);
}


  const hanldeNotify = async (token) => {
    const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/notify/getnotify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const json = await response.json();
    setNotifications(json);
      setisLoaded(true);
  }

  useEffect(() => {
    if(notifications.length===0){
        hanldeNotify(token)
    }
  }, [])

  

  
  return (
    <div className="notification">
      <div className="back-arrow">
            <AiOutlineArrowLeft  onClick={handleClose}/>
        </div>
      <h3>Notifications</h3>
      {
      isLoaded && notifications.map((item, index)=> {
        return <ItemNotify key={item._id} content={item.content} message={item.message} tweetId={item.tweetId}  userId={item.userId}/>})}
      <div className='notification-loading-Spinner'>
      <ClipLoader color={"#0d97ce"} loading={!isLoaded} css={override} size={50} />
      </div>

      <div className='notification-mySocial'>
          <div className='notification-github'>
          <p>Fork me on</p>
          <AiOutlineGithub size={30} />
          </div>
          <div className='notification-twitter'>
            <p>Connect on</p>
            <AiOutlineTwitter size={30}/>
          </div>
        </div>
    </div>
  )
}

export default Notification;