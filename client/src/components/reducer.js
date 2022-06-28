export const reducer = (state, action) => {
  let totalitemcounter = ()=>{
      let c = 0;
      state.cart?.map(item =>{
        c = item.quantity + c;
      });
      return c;
    }
    let totalCostCounter = ()=>{
      let c = 0;
      state.cart?.map(item =>{
        c = (parseFloat(item.price) * item.quantity) + c;
      });
      return c;
    }
  if (action.type === 'ADD_ITEM') {
    let cartIndex = state.cart.findIndex((obj => obj.id == action.payload.id));
    let itemsIndex = state.items.findIndex((obj => obj.id == action.payload.id));
    
    if(cartIndex == '-1')
    {
      state.items[itemsIndex].quantity = action.payload.quantity;
      const newCart = [...state.cart, action.payload];
      state = {
        ...state,
        cart: newCart
      }
      
        return {
            ...state,
            totalItems: totalitemcounter(),
            totalCost: totalCostCounter()
        };
    }
    else{
      
      state.items[itemsIndex] ={
        ...state.items[itemsIndex],
        quantity: action.payload.quantity
      }
      let myArray = state.cart;
      myArray[cartIndex] = action.payload;
      state = {
        ...state,
        cart: myArray
      }
      
        return {
            ...state,
            totalItems: totalitemcounter(),
            totalCost: totalCostCounter()
        };
    }
  
  }
  if (action.type === 'REMOVE_ITEM') {
    let cartIndex = state.cart.findIndex((obj => obj.id == action.payload.id));
    let itemsIndex = state.items.findIndex((obj => obj.id == action.payload.id));
    state.items[itemsIndex] ={
        ...state.items[itemsIndex],
        quantity: action.payload.quantity == 0 ? 0 : action.payload.quantity
      }
    let myArray = state.cart;
    if(action.payload.quantity == 0){
      myArray = myArray.filter(item=>{
        return item.id !== action.payload.id;
      });
    }
    else{
      myArray[cartIndex] = action.payload;
    }
    state = {
        ...state,
        cart: myArray
      };
    
  
        return {
            ...state,
            totalItems: totalitemcounter(),
            totalCost: totalCostCounter()
        };
  
  }
  if(action.type === 'REMOVE_ALL'){
    
    state.items.map(item =>{
      item.quantity = 0
    });
    return{
      ...state,
      cart:[],
      totalItems: 0,
      totalCost: 0
    }
  }
  if(action.type === 'REMOVE_ONE_ITEM'){
    
    let cartArray = state.cart.filter((item)=>{
      return item.id != action.payload.id;
    });
    let itemArray = state.items.map((item)=>{
      if(item.id == action.payload.id){
        item.quantity = 0;
      }
      return item;
    });
    return{
      ...state,
      items: itemArray,
      cart: cartArray,
      totalItems: totalitemcounter(),
      totalCost: totalCostCounter()
    }
  }
  
  throw new Error('no matching action type');
};
