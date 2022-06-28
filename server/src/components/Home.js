import React from "react";
import Homeburger from '../assets/img/homeburger.png';
export function Home(){
    return(
        <div id='home' className="home">
            <div className="homewave">
                  <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                    d="M600 112.77C268.63 112.77 0 65.52 0 7.23V120h1200V7.23c0 58.29-268.63 105.54-600 105.54Z"
                    className="shape-fill"
                    />
                </svg>
             </div>
             <div className="home-img-container">
                <img src={ Homeburger }/>
            </div>
            <div className="home-text-container">
                <span id="home-text-big">It's Burger O'clock</span><br/>
                <span id="home-text-normal">Shouldn't miss it.</span><br/>
                <button>Let's taste</button>
            </div>
            
        </div>
    );
}