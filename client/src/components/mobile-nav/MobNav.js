import React, {useContext} from 'react';
import "./MobNav.css";
import { AiOutlineAlignRight, AiOutlineBell, AiOutlineHome, AiOutlineUser } from "react-icons/ai"
import {FaRegNewspaper} from "react-icons/fa"
import { Link } from "react-router-dom";
import userContext from '../../context/users/userContext';

function MobNav() {

    const context = useContext(userContext);
    const {myProfile} = context

    const myProfileData = {
        userProfile: myProfile,
    }
    return <nav className="mobile-navbar">
        <Link to="/" className="mobile-navOptions">
                <AiOutlineHome size={30}/>
        </Link>
            <Link to="/express" className="mobile-navOptions">
                <AiOutlineAlignRight size={30}/>
            </Link>
            <Link to='/notification' className="mobile-navOptions">
            <AiOutlineBell size={30}/>
            </Link>
            <Link to="/profile" state={myProfileData} className="mobile-navOptions" >
                <AiOutlineUser size={30}/>
            </Link>
            <Link to="/news"  className="mobile-navOptions">
                <FaRegNewspaper size={30}/>
            </Link>
    </nav>;
}

export default MobNav;
