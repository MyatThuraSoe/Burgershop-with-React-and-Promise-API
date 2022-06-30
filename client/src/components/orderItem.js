import React from 'react';
import { useContext } from 'react';
import { StateContext } from "./Order.js";

export function OrderItem(props) {
    const context = useContext(StateContext);
    const Image = require(`./../assets/img/${props.img}`);

    
    const AddOrRemoveButton = ()=>{
        return(
            <div className='addorRemoveButton'>
                <span onClick={()=>{
                    context.dispatch({
                            type: "REMOVE_ITEM",
                            payload: {
                                id: props.id,
                                name: props.name,
                                price: props.price,
                                quantity: props.quantity-1
                            }
                        });
                    
                }    
                    }>-</span>
                <span>{context.state.items[context.index].quantity}</span>
                <span onClick={()=>context.dispatch({
                        type: "ADD_ITEM",
                        payload: {
                          id: props.id,
                          name: props.name,
                          price: props.price,
                          quantity: props.quantity+1
                        }
                    })}>+</span>
            </div>
        );
    };
    const AddToCartButton = ()=>{
        return(
            <div className='unselected-button' onClick={()=>{
                context.dispatch({
                        type: "ADD_ITEM",
                        payload: {
                          id: props.id,
                          name: props.name,
                          price: props.price,
                          quantity: props.quantity+1
                        }
                    });
            } }>
                Add to cart
            </div>
        );
    };
    // the above method should be noted down ---- that damn .default trick
    return(
        <div className='cartItem'>
            <div className='cartItemImageContainer'><img src={ Image }/></div>
            <div className='cartItemTextContainer'>
                <div className='itemName'>{ props.name }</div> 
                <div className='itemPrice'>$ { props.price }</div>
            </div>
            <div>{ context.state.items[context.index].quantity == 0 ? AddToCartButton() : AddOrRemoveButton()}</div>
        </div>

    );
}
