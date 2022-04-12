import React, { useState, useContext } from 'react';
import "./RecUser.css";
import profile2 from "../../assets/images/myBlack.png"
import { Link } from "react-router-dom"
import userContext from '../../context/users/userContext';
import {MdVerified} from "react-icons/md"

function RecUser(props) {
    let context = useContext(userContext)
    const [isFollowed, setisFollowed] = useState(0)
    const { promoted, name, address, aboutUser, backImage, following, isVip,  profileImg,  _id, followers, } = props;

    const { unfollowfunc, handleFollowFunc } = context;

    const userProfile = {
        name: name,
        address: address,
        backImage: backImage,
        profileImg: profileImg,
        followers: followers,
        following: following,
        isVip: isVip,
        aboutUser: aboutUser,
        _id: _id
    }

    const myProfileData = {
        userProfile: userProfile,
    }
    const token = localStorage.getItem("auth-token")
    const handleFollow = async () => {
        if (isFollowed === 0) {
            const followStatus = await handleFollowFunc(_id, token)
            if (followStatus === 200) {
                setisFollowed(1);
            }
        }
        else {
            const unfollowStatus = await unfollowfunc(_id, token)
            if (unfollowStatus === 200) {
                setisFollowed(0);
            };
        }
    }
    return <div className="recUser">
        <Link to="/profile" state={myProfileData}><img className="recoImage" src={profileImg !== "" ? profileImg : profile2} alt="recomended Users"></img></Link>
        <Link to="/profile" state={myProfileData} className='recomDetails'>
            <div className='recomUserName'>
                {name}
                {
                userProfile.isVip && <MdVerified color='skyblue'/>
              } 
                 <span className='recomUserId'> {address && address.slice(0, 4)}...{address && address.slice(-4)}</span>
            </div>
            <div className='recomUserId'>
            </div>
            <div className="recom-aboutUser">
                {aboutUser}
            </div>
            {promoted !== 0 ? <div className="promotedUser">
                promoted ..
            </div> :
                <></>
            }
        </Link>
        {
            isFollowed === 0 ? <div className="recomFollow" onClick={handleFollow}>
                Follow
            </div> : <div className="recomFollow" onClick={handleFollow}>
                Unfollow
            </div>
        }
    </div>;
}

export default RecUser;
