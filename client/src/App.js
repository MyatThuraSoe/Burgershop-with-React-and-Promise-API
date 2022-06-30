import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.scss";
import "./responsive.scss";

import { Navbar } from "./components/Navbar.js";
import { Home } from "./components/Home.js";
import { Menu } from "./components/Menu.js";
import { About } from "./components/about.js";
import { FeedbackPage } from './components/feedbackPage.js';
import { Contact } from './components/contact.js';
import { Footer } from "./components/footer.js";
import { ErrorPage } from "./components/ErrorPage.js";
import { Order } from "./components/Order.js"; 
import axios from "axios";


function FirstPage(){
  return(
    <>
      <Home/>
      <Menu/>
      <About/>
      <FeedbackPage />
      <Contact/>
    </>
  )
}
function App(){
  
  axios.get(`https://glorytaste.herokuapp.com/session`)
      .then(res => {
        console.log('session id is ', res.data);
      });
  // if(sessionId){
  //   axios.get(`http://localhost:5000/session`)
  //     .then(res => {
  //       sessionStorage.setItem("sessionId", res.data);
  //     });
  // }
  // axios.get(`http://localhost:5000/session`)
  //     .then(res => {
  //       sessionStorage.setItem("sessionId", res.data);
  //     });
  // const sessionId = window.sessionStorage.getItem('sessionId');
  // console.log('session id is ',sessionId);
  //  fetch('http://localhost:5000/session', { 
  //         method: "GET",
  //         mode: 'no-cors'
  //     }).then((res) => console.log('res is ', res.json()));
  //   let sid = window.sessionStorage.getItem("session");
  //   if(sid != null){
  //     console.log('Yes session exits', sid);
  //   }else{
  //     console.log('no session');
  //     fetch('http://localhost:5000/session', { 
  //         method: "GET"
  //     }).then((res) => console.log(res));
  //     console.log(sid);
  //     window.sessionStorage.setItem("session", sid);
  //   }
	 
    return(

       
        <BrowserRouter className='App'>
         <Navbar/>
          <Routes>
            <Route path="/" element={<FirstPage />}/>
            <Route path="/shop" element={<Order />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
        
    );
};

export default App;
