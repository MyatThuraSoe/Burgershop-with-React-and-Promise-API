import React from "react";
import phoneIcon from '../assets/img/phoneicon.png';
export function Contact(){
    return(
        <div className="Contact" id='contact'>
            <div className="contact-head">
				<h3>Contact</h3>
				<div className="contact-icons">
					<a href="mailto: myatthu.dev@gmail.com"><img src={require("../assets/img/gmailicon.png").default}/></a>
					<a href="https://www.linkedin.com/in/myatthurasoe/"><img src={require("../assets/img/linkedinicon.png").default}/></a>
					<a href="https://github.com/MyatThuraSoe"><img  src={require("../assets/img/githubicon.png").default}/></a>
					<a href="https://www.facebook.com/myatthu.leo"><img src={require("../assets/img/fbicon.png").default}/></a>
				</div>
                <h5><img src={phoneIcon}/><span>+959776697907</span></h5>
			</div>
            <div className="contact-body">
                <form action="http://localhost:5000/feedback" method="post">
                <div className="left-div">
                    <div>
                        <input type='text' name="contactName" id='contactName' className="contactName" placeholder="Name"/>
                    </div>
                    <div>
                        <input type='email' name="contactEmail" id='contactEmail' className="contactEmail" placeholder="Email"/>
                    </div>
                    <div>
                        <input type='text' name="contactPhone" id='contactPhone' className="contactPhone" placeholder="Phone Number"/>
                    </div>
                </div>
                <div className="right-div">
                    <textarea id="contactMessage" name="contactMessage" className="message" placeholder="Message"></textarea>
                    <button className="contact-submit" type="submit">
                        Submit
                    </button>
                </div>
                </form>
            </div>
            
        </div>
    );
}
