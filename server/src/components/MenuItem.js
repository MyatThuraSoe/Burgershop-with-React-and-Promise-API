import React from 'react';


export function MenuItem(props) {
    const Image = require(`./../assets/img/${props.img}`).default;
    // the above method should be noted down ---- that damn .default trick
    return(
        <div className='menuItem'>
            {/* {Image} */}
            <div className='itemImageContainer'><img src={ Image }/></div>
            <div className='itemTextContainer'>
                <div className='itemName'>{ props.name }</div> 
                <div className='itemDetails'>( { props.details } )</div>
                <div className='itemPrice'>$ { props.price }</div>
            </div>
        </div>
    );
}
