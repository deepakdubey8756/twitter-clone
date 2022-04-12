import React, {useRef, useState, useContext, useEffect} from 'react';
import "./Setting.css";
import {AiOutlineClose} from "react-icons/ai";
import profile1 from "../../assets/images/myBlack.png"
import userContext from '../../context/users/userContext';
import { useNavigate } from 'react-router';

import { css } from "@emotion/react";
import { ClipLoader} from 'react-spinners';


function Setting() {
  let navigate = useNavigate();
  const context = useContext(userContext)
  const {updateUser, myProfile } = context;
  const [bannerImage, setBannerImage] = useState(myProfile.backImage);

  const [profileImage, setProfileImage] = useState(myProfile.profileImg);

  const [text, settext] = useState(myProfile.name);
  const [bio, setBio] = useState(myProfile.aboutUser);
  




  const fileImageRef = useRef(null);
  const fileProfileRef = useRef(null);


 
  const handleImageClick = (event) =>{
    event.preventDefault();
    fileImageRef.current.click();
  }

  
  const handleProfileclick = (event) =>{
    event.preventDefault();
    fileProfileRef.current.click();
  }



  const handleClose = () => {
    navigate("/");
  }

  const [isLoaded, setisLoaded] = useState(true)


  useEffect(() => {
    if(!myProfile.backImage){
      navigate("/")
    }
  }, [myProfile, navigate])
  



  const handleBannerChange = async(event) =>{
   const file = event.target.files[0];
    if(file){
  
      const base64 = await convertBase64(file);
      setBannerImage(base64);
    }
    else{
      setBannerImage(myProfile.backImage);
    }
  }



  const handleProfileChange = async(event) =>{
    const file = event.target.files[0];
    if(file){
      const base64 = await convertBase64(file);
      setProfileImage(base64);
    }
    else{
      setProfileImage(myProfile.profileImg);
    }
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  const handleTextChange = (e) =>{
    settext(e.target.value);
  }


  const handleBioChange = (e) =>{
    setBio(e.target.value);
  }


  const token = localStorage.getItem("auth-token");

  const handleSubmit = async() => {
    setisLoaded(false)
    const {status} = await updateUser (text, bio, profileImage, bannerImage, token);
    if(status === 200){
      navigate("/");
    }
  }
  const handleVerification = () => {
    alert("You are logging out");
    localStorage.clear()
    window.location.reload()
  }
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: "#0d97ce";
`;

  
  return (
    <>
      <div className="setting-arrowBack-container">
        <AiOutlineClose onClick={handleClose} style={{cursor: "pointer"}}/>
        <p className="edit-profile">Edit Profile</p>
        <div className="save-button" onClick={handleSubmit}>
          Save
        </div>
        <div className='setting-loading-Spinner'>
        <ClipLoader color={"#0d97ce"} loading={!isLoaded} css={override} size={15} />
  </div>
    </div>
    <div className="setting">
    <div className="edited-banner-image" onClick={handleImageClick}>
    {
        myProfile.backImage?<img src={bannerImage} alt="user profile"/>:<img src={profile1} alt="user profile"/>
      }
      </div>



    <input type="file" style={{display: 'none'}} 
          ref={fileImageRef} 
          accept="image/*"
          onChange={handleBannerChange}/>


    <input type="file" style={{display: 'none'}} 
          ref={fileProfileRef} 
          accept="image/*"
          onChange={handleProfileChange}/>
    <div className="edit-profileImage" onClick={handleProfileclick}>
      {
        myProfile.profileImg?<img src={profileImage} alt="user profile"/>:<img src={profile1} alt="user profile"/>
      }
      </div>
    <div className="edit-name">
      <h3>Name</h3>
      <input type='text' value={text} placeholder='Enter your name' onChange={(e)=>handleTextChange(e)}></input>
      </div>
    <div className="edit-name">
      <h3>Bio</h3>
      <input type='text' value={bio} placeholder='Enter your Bio' onChange={(e)=>handleBioChange(e)}></input>
      </div>
      <button  className='switch-professional' onClick={handleVerification}>Logout</button>
    </div>
    </>
  )

}

export default Setting;