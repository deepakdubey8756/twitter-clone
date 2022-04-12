import React from 'react'
import './Docs.css'

import { AiOutlineArrowLeft, AiOutlineGithub, AiOutlineTwitter} from 'react-icons/ai';

import { useNavigate } from 'react-router-dom';

function Docs() {

  let navigate = useNavigate();
  const handleClose = ()=> {
    navigate(-1);
  }
  return (
    <div className="docs">
       <div className="docs-back-arrow">
        <AiOutlineArrowLeft onClick={handleClose} size={30}/>
        <AiOutlineTwitter size={30} color="#0d97ce"/>
      </div>
        <h2>Features</h2>
        <p>Our twitter application includes following features:--</p>
        <ul>
          <li>
            Full authentication (<span className='hightlighted-text'> Login</span>, <span className='hightlighted-text'> Logout</span>, <span className='hightlighted-text'> signup</span>) freatures.
          </li>
          <li>
            Here you can <span className='hightlighted-text'> tweet</span>, <span className='hightlighted-text'> comment</span>, <span className='hightlighted-text'> follow</span>, <span className='hightlighted-text'> change your profile</span>, <span className='hightlighted-text'> like</span>, <span className='hightlighted-text'> retweet</span> etc.
          </li>
          <li>
            Full notification system to notify user when there is any tweet update
          </li>
        </ul>
        <h2>Technical Details -- twitter-clone</h2>

        <p>This twitter-clone is made using Mearn stack. It includes following:-</p>
        <ul>
          <li>
            It's frontend is witten in <span className='hightlighted-text'> react</span>  using <span className='hightlighted-text'> context api</span>  and deployed on <span className='hightlighted-text'> firebase</span>.
          </li>
          <li>
            it's bakcend is written in <span className='hightlighted-text'> express.js</span>. Connect with database with help of <span className='hightlighted-text'> mongoose</span>. Backend is deplyed on <span className='hightlighted-text'> heroku</span>.
          </li>
          <li>
            It's databse is deployed on <span className='hightlighted-text'> mongodb cloud</span>.
          </li>
        </ul>
        <h2>What's different</h2>
        <p>Here i have used wallet address instead of email address.</p>

        <h2>What's under development</h2>
        <p>Here are few things currently under development..</p>
        <ul>
          <li>
            Integration to metamask and uphold wallet to verify user's address.
          </li>
          <li>
            Tweet and profile minting feature.
          </li>
          <li>
            Video and Gif uploading.
          </li>
        </ul>
        <div className='mySocial'>
          <div className='github'>
          <p>Fork me on</p>
          <AiOutlineGithub size={30} />
          </div>
          <div className='twitter'>
            <p>Connect on</p>
            <AiOutlineTwitter size={30}/>
          </div>
        </div>
    </div>
  )
}

export default Docs;