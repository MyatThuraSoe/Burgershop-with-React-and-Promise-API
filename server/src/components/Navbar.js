import React from "react";
import { Link } from 'react-router-dom';
import Logo from '../assets/img/burgerlogo.png';
export function Navbar(){
    return(
        <div className="navbar">
            <div className="webname">
               <img src={ Logo } /> <span>Glory Taste</span>
            </div>
            <div className="nav-menu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Order</Link></li>
                </ul>
            </div>
        </div>
    );
}