import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import "./Following.css";
import { AiOutlineArrowLeft, AiOutlineTwitter } from 'react-icons/ai';
import UserComponent from '../../components/recom/UserComponent';


import { css } from "@emotion/react";
import { ScaleLoader } from 'react-spinners';

function Following() {


    let location = useLocation();
    let navigate = useNavigate();
    const {followingData} = location.state;


    const [isLoaded, setisLoaded] = useState(false)
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: "#0d97ce";
  `;
  
  
   
    const handleClose = () => {
        navigate("/");
    }

    useEffect(() => {
        setTimeout(() => {
            setisLoaded(true)
        }, 2000);
    }, [])
    

return (
    <div className='following'>
    <div className="back-arrow">
        <AiOutlineArrowLeft onClick={handleClose} />
        <AiOutlineTwitter size={30} color="#0d97ce"/>
    </div>
    {
       followingData && followingData.map((item, index)=>{
            return  <div key = {index} className="following-me">
            <UserComponent userId={item}/>
            </div>
        })
}
<div className='home-loading-Spinner'>
        <ScaleLoader color={"#0d97ce"} loading={!isLoaded} css={override} size={15} />
  </div>
    </div>
)}

export default Following;