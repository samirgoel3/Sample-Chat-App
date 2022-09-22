const initialState = {
    messages:[]
}

const MessagesReducer = (state = initialState, action)=>{
    if(action.type === 'set_messages'){
        return {
            ...state,
            messages:action.payload
        };
    }if(action.type === 'remove_all_messages'){
        return {
            ...state,
            messages:[]
        };
    }if(action.type === 'add_message'){
        
        return {
            ...state,
            messages:[...state.messages, action.payload]
        };
    }else{
        return state;
    }
}




export default MessagesReducer;