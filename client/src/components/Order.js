
import React from "react";
import { useNavigate } from 'react-router-dom';
import { createContext, useReducer } from "react";
import ShoppingCart from '../assets/img/shoppingCart.png';
import RemoveIcon from '../assets/img/remove.png';
import { itemList } from './MenuItemList.js';
import { OrderItem } from './orderItem.js';
import { reducer } from './reducer.js';
import axios from 'axios';


import * as yup from 'yup';
const newItemList = itemList.map((item)=>
    (
        {
            id: item.id, 
            name: item.name,
            img: item.img,
            price: item.price,
            quantity: 0
        } 
    )
);

const shopState = {
    items: newItemList,
    cart:[],
    customerDetails:{
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        customerAddress: ''
    },
    totalItems: 0,
    totalCost: 0
};
export const StateContext = createContext();
export function Order() {
    const [state,dispatch] = useReducer(reducer,shopState);
    const [showCart, setShowCart] = React.useState(false);
    const navigate = useNavigate();
    async function checkInputs(){
        let validator;
        let schema = yup.object().shape({
                name: yup.string().required('Required'),
                phone: yup.string().required().matches(/^[0-9]+$/, "Must be only digits").min(8, 'Minimum 8 digits').max(11, 'Maximum 11 digits'),
                email: yup.string().required().email(),
                address: yup.string().required()
            });
        await schema
                .isValid({
                    name: state.customerDetails.customerName,
                    phone: state.customerDetails.customerPhone,
                    email: state.customerDetails.customerEmail,
                    address: state.customerDetails.customerAddress
                }).then(function (valid) {
                    console.log('input validation is ',valid);
                    validator = valid;
                });
                console.log('validator is ', validator);
        return validator;
    }
    function postOrder(){
        var answer = window.confirm("Order Now?");
        if (answer) {
            axios.post(`https://glorytaste.herokuapp.com/order`,{
            data:{
                name: state.customerDetails.customerName,
                phone: state.customerDetails.customerPhone,
                email: state.customerDetails.customerEmail,
                address: state.customerDetails.customerAddress,
                cart: state.cart,
                totalCost: state.totalCost
            }}).then(res => {
                if (res.status == '200'){
                    dispatch({
                        type: "REMOVE_ALL"
                    });
                    state.customerDetails.customerName = '';
                    state.customerDetails.customerPhone = '';   
                    state.customerDetails.customerEmail = '';
                    state.customerDetails.customerAddress = '';
                    console.log(res.status);
                    window.alert('order sent');
                    navigate('/');
                }
            });
        }
        
        
       
    }
    
    return(
        <div className="orderPage">
           <h3 className="heading">Order Food</h3>
           <div className="orderSection">
               <div className="cart-container">
                    <div className="cart">
                        <div className="cartImage" onClick={()=> setShowCart(!showCart)}><img src={ShoppingCart}/></div>
                        <div className="cartSpace" onClick={()=> setShowCart(!showCart)}>
                            <div>Total Items: <span>{state.totalItems}</span></div>
                            <div>Total Price: <span>{state.totalCost} $</span></div>
                        </div>
                        <div className="clickToView" onClick={()=> setShowCart(!showCart)}><span>{ !showCart ? 'Click here to View all' : 'Go back'}</span></div>
                        <div className="removeAll" onClick={()=>{
                            dispatch({
                                type: "REMOVE_ALL"
                            });
                        }}><span>Remove all</span></div>
                    </div>
                    <div className="cart-details" style={ {display: !showCart ? 'none' : 'block'} }>
                        <table>
                            <thead>
                            <tr className="table-head">
                                <th>No</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {state.cart.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td className="no">{index+1}</td>
                                        <td className="name">{item.name}</td>
                                        <td className="quantity-buttons"><button onClick={()=>{
                                                dispatch({
                                                    type: "REMOVE_ITEM",
                                                    payload: {
                                                        id: item.id,
                                                        name: item.name,
                                                        price: item.price,
                                                        quantity: item.quantity-1
                                                    }
                                                });
                                                
                                            }    
                                            }>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={()=>dispatch({
                                                    type: "ADD_ITEM",
                                                    payload: {
                                                    id: item.id,
                                                    name: item.name,
                                                    price: item.price,
                                                    quantity: item.quantity+1
                                                    }
                                                })
                                            }>+</button>
                                        
                                        </td>
                                        <td className="price">{item.price} $</td>
                                        <td className="totalprice">{item.quantity * parseFloat(item.price)} $</td>
                                        <td className="removeImg"><img src={RemoveIcon} onClick={()=>{
                                            dispatch({
                                                type: "REMOVE_ONE_ITEM",
                                                payload: {
                                                    id: item.id
                                                }
                                            });
                                        }
                                        }/></td>
                                    </tr>
                                );
                            })}
                            <tr className="table-footer">
                                <td></td>
                                <td colSpan={2}>Total</td>
                                <td></td>
                                <td>{state.totalCost} $</td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>

                        <div className='CustomerInfo'>
                            <h4>**Enter your Information so that we can deliver your order</h4>
                            <div>
                                <label htmlFor="customerName">Name</label>
                                <input type='text' id='customerName' name='customerName' placeholder="Enter your name" onChange={(e)=>{
                                    e.preventDefault();
                                    state.customerDetails.customerName = e.target.value;
                                }}/>
                            </div>
                            <div>
                                <label htmlFor="customerPhone">Phone Number</label>
                                <input type='text' id='customerPhone' name='customerPhone' placeholder="Enter your phone number" onChange={(e)=>{
                                    e.preventDefault();
                                    state.customerDetails.customerPhone = e.target.value;
                                }}/>
                            </div>
                            <div>
                                <label htmlFor="customerEmail">Your Email</label>
                                <input type='email' id='customerEmial' name='customerEmail' placeholder="Enter your email" onChange={(e)=>{
                                    e.preventDefault();
                                    state.customerDetails.customerEmail = e.target.value;
                                }}/>
                            </div>
                            <div>
                                <label htmlFor="customerAddress">Delivery Address</label>
                                <textarea id='customerAddress' name='customerAdddress' placeholder="Enter your address" onChange={(e)=>{
                                    e.preventDefault();
                                    state.customerDetails.customerAddress = e.target.value;
                                }}/>
                            </div>
                            <div className="submitOrder">
                                <button type="submit" onClick={async ()=>{
                                    let check = await checkInputs();
                                    if (check){
                                        postOrder();
                                    }else{
                                        alert('please enter only valid inputs');
                                    }
                                }
                                }>Order Now</button>
                            </div>
                        </div>

                    </div>
               </div>
                
                <div className="itemContainer" style={ {display: !showCart ? 'grid' : 'none'} }>
                    {state.items.map((item,index)=>{
                       
                        return(
                            <StateContext.Provider value={{state,dispatch,index}} key={ index }>
                                <OrderItem key={item.id} {...item}/>
                            </StateContext.Provider>       
                        )
                    })}
                </div>
           </div>
        </div>
    );
}
