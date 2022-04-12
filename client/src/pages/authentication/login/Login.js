import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";



import "./Login.css"
import { AiOutlineTwitter } from "react-icons/ai"



import { useNavigate } from 'react-router-dom';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";



export default function Login(props) {

  let navigate = useNavigate();


  const [isWalletCorrect, setIswalletCorrect] = useState(0)
  const {setmytoken} = props;
  const [address, setAddress] = useState('')
  const [password, setpassword] = useState('');
  const [isError, setisError] = useState(null)

  const [isPasswordCorrect, setIsPasswordCorrect] = useState(0)
  const [isLoading, setisLoading] = useState(false)


  const Demotoken =  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MTJjMDY1YmE4MmM2ZWE3YzcwYWFiIn0sImlhdCI6MTY0OTQ4Njg1NH0.oeLdbbyp22T9qW93w7vwDpvg2zFPOJ9pn8tIZkxDKdA
`

  const hanldeDemo = () => {
    localStorage.setItem("auth-token", Demotoken)
    setmytoken(Demotoken);
    navigate("/home")
  }

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: "#0d97ce";
`;



  const handleAddress = (e) => {
    setAddress(e.target.value);
  }

  const handlePassword = (e) => {
    setpassword(e.target.value)
  }


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
    if ((address.length > 25) && (!!address.match(re))) {
      setIswalletCorrect(1);
    }
    else {
      setIswalletCorrect(0);
    }

  }, [address])



  const handleLogin = async() => {
    const response = await fetch(`https://twitter-clone-backend-deepak.herokuapp.com/api/auth/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
     
      body: JSON.stringify({ address:address, password: password })
    });
    const token = await response.text();
    const status = response.status;
    return {token, status}
  }





  const handleContinue = async (e) => {
    e.preventDefault();
    if ((isPasswordCorrect === 1) && (isWalletCorrect === 1)) {
      setisLoading(true)
      const { token, status } = await handleLogin();
      if (status === 200) {
        localStorage.setItem("auth-token", token);
        setmytoken(token)
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
      else {
        setisError(token)
        setisLoading(false)
      }
    }

  }
  return (
    <div className='login'>
      <div className='login-container'>
        <AiOutlineTwitter className='login-twitter-logo' />
        <h1>Login &amp; Get back to the loop</h1>
        {
          isError && <p style={{ fontSize: "0.7rem", color: "red" }}>{isError}</p>
        }
        {isLoading ? <div className='signup-loading-Spinner'>
          <ClipLoader color={"#0d97ce"} loading={isLoading} css={override} size={50} />
        </div> : <form>
          <label id='myWallet'>Wallet address</label>
          <input type='text' value={address} htmlFor="myWallet" className='address-input' onChange={handleAddress} />
          {
            (isWalletCorrect === 0 && address.length !== 0) && <p style={{ fontSize: "0.7rem", color: "red" }}> wallet is not correct</p>
          }
          <label id='myPassword'>Password</label>
          <input type='password' value={password} htmlFor="myPassword" className='password-input' onChange={handlePassword} />
          {
            (isPasswordCorrect === 0 && password.length !== 0) && <p style={{ fontSize: "0.7rem", color: "red" }}>Please enter valid and secure password</p>
          }
          <button type='submit' onClick={handleContinue}>Continue</button>
          <div className="login-signupInstead">
            New here? <Link to="/signup" className='login-signup-click' >Signup Instead</Link>
          </div>
          <div className="demo-page">
            <div className="login-or">
              OR
            </div>
            <button onClick={hanldeDemo}>try demo</button>
          </div>
        </form>}
        
        <div className="login-footer">
          <div className="login-note">
            <span>Note: </span> Integration to metamask is under development.
          </div>
          <div className="login-features">
            <Link to="/docs"><span>Features: </span>
              Read all of the features and technical details</Link>
          </div>
          <div >

          </div>
        </div>
      </div>
    </div>


  )
}
