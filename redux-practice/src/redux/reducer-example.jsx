import { createStore } from "redux";
import { productList } from "../../productList.js";
// const initialState = {
//     post: 23,
//     name: "Rahul",
//     age: 26
// };

const ReduxCart = () => {
  const rinitialState = {
    products: productList,
    cartItems: [],
    wishList: [],
  };

  // 1. Used an empty object as default for action to prevent "undefined" errors
  function reducer(state = rinitialState, action) {
    console.log("action", action.type);
    console.log("yes I am state", state);
    switch(action.type){
      case 'cart/addItem':
        return {...state, cartItems: [...state.cartItems, action.payload] }
      default : state
    }
    return state
  }

  // Pass the function name 'reducer', do NOT invoke it with ()
  const store = createStore(
    reducer,
    typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
  );
  console.dir(store);

  store.dispatch({
    type: "cart/addItem",
    payload: { productId: 2, quantity: 1 },
  });
  return(
    <>
    <h1>Hello</h1>
    </>
  );
};

export default ReduxCart;
