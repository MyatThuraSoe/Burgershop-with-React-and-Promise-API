import React from 'react';

export function Feedback(props) {
    const Image = require(`./../assets/img/${props.img}`);
    const goldStar = require(`./../assets/img/goldStar.png`);
    const blankStar = require(`./../assets/img/blankStar1.png`);
    let tag = [];
    function getStars(rating){
        for(let j=0; j < 5; j++){
           if(j<rating){
                tag = [ ...tag, <img key={j} src={goldStar} className='stars' alt='star icon'/>];
            }else{
                tag = [ ...tag,  <img  key={j} src={blankStar} className='stars' alt='star icon'/>];
            }
        }
        return tag;
    }
    return(
        <div id='feedbackPage' className='feedback'>
            <div className='feedback-profile-container'>
                <img src={Image} alt='feedback profile icon'/>
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