import React from "react";
import { MenuItem } from './MenuItem.js';
import { itemList } from './MenuItemList.js';

export function Menu(){

    return(
        <div className="menu" id='menuPage' name='menuPage'>
           <h3 className="menu-heading">"Special Menu"</h3>
            <div className="menuListContainer">
                {itemList.map((item)=>{

                    return(
                        <MenuItem key={item.id} {...item}/>
                    )
                })}
                
            </div>
            <div className="menu-curve">
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
        </div>
    );
}