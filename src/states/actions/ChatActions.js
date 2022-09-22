const setRecentChat = (data)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'set_recent_chat',
            payload:data
        })
    }
}

const setGroupChat = (data)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'set_group_chat',
            payload:data
        })
    }
}


const setMessages = (data)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'set_messages',
            payload:data
        })
    }
}






export default {setRecentChat, setGroupChat, setMessages}