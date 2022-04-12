import React, {useState} from 'react';

// importing pages
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import Footer from "./components/footer/Footer"
import UserState from './context/users/UserState';
import "./App.css"
import Profile from './pages/profile/Profile';
import Notification from './pages/notification/Notification';
import Setting from './pages/settings/Setting';
import Messages from './pages/Messages/Messages';
import Express from './pages/express/Express';
import ReplyPage from './pages/replyPage/ReplyPage';
import Login from "./pages/authentication/login/Login"
import Signup from "./pages/authentication/signup/Signup"
import Docs from './pages/docs/Docs';
import Following from './pages/following/Following';
import MobNav from './components/mobile-nav/MobNav';



import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  let token = localStorage.getItem("auth-token")


  const [mytoken, setmytoken] = useState(token)

  let width = window.screen.width
  

  if(mytoken){

   if(width < 650){
    return <div className='mobile-mainPage'>
    <UserState>
    <BrowserRouter>
    <div className="mobile-pages-container">

        <Routes>
          <Route path="/" element={<Home />}/>
            <Route  path="/profile" element={<Profile />} />
            <Route  path="/notification" element={<Notification />} />
            <Route  path="/setting" element={<Setting />} />
            <Route  path="/express" element={<Express />} />
            <Route  path="/reply" element={<ReplyPage/>}/>
            <Route  path="/following" element={<Following/>}/>
            <Route  path="/news" element={<Messages/>}/>
            <Route  path="/docs" element={<Docs/>}/>
            <Route path="/*" element={<Home />} />
        </Routes>
    </div>
    <div className="mobile-sidebar-container">
      <MobNav/>
    </div>
    </BrowserRouter>
    </UserState>
  </div>
   }
   else{

    return <div className='mainPage'>
    <UserState>
    <BrowserRouter>
    <div className="sideBar-container">
      <Navbar></Navbar>
    </div>
    <div className="pages-container">
        <Routes>
          <Route path="/" element={<Home/>}/>
            <Route  path="/profile" element={<Profile />} />
            <Route  path="/notification" element={<Notification />} />
            <Route  path="/setting" element={<Setting setmytoken={setmytoken}/>} />
            <Route  path="/express" element={<Express />} />
            <Route  path="/reply" element={<ReplyPage/>}/>
            <Route  path="/following" element={<Following/>}/>
            <Route  path="/news" element={<Messages/>}/>
            <Route  path="/docs" element={<Docs/>}/>
            <Route path="/*" element={<Home />} />

        </Routes>
    </div>
    <div className="footer-container">
      <Footer />
    </div>
    </BrowserRouter>
    </UserState>
  </div>
   }
  }
  else{

    return <div > 
    <UserState>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login mytoken={mytoken} setmytoken={setmytoken}/>}/>
          <Route path="/signup" element={<Signup  mytoken={mytoken} setmytoken={setmytoken}/>}/>
          <Route path="/docs" element={<Docs/>}/>
          <Route path="/*" element={<Login mytoken={mytoken} setmytoken={setmytoken}/>}/>
        </Routes>
    </BrowserRouter>
    </UserState>
  </div> 
  }
}

export default App;
