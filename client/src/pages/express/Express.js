import React, { useState, useEffect, useContext } from 'react'
import "./Express.css"
import RecUser from '../../components/recom/RecUser';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import userContext from '../../context/users/userContext';


import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";



function Express() {
  let context = useContext(userContext);

  const { handleRecomUser,  recomUser, myProfile, getUser } = context;

  const [isLoaded, setisLoaded] = useState(false)
  let navigte = useNavigate();
  const handleClose = () => {
    navigte(-1);
  }

  const token = localStorage.getItem("auth-token")
  useEffect(() => {
    if (recomUser.length === 0) {
      handleRecomUser(token);
    }
  }, [])


  useEffect(()=>{
    if(!myProfile.profileImg){
      getUser(token);
    }
  })
  useEffect(()=>{
    setTimeout(() => {
      setisLoaded(true)
    }, 1000);
  }, [recomUser])


  const override = css`
  display: block;
  margin: 0 auto;
  border-color: "#0d97ce";
`;


  return (
    <div className="Express">
      <div className="back-arrow">
        <AiOutlineArrowLeft onClick={handleClose} />
      </div>
      <h2>You might like to follow</h2>
      {
        isLoaded && recomUser.map((item, index) => {
          return <div className="recom-container"  key={item._id}><RecUser name={item.name} address={item.address} backImage={item.backImage} followers={item.followers} following={item.following} isVip={item.isVip} likedTweets={item.likedTweets} profileImg={item.profileImg} replies={item.rePlies} reTweets={item.reTweets} userTweets={item.userTweets} aboutUser={item.aboutUser} _id={item._id} promoted={index%2 === 0?1:0}/></div>
        })}

      <div className='notification-loading-Spinner'>
        <ClipLoader color={"#0d97ce"} loading={!isLoaded} css={override} size={50} />
      </div>
    </div>

  )
}

export default Express;