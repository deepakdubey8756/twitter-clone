import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import RecomNews from '../../components/extras/RecomNews';
import "./Messages.css"
import Profile2 from '../../assets/images/russiaWar.jpeg';
function Messages() {
  let navigate = useNavigate();

  const handleClose = ()=> {
    navigate(-1);
  }
  return (
    <div style={{color: "black"}} className="messages">
      <div className="back-arrow">
        <AiOutlineArrowLeft onClick={handleClose} />
      </div>
      <h2>What's happening</h2>
      <div className="recomNewsItems">
                <RecomNews totalTweets={'13.3k'} newsCat={"Politics"} keyWord={"Constitution"}/>
            </div>
            <div className="recomNewsItems">
            <RecomNews newsCat="War in ukrain" topic="Zelenskyy asks UN security council to remove Russian or dissolve and reform" tweetImage={Profile2}/>
            </div>
            <div className="recomNewsItems">
            <RecomNews newsCat="Bussiness" keyWord="Zukerberg" totalTweets={"9k"}/>
            </div>
            
            <div className="recomNewsItems">
            <RecomNews newsCat="Science" topic="Scientists have discovered a gigantic exoplanet that's still in the womb" />
            </div>
            <div className="recomNewsItems">
            <RecomNews newsCat="Bussiness" topic="HDFC Bank announces merger with mortages lender HDFC Ltd." tweetImage={Profile2}/>
            </div>
            <div className="recomNewsItems">
            <RecomNews newsCat="Politics" keyWord="president of US" />
            </div>
      </div>
  )
}

export default Messages;