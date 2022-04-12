import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import "./Signup.css"
import { AiOutlineTwitter } from "react-icons/ai"

import { useNavigate } from 'react-router-dom';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";


export default function Signup(props) {
let navigate = useNavigate();
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: "#0d97ce";
`;
  const Demotoken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MTJjMDY1YmE4MmM2ZWE3YzcwYWFiIn0sImlhdCI6MTY0OTQ4Njg1NH0.oeLdbbyp22T9qW93w7vwDpvg2zFPOJ9pn8tIZkxDKdA
  `

  const {setmytoken } = props
  const [name, setname] = useState('');
  const [wallet, setwallet] = useState('')
  const [password, setpassword] = useState('');
  const [comPass, setcomPass] = useState('')
  const [isError, setisError] = useState(null)

  const [isNameCorrect, setisNameCorrect] = useState(0)
  const [isWalletCorrect, setIswalletCorrect] = useState(0)
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(0)
  const [isCompassCorrect, setIsComPassCorrect] = useState(0)
  const [isLoading, setisLoading] = useState(false)
  const handleTrydemo = () => {
    localStorage.setItem("auth-token", Demotoken)
    setmytoken(Demotoken);
    navigate("/")
  }

  useEffect(() => {
    if (comPass === password) {
      setIsComPassCorrect(1)
    }
    else {
      setIsComPassCorrect(0)
    }
  }, [comPass])


  useEffect(() => {
    const re = /^[a-zA-Z0-9]*$/
    if ((password.length > 5) && (!!password.match(re))) {
      setIsPasswordCorrect(1);
    }

    else {
      setIsPasswordCorrect(0);
    }
  }, [password])


  useEffect(() => {
    const re = /^[a-zA-Z0-9]*$/
    if ((wallet.length > 25) && (!!wallet.match(re))) {
      setIswalletCorrect(1);
    }
    else {
      setIswalletCorrect(0);
    }

  }, [wallet])


  useEffect(() => {
    if (name.length > 4) {
      setisNameCorrect(1);
    }
    else {
      setisNameCorrect(0);
    }
  }, [name])


  const handleName = (e) => {
    setname(e.target.value);
  }
  const handleWallet = (e) => {
    setwallet(e.target.value);
  }
  const handlePassword = (e) => {
    setpassword(e.target.value);
  }
  const handleComPass = (e) => {
    setcomPass(e.target.value);
  }

  const createUserFunc = async () => {
    const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      },

      body: JSON.stringify({ name: name, address: wallet, password: password })
    });
    const json = await response.text();
    const status = response.status;
    return { json, status }
  } 

  const handleContinue = async (e) => {
    e.preventDefault();
    if ((isPasswordCorrect === 1) && (isNameCorrect === 1) && (isCompassCorrect === 1) && (isWalletCorrect === 1)) {
      setisLoading(true)
      const { json, status } = await createUserFunc();
      if (status === 200) {
        setTimeout(() => {
          localStorage.setItem("auth-token", json);
          setmytoken(json)
        }, 1000);
        navigate('/home');
      }
      else {
        setisError(json);
        setisLoading(false);
      }
    }

  }

  return (
    <div className='signup'>
      <div className='signup-container'>
        <AiOutlineTwitter className='signup-twitter-logo' />
        <h1>sigup &amp; Get ready for the loop</h1>
        {
          isError && <p style={{ fontSize: "0.7rem", color: "red" }}>{isError}</p>
        }
        {isLoading ? <div className='signup-loading-Spinner'>
          <ClipLoader color={"#0d97ce"} loading={isLoading} css={override} size={50} />
        </div> : <form>
          <label id='myText'>Name</label>
          <input type='text' value={name} htmlFor="mytext" className='name-input' onChange={handleName} />
          {
            (isNameCorrect === 0 && name.length !== 0) && <p style={{ fontSize: "0.7rem", color: "red" }}>Name must me more than 4 words</p>
          }
          <label id='myWallet'>Wallet address</label>
          <input type='text' htmlFor="mytext" className='address-input' onChange={handleWallet} />
          {
            (isWalletCorrect === 0 && wallet.length !== 0) && <p style={{ fontSize: "0.7rem", color: "red" }}> wallet is not correct</p>
          }
          <label id='myPassword'>Password</label>
          <input type='password' htmlFor="myPassword" className='password-input' onChange={handlePassword} />
          {
            (isPasswordCorrect === 0 && password.length !== 0) && <p style={{ fontSize: "0.7rem", color: "red" }}>Please enter valid and secure password</p>
          }
          <label id='myPassword'>Confirm Password</label>
          <input type='password' htmlFor="myPassword" className='password-input' onChange={handleComPass} />
          {
            isCompassCorrect === 0 && <p style={{ fontSize: "0.7rem", color: "red" }}>Password doesn't matched!</p>
          }
          <button onClick={handleContinue} >Continue</button>
          <div className="signup-signupInstead">
            Already a user? <Link to="/" className='login-signup-click' >Login Instead</Link>
          </div>
          <div className="demo-page">
            <div className="signup-or">
              OR
            </div>
            <button onClick={handleTrydemo}>try demo</button>
          </div>
        </form>}

        <div className="signup-footer">
          <div className="signup-note">
            <span>Note: </span> Integration to metamask and uphold is under development.
          </div>
          <div className="signup-features">
            <Link to="/docs"><span>Features: </span>
              Read all of the features and technical details.</Link>
          </div>
          <div >

          </div>
        </div>

      </div>
    </div>

  )

}