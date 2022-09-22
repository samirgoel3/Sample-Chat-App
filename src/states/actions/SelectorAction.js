const selectOneToOneChat = (chatId)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'select_one_to_one_chat',
            payload:chatId
        })
    }
}


const selectGroupChat = (chatId)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'select_group_chat',
            payload:chatId
        })
    }
}


const selectTab = (chatId)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'select_tab',
            payload:chatId
        })
    }
}






export default {selectOneToOneChat, selectGroupChat, selectTab}