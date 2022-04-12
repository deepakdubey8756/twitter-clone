
import React, { useState, useEffect, useRef, useContext } from 'react';
import "./UserTweeting.css";
import { AiOutlineFileGif, AiOutlineMeh, AiOutlineBarChart, AiOutlineClose, AiOutlinePicture, AiOutlineCalendar } from "react-icons/ai"
import bannerImage from "../../assets/images/myBlack.png"
import userContext from '../../context/users/userContext'

function UserTweeting(props) {
  const context = useContext(userContext);

  const {addTweet, addReply} = context;

  const [tweetBlock, settweetBlock] = useState(false)

  
  const {profImage, isReply, tweetId, totalReply, setTotalReply, handleTweetReplies, fetchTweetFunc} = props;


  const [tweet, setTweet] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fileImageRef = useRef(null);


  const handleOnChange = (event) => {
    setTweet(event.target.value);

  }
  useEffect(() => {
    if(image){
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      }
      reader.readAsDataURL(image);
    }
    else{
      setImagePreview(null)
    }
  }, [image])
  

  const token = localStorage.getItem("auth-token")

  
  const handleImageClick = (event) =>{
    event.preventDefault();
    fileImageRef.current.click();
  }




  const handleImageChange = (event) =>{
    const file = event.target.files[0];
    if(file){
      setImage(file);
    }
    else{
      setImage(null);
    }
  }



  const handleUnusedClick = (event) => {
    alert(`${event} functinality is not availble`)
  }


  const handleTweetSubmit =  async(_tweet, _imagePreview, _token) => {
    setImagePreview(null);
    setImage(null);
    setTweet("");
    settweetBlock(true)
    const myResponse = await addTweet(_tweet, _imagePreview, _token)
    if (myResponse.status === 200){
      fetchTweetFunc()
      settweetBlock(false)
    }
    else{
      alert("Unable to add tweet please try after some time");
      settweetBlock(false)
    }
    
  }



  
  // handling reply states on change....
  const handleReplySubmit = async (_tweet, _imagePreview) => {
    setImagePreview(null);
    setImage(null);
    setTweet("");
    settweetBlock(true);
    const myResponse = await addReply(_tweet, _imagePreview, tweetId, token)
    if(myResponse.status === 200){
      setTotalReply(totalReply + 1)
      handleTweetReplies();
      fetchTweetFunc()
      settweetBlock(false)
    }
    else{
      alert("Unable to add reply!. Please connect me on github for it.")
      settweetBlock(false)
    }
  }


  const handleImageClose = () => {
    setImagePreview(null);
    setImage(null);
  }

  return (
    <div className="tweetingSection">
      <div className='tweet-box'>
      {
        profImage?<img src={profImage} alt="deepak profile" />:
        <img src={bannerImage} alt="deepak profile" />
      }
      <div className='rest-section'>
        <div className="tweeting-userInputSection">
          <textarea  placeholder="What's happening" value={tweet} onChange={handleOnChange} />
        </div>
        <div className="tweeting-filesSection">
  
          <input type="file" style={{display: 'none'}} 
          ref={fileImageRef} 
          accept="image/*"
          onChange={handleImageChange}/>
        {/* uploading image  */}
        {imagePreview &&
        <img src={imagePreview} alt="user tweet twitter.com"/>}

        {imagePreview &&
        <AiOutlineClose className="image-close" onClick={handleImageClose}/>}
        
        
        </div>

        <div className="tweeting-bottomSection">
          <AiOutlinePicture size={20} onClick={handleImageClick} />
          <AiOutlineFileGif size={20} onClick={()=>handleUnusedClick("Gif")}/>
          <AiOutlineBarChart size={20} onClick={()=>handleUnusedClick("Stats")}/>
          <AiOutlineMeh size={20} onClick={()=>handleUnusedClick("Emojee")} />
          <AiOutlineCalendar size={20} onClick={()=>handleUnusedClick("Schedule")} />
        </div>
        </div>
      </div>  
      {
        parseInt(isReply)===0?<button className={tweet === "" && image === null ? "tweeting-tweetButton-block" : "tweeting-tweetButton"} onClick={()=>handleTweetSubmit(tweet, imagePreview, token)} disabled={tweetBlock}>
        tweet
      </button>:<button className={ tweet === "" && image === null ? "tweeting-tweetButton-block" : "tweeting-tweetButton"} onClick={()=> {handleReplySubmit(tweet, imagePreview)}} disabled={tweetBlock}>
        Add Reply
      </button>
      }
    </div>
   
  )
}

export default UserTweeting;