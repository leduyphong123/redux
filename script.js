// import {createStore} from "https://cdn.skypack.dev/redux";

/////////////////////////////MY REDUX////////////////
function createStore(reducer){
    let state = reducer(undefined,{});
    const subscribes = [];
    return {
        getState() {
            return state;
        },
        dispatch(action){
           state = reducer(state,action);

           subscribes.forEach( subscribe => subscribe());
        },
        subscribe(subscribe){
            subscribes.push(subscribe);
        }
    }
}


//////////////////////////////MY APP/////////////////
const initState = 0;

//reducer

function reducer(state = initState, action) {
  switch (action.type) {
    case "DEPOSIT":
      return state + action.payload;
    case "WITHDRAW":
      return state - action.payload;
    default:
      return state;
  }
}

const store = createStore(reducer);

//action

function action(type,payload){
    return {
      type,
      payload,
    };
}
//dom event

const deposit = document.getElementById("deposit");
const withdraw = document.getElementById("withdraw");
deposit.onclick = () =>{
    store.dispatch(action("DEPOSIT", 10));
}
withdraw.onclick = ()=>{
    store.dispatch(action("WITHDRAW",10));
}


//listioner
store.subscribe(()=>{
    render();
})

/// render
function render(){
    const output= document.getElementById("output");
    output.innerText = store.getState();
}
render();
