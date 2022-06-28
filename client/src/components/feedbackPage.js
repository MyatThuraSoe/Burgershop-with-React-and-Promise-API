import React from "react";
import { useState, useRef, useEffect } from "react";
import feedbackList from "./feedbackList.js";
import { Feedback } from "./feedback.js";
export function FeedbackPage() {
    const [showMore, setShowMore] = useState(false);
    const fblistRef = useRef();
    useEffect(() => {
        if(showMore){
            fblistRef.current.style.maxHeight = 'unset';
        }else{
            fblistRef.current.style.maxHeight = '60vh';
            
        }
    },[showMore]);
    return(
        <div className="feedbackPage">
            <div className="heading">
                <h3>Feedbacks by our customers</h3>
            </div>
            <div className="feedback-container">
                <div className="feedbacklist" ref={fblistRef}>
                    {
                        feedbackList.map((item)=>{
                            return(
                                <Feedback key={item.id} {...item}/>
                            );
                        })
                    }
                </div>
            </div>
            <div className="showDiv">
                <button className="showButton" onClick={()=> setShowMore(!showMore)}>{ !showMore ? 'Show More' : 'Show less' }</button>
            </div>
        </div>
    );
}