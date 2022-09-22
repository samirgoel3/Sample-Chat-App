const setMessages = (messagesArray)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'set_messages',
            payload:messagesArray
        })
    }
}


const removeAllMessages = ()=>{
    return async ( dispatch) =>{
        dispatch({
            type:'remove_all_messages',
            payload:null
        })
    }
}


const addMessage = (data)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'add_message',
            payload:data
        })
    }
}

export default {setMessages, removeAllMessages, addMessage}