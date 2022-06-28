import React from "react";
import Canvas from '../assets/img/beefBurger.jpg';
import Burger1 from '../assets/img/burger1.jpg';
import Burger2 from '../assets/img/burger2.jpg';
import Burger3 from '../assets/img/burger3.jpg';
export function About() {
    return(
        <div className="about">
            <div className="left">
                <ul class="honeycomb">
                    <li class="honeycomb-cell">
                        <img class="honeycomb-cell_img" src={Burger3}/>
                        <div class="honeycomb-cell_title"></div>
                    </li>
                </ul>
            </div>
            
            <div className="middle">
                <h3>About us</h3>
                <p>
                    The shop is well-known for its attentive and delightful service. Our open-plan kitchen is located on the second floor of our building with ample sunlight. With our new, modern kitchen, it is now possible to enjoy our cakes, pastries and cakes made with fresh artisan ingredients. We have a wonderful bakery counter where customers sit and enjoy our delicious bugeer, hotdog, fries daily. We offer a separate bakery counter where customers can enjoy our pizza.
                </p>
            </div>

            <div className="right">
                <ul class="honeycomb">
                    <li class="honeycomb-cell">
                        <img class="honeycomb-cell_img" src={Burger2}/>
                        <div class="honeycomb-cell_title"></div>
                    </li>
                </ul>
            </div>
            
            
            
        </div>
    );
}