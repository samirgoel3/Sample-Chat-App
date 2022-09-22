const initialState = {
    recent_chat:[],
    group_chat:[],
    messages:[]

}

const ChatReducer = (state = initialState, action)=>{
    if(action.type === 'set_recent_chat'){
        return {
            ...state,
            recent_chat:action.payload,
        };
    }if(action.type === 'set_group_chat'){
        return {
            ...state,
            group_chat:action.payload,
        };
    }if(action.type === 'set_messages'){
        return {
            ...state,
            messages:action.payload,
        };
    }else{
        return state;
    }
}

export default ChatReducer;