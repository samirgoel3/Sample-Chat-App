import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useBus from 'use-bus'
import ChatBackground from '../../../../../images/chat-background.png'
import { actions } from '../../../../../states/actions'
import Session from '../../../../../storage/Session'
import LeftChatBox from './LeftMessage';
import RightChatBox from './RightMessage';
import { store } from '../../../../../states/index';






export default function ChatBox({ chatId }) {

    const stateData = useSelector(state => state)
    const bottomRef = React.useRef(null);
    const dispatch = useDispatch()






    // useEffect(() => {
    //     bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    // }, [message]);

    // useEffect(() => { setMessages(chatData.messages) }, [chatData.chat_id])

    useBus('MESSAGE-RECEIVED', (data) => {
        if (data.data.chat_id == store.getState().selectorData.last_selection) {
            dispatch(actions.MessagesActions.addMessage(data.data.messageData))
            setTimeout(() => {
                bottomRef.current.scrollIntoView({ behavior: 'smooth' })
            }, 250)
        }
    })



    return (
        <div style={{ position: 'relative' }}>
            <Grid container
                alignItems={'flex-end'}
                sx={{ overflowY: 'scroll', height: '80vh', position: 'relative', backgroundImage: `url(${ChatBackground})`, backgroundSize: 'cover' }} >
                <div style={{ width:'100%'}}>

                    {
                        stateData.messagesData.messages.map((e, i) =>
                            e.sender._id == Session.getUserData()._id ?
                                <RightChatBox data={e} /> : <LeftChatBox data={e} />
                        )
                    }
                    <div ref={bottomRef} />
                </div>
            </Grid>

        </div>

    )
}