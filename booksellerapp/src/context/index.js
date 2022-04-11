import React,{useContext,useReducer,createContext} from 'react'
 const BookSellerContext=createContext();
 const initialState={
     carts:[],
     books:[]
 }
 const reducer=(state,action)=>{

switch(action.type){
case "FETCH_BOOKS":{
    return {
        ...state,
        books:action.payload,
    }
}
case "FETCH_CARTS":{
    return {
        ...state,
        carts:action.payload,
    }
}
default: 
return state;

}

 }

 const BookSellerProvider=(props)=>{
     const [state,dispatch]=useReducer(reducer,initialState)
     return(
         <BookSellerContext.Provider value={[state,dispatch]}>
             {props.children}
         </BookSellerContext.Provider>
     )
 }

 export {BookSellerContext,BookSellerProvider,useContext};
