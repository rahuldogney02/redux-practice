import { createStore } from 'redux';

const initialState = {
    post: 23,
    name: "Rahul",
    age: 26
};

const POST_INCREMENT = 'post/increment';
const POST_DECREMENT = 'post/decrement';
const BY_PAYLOAD = 'post/byPayload';

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
        case BY_PAYLOAD:
            return {...state, name:'Payload', post: state.post+action.payload}
        default: 
            return state;
    }
    
}

// Pass the function name 'reducer', do NOT invoke it with ()
const store = createStore(reducer);

console.log('Initial State:', store.getState());

store.dispatch({ type: POST_INCREMENT });

console.log('Updated State:', store.getState());



store.dispatch({type : BY_PAYLOAD, payload:10})

console.log("By Payload 10 increase", store.getState())

store.subscribe(()=>{
    console.log(store.getState())
})

console.log(store.dispatch({type:POST_DECREMENT}))


