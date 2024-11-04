import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import {thunk} from 'redux-thunk';

//action name constants
const inc = 'user/increment';
const dec = 'user/decrement';
const incByAmt = 'user/incrementByAmt';
// const init = 'user/initial';
const getAccUserPending = 'user/getUser/pending';
const getAccUserFulfilled = 'user/getUser/fulfilled';
const getAccUserRejected = 'user/getUser/rejected';
const incBonus = 'bonus/incrementBonus';

const store = createStore
(combineReducers({
    user: userReducer, 
    bonus: bonusReducer
}), 
    applyMiddleware(logger.default, thunk));
 

const history = [];

function userReducer(state= {amount:1}, action){

    switch (action.type) {
        case inc:
            return {amount: state.amount + 1};
        case dec:
            return {amount: state.amount - 1};
        case incByAmt:
            return {amount: state.amount + action.payload}
        case init:
            return {amount: action.payload}
        default:
            return state;
    }
}

function bonusReducer(state= {bonus: 0}, action){
    switch (action.type) {
        case inc:
            return {bonus: state.bonus + 1};
        case incBonus:
            return {bonus: state.bonus + 2};
        default:
            return state;
    }
}



// store.subscribe(()=>{
//     history.push(store.getState());
//     console.log(history);
// })

// async function getUser(){
//    const response = await axios.get('http://localhost:3000/user/1')
//    console.log(response.data);
// }
// getUser()

//ACTION CREATORS

function increment(){
    return {type: inc}
}

 function getUser(id){

    return async(dispatch, getState) => {
    const {data} = await axios.get(`http://localhost:3000/user/${id}`)    
    dispatch(getAccountUserFulfilled(data.amount))
    }
    
}



function getAccountUserFulfilled(value){
    return {type: getAccUserFulfilled, payload: value}
}

function decrement(){
    return {type: dec}
} 

function incrementByAmt(value){
    return {type: incByAmt, payload: value}
}
function incrementBonus(){
    return {type: incBonus}
}

setTimeout(() =>{
    store.dispatch(getUser(2));

}, 5000);


// console.log(store.getState());


