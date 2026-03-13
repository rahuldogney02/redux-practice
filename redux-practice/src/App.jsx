import './App.css'
import { createStore } from 'redux';
import {useState, useEffect} from 'react';
import ReduxCart from './redux/reducer-example';
import { productList } from '../productList';
function App() {

const initialState = {
  post: 23,
  name: "Rahul",
  age: 26,
  products: productList, // Fixed typo here
  cartItems: [],
  wishList: [],
};

const POST_INCREMENT = 'post/increment';
const POST_DECREMENT = 'post/decrement';
const BY_PAYLOAD = 'post/byPayload';
const CHANGE_NAME = 'changename';
const CART_ADDITEM = 'cart/addItem';
const CART_DECITEM = 'cart/decItem';
const CART_REMOVEITEM = 'cart/removeItem';

// 1. Used an empty object as default for action to prevent "undefined" errors
function reducer(state = initialState, action) {
    console.log("action",action.type)
    // if (action.type === POST_INCREMENT) {
    //     return { ...state, post: state.post + 1 , name:"Manas" };
    // }else if(action.type === POST_DECREMENT){
    //     return {...state, post: state.post -1 , name: "Decrement"}
    // }else if(action.type === BY_PAYLOAD){
    //     return {...state, age: state.age + action.payload}
    // }
    // console.log('reducer triggered');
    // return state;

    // Clean Code
    switch(action.type){
        case  POST_INCREMENT:
            return {...state, post:state.post + 1};
        case POST_DECREMENT:
            return {...state, age:state.age - 1};
        case CHANGE_NAME:
            return {...state, name:'MANAS'};
        case BY_PAYLOAD:
            return {...state, name:'Payload', post: state.post+action.payload};
        case CART_ADDITEM:
          return {...state, cartItems: [...state.cartItems, action.payload] };
        case CART_REMOVEITEM:
          return {...state, cartItems: state.cartItems.filter((item) => item.productId !== action.payload.productId)}
        case CART_DECITEM:
          return {...state, cartItems: state.cartItems.map((cartItem)=>{
            if(cartItem.productId === action.payload.productId){
              return {...cartItem, quantity:cartItem.quantity - 1}
            }
          })};
        default: 
          return state;
    }
    
}

// Pass the function name 'reducer', do NOT invoke it with ()
const store = createStore(reducer,   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__?.());

console.log('Initial State:', store.getState());

store.dispatch({ type: POST_INCREMENT });

console.log('Updated State:', store.getState());



store.dispatch({type : BY_PAYLOAD, payload:10})

console.log("By Payload 10 increase", store.getState())

store.dispatch({type:CART_ADDITEM,payload:{ productId: 2, quantity: 12 }})
store.dispatch({type:CART_ADDITEM,payload:{ productId: 1, quantity: 11 }})
store.dispatch({type:CART_ADDITEM,payload:{ productId: 3, quantity: 10 }})
store.dispatch({type:CART_ADDITEM,payload:{ productId: 4, quantity: 16 }})

console.log(store.dispatch({type:CART_ADDITEM,payload:{ productId: 2, quantity: 1 }}))

store.dispatch({type:CART_REMOVEITEM,payload:{ productId: 3 }})
console.log("Yes remove: ",store.dispatch({type:CART_REMOVEITEM,payload:{ productId: 3}}))
console.log(store.dispatch({type:CART_DECITEM,payload:{ productId: 2 }}))

console.log("Updated Cart Items based on productId",store.getState().cartItems)

store.subscribe(()=>{
    console.log(store.getState())
})

console.log(store.dispatch({type:POST_DECREMENT}))



// **** test / check / explore
  const [count, setCount] = useState(store.getState().post);
  useEffect(() => {
    setTimeout(()=>{
  store.dispatch({type:CHANGE_NAME})
},2000)

    const unsubscribe = store.subscribe(() => {
      setCount(store.getState().post); // Update React state whenever Redux changes
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const postCount = () => {
    store.dispatch({ type: POST_INCREMENT });
  };
  return (
    <>
      <h1>React Redux</h1>
      <button onClick={postCount}>POST COUNT</button>
      <span>{count}</span>
      
      <hr/>
      
    </>
  )
}

export default App
