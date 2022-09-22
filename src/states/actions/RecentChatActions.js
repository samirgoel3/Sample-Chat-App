const setInitialChats = (data)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'set_initial_chat',
            payload:{
                group_chats:data.group_chat,
                recent_chats:data.one_to_one_chat
            }
        })
    }
}

const addUnreadChat = (data)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'add_unread_chat',
            payload:{
                group_chats:data.group_chat,
                recent_chats:data.one_to_one_chat
            }
        })
    }
}


const setGroups = (data)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'set_groups',
            payload:{
                groups:data
            }
        })
    }
}


const setSelectedPosition = (position)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'select_position',
            payload:position
        })
    }
}


const setSelectedChat = (selectedChat)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'select_chat',
            payload:selectedChat
        })
    }
}


const addChattoFirstPosition = (chatData)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'add_chat_to_first_position',
            payload:chatData
        })
    }
}


const updateLastMessageInRecentChat = (chatObject)=>{
    console.log('TEST dispatching action')
    return async ( dispatch) =>{
        dispatch({
            type:'update_last_message_in_recent_chats',
            payload:chatObject
        })
    }
}








export default {setInitialChats, addUnreadChat, setSelectedPosition, setSelectedChat, addChattoFirstPosition, updateLastMessageInRecentChat, setGroups}