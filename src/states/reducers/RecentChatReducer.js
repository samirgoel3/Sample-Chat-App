const initialState = {
    recent_chats:[],
    group_chats:[],
    groups:[],
    selected_position:-1,
    selected_chat:null
}

const RecentChatReducer = (state = initialState, action)=>{
    if(action.type === 'set_initial_chat'){
        return {
            ...state,
            group_chats:action.payload.group_chats,
            recent_chats:action.payload.recent_chats,
        };
    }if(action.type === 'set_groups'){
        return {
            ...state,
            groups:action.payload.groups
        };
    }if(action.type === 'add_unread_chat'){
        let localRecentChats = state.recent_chats;

        action.payload.recent_chats.forEach(element => {
            let indexOfExistingLocalChat = localRecentChats.findIndex((e)=>element.chat_id == e.chat_id)
            if(indexOfExistingLocalChat == -1){localRecentChats.splice(0, 0, element)} // i.e this chat is not exisit in local chat so add on top of recent chat
            else{ localRecentChats.splice(indexOfExistingLocalChat, 1, element)}
        });

        return {
            ...state,
            recent_chats:localRecentChats,
        };
    }if(action.type === 'select_position'){
        return {
            ...state,
            selected_position:action.payload
        };
    }if(action.type === 'select_chat'){
        return {
            ...state,
            selected_chat:action.payload
        };
    }if(action.type === 'add_chat_to_first_position'){
        let recentChats = state.recent_chats
        if(recentChats.length >0){
            if(recentChats[0].last_message == null){recentChats.splice(0, 1, action.payload)}
            else{recentChats.splice(0, 0, action.payload)}
        }else{
            recentChats.splice(0, 0, action.payload)
        }
        
        return {
            ...state,
            recent_chats:recentChats,
            selected_position:0,
            selected_chat:action.payload

        };
    }
    if(action.type === 'update_last_message_in_recent_chats'){
        console.log('TEST inside reducer method')
        let recentChats = state.recent_chats
        if(recentChats.length >0){
            console.log('TEST inside if condition of reducer' +JSON.stringify(recentChats[2].chat_id) +" --- comparing with ---->" +action.payload.chat_id)
           let indexOfChatInRecent = recentChats.findIndex((e)=> ""+e.chat_id == ""+action.payload.chat_id)
           console.log("TEST FINDING INDEX in RECENT CHTA = "+ indexOfChatInRecent)
           if(indexOfChatInRecent != -1){
            let temp = recentChats[indexOfChatInRecent]
            temp.last_message = action.payload.last_message
            temp.unread_message_count = 0
            recentChats.splice(indexOfChatInRecent, 1, temp)
           }
        }else{
            console.log('TEST inside else condition of reducer')
        }
        
        return {
            ...state,
            recent_chats:recentChats

        };
    }else{
        return state;
    }
}

export default RecentChatReducer;