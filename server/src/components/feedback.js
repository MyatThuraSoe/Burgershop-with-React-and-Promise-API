import React from 'react';

export function Feedback(props) {
    const Image = require(`./../assets/img/${props.img}`).default;
    const goldStar = require(`./../assets/img/goldStar.png`).default;
    const blankStar = require(`./../assets/img/blankStar1.png`).default;
    let tag = [];
    function getStars(rating){
        for(let j=0; j < 5; j++){
           if(j<rating){
                tag = [ ...tag, <img key={j} src={goldStar} className='stars'/>];
            }else{
                tag = [ ...tag,  <img  key={j} src={blankStar} className='stars'/>];
            }
        }
        return tag;
    }
    return(
        <div id='feedbackPage' className='feedback'>
            <div className='feedback-profile-container'>
                <img src={Image}/>
            </div>
            <div className='feedback-text-container'>
                <div className='feedback-top'>
                    <span className='feedback-name'>{props.name}</span>
                    <span className='feedback-rating'> 
                    {
                        getStars(props.stars)
                    }
                    </span> 
                </div>
                <div className='feedback-text'>
                    {props.review}
                </div>
            </div>
        </div>
    );
}