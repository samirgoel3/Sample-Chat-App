import React, { useEffect, useState } from 'react';
import ChatBox from './chat-box';
import ChatInput from './chat-input';
import ChatBar from './chat-bar';
import IndexedDbResolver from '../../../../databse';
import { actions } from '../../../../states/actions';
import { useDispatch } from 'react-redux';
import useBus from 'use-bus'
import EventKeys from '../../../../events/EventKeys';








export default function MainChatView({ chatId }) {

    const [chat,setChat] = React.useState([])
    const dispatch = useDispatch();


    useEffect(()=> {fetchChatfromDb()}, [chatId])

    useBus(""+EventKeys.MESSAGE_UPDATE, (data)=>{ 
        dispatch(actions.MessagesActions.setMessages(data.data))
    })


    const fetchChatfromDb = async() =>{
        let chat = await  IndexedDbResolver.getSpecificChatByChatId(chatId)
        dispatch(actions.ChatActions.setMessages(chat.messages))
        setChat(chat)    
    }
    
    return <div>
        <ChatBar chatData={chat} />
        <ChatBox chatId={chatId}/>
        <ChatInput chatId={chatId} users={chat.users}/> 
    </div>

}