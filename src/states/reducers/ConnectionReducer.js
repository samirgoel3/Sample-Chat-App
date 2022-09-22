const initialState = {
    socket_connection:false,

}

const ConnectionReducer = (state = initialState, action)=>{
    if(action.type === 'set_connection'){
        return {
            ...state,
            socket_connection:action.payload,
        };
    }else{
        return state;
    }
}

export default ConnectionReducer;