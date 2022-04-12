import React, {useContext} from 'react';
import "./Navbar.css";
import twitterLog from "../../assets/images/myBlack.png"

import { AiOutlinePlusCircle, AiOutlineAlignRight, AiOutlineBell, AiOutlineHome, AiOutlineUser, AiOutlineTwitter} from "react-icons/ai"
import { Link } from "react-router-dom";
import userContext from '../../context/users/userContext';
import { MdVerified } from "react-icons/md"
import { FaRegNewspaper } from "react-icons/fa"

function Navbar() {

    const context = useContext(userContext);
    const {myProfile} = context

    const handleMinting = () => {
        alert("Minting function is currently under development. Until then stay tuned")
    }
    const myProfileData = {
        userProfile: myProfile,
    }
    return <nav className="navbar">
            <AiOutlineTwitter className='twitter-logo'/>  
        <div className="twitterNavs">
        <div className="navOptions">
                <Link to="/" className="navOptions-black"><AiOutlineHome size={30}/> </Link>
                <Link to="/" className="navOptions-name">home</Link>
        </div>
            <div className="navOptions">
                <Link to="/express" className="navOptions-black"><AiOutlineAlignRight size={30}/> </Link>
                <Link to="/express" className="navOptions-name">explore</Link>
            </div>
            <div className="navOptions">
                <Link to="/notification" className="navOptions-black"><AiOutlineBell size={30}/> </Link>
                <Link to="/notification" className="navOptions-name">notification</Link>
            </div>
            <Link to="/profile" state={myProfileData} className="navOptions" >
                <p  className="navOptions-black"><AiOutlineUser size={30}/></p>
                <p  className="navOptions-name">profile</p>
            </Link>
            <div  className="navOptions">
                <Link to="/news"  className="navOptions-black"><FaRegNewspaper size={30}/> </Link>
                <Link to="/" className="navOptions-name">news</Link>
            </div>
        </div>
        <div className="tweetOption" onClick={handleMinting}>
            Mint
        </div>
        <div className="mobileTweetOption" onClick={handleMinting}>
            <AiOutlinePlusCircle size={30} />
        </div>
        <div className="userDetails-container">
            <div className="userImage">
            {
                myProfile.profileImg ? <img src={myProfile.profileImg} alt="user Twitter.co" />: <img src={twitterLog} alt="user Twitter.co" />
            }
                
            </div>
            <div className="userDetails">
                <div className='userName'>
                    {
                       myProfile.name ? myProfile.name: <p>unkown User</p>
                    }
                    {
                myProfile.isVip && <MdVerified color='skyblue'/>
              }
                </div>
                <div className="userId">
                {
                    myProfile.address? `${myProfile.address.slice(0, 4)}...${myProfile.address.slice(-5)}`:<p>unkownId</p>
                }
                </div>
            </div>
        </div>
    </nav>;
}

export default Navbar;
