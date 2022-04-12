import React, {useEffect, useContext} from 'react';
import "./Footer.css"
import RecUser from '../recom/RecUser';
import { AiOutlineSearch} from 'react-icons/ai';

import RecomNews from '../extras/RecomNews';
import Profile2 from '../../assets/images/russiaWar.jpeg';
import userContext from '../../context/users/userContext';

import { Link } from 'react-router-dom';

function Footer() {
    let context = useContext(userContext);

    const {handleRecomUser, recomUser, myProfile, getUser} = context;


    const token = localStorage.getItem("auth-token")
    useEffect(()=>{
        if(!myProfile.profileImg){
          getUser(token);
        }
      })

  useEffect(() => {
    handleRecomUser(token);
}, [])

    const handleSearchfunc = ()=> {
        alert("Search functionality is not availble yet. Until then stay in the loop.")
    }


    return <div className="footer">
        <div className="search-container">
            <AiOutlineSearch size={25} onClick={handleSearchfunc}/>
            <input placeholder='Search Twitter' />
        </div>
        <div className="recomendation">
            <h2>You might like</h2>
            {
            recomUser.slice(0, 2) && recomUser.slice(0, 2).map((item, index) => {
          return <RecUser key={item._id} name={item.name} address={item.address} backImage={item.backImage} followers={item.followers} following={item.following} isVip={item.isVip} likedTweets={item.likedTweets} profileImg={item.profileImg} replies={item.rePlies} reTweets={item.reTweets} userTweets={item.userTweets} aboutUser={item.aboutUser} _id={item._id} promoted={index%2 === 0?1:0}/>
        })}
            <Link className="showMore" to="/express">Show more</Link>
        </div>
        <div className="recomendation">
            <h2>What's happening</h2>
            <div className="recomNewsItems">
            <RecomNews newsCat="War in ukrain" topic="Zelenskyy asks UN security council to remove Russian or dissolve and reform" tweetImage={Profile2}/>
            </div>
            <div className="recomNewsItems">
            <RecomNews newsCat="Bussiness" keyWord="Zukerberg" totalTweets={"9k"}/>
            </div>
            <Link className="showMore" to="/news">Show more</Link>
        </div>
        <div className='footer-bottom'>
            <a href="/">Terms of services</a>
            <a href="/">Privacy Policy</a>
            <a href="/">Cookie Policy</a>
            <a href="/">Accessibility</a>
            <a href="/">Ads info</a>
            <a href="/">More..</a>
            <a href="/">&copy; Twitter, Inc..</a>
        </div>
        <div className="technical-details">
        <Link to="/docs"><strong>Features: </strong> Read all of the technical details and documentations.</Link>
        </div>
    </div>;
}

export default Footer;
