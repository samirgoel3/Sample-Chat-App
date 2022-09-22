import { CircularProgress, Grid, TextField } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import COLORS from '../../../../../constants/Colors';
import ICONS from '../../../../../constants/Icons';
import Session from '../../../../../storage/Session';






export default function ChatInput({ chatId, users }) {

    const stateData = useSelector(state => state)
    const [input, setInput] = React.useState("")
    const [loader, setLoader] = React.useState(false)


    const onMessageHandle = () => {
        if (input) {
            fetchMessageSend(input);
            setInput("")
        } else {
            alert('right some message')
        }
    }


    const fetchMessageSend = async (message) => {
        // try {
        if (stateData.connectiondata.socket_connection) {
            setLoader(true)
            global.socket.emit("CHAT", {
                chat_id: "" + chatId,
                message: "" + message,
                users: users,
                sender:""+Session.getUserData()._id
            }, () => {
                setLoader(false)
            });
        }
        else {
            alert("Socket is not connected")
        }
        //  else {
        //         if (data.data.result === 1) {
        //             alert('Message send successfully')
        //             // alert(JSON.stringify(data.data))
        //             // let chatObj = {
        //             //     chat_id: chatId,
        //             //     last_message: {
        //             //         _id: data.data.response._id,
        //             //         content: data.data.response.content,
        //             //         sender: data.data.response.sender,
        //             //         createdAt: data.data.response.createdAt,
        //             //         readby: data.data.response.readby

        //             //     }
        //             // }
        //             // dispatch(actions.RecentChatActions.updateLastMessageInRecentChat(chatObj))
        //         }
        //         else {
        //             dispatch(actions.ErrorDialogActions.showError({ header: "Failed To Send Message", description: "" + data.data.message }))

        //         }
        //     }
        // } catch (e) {
        //     setLoader(false)
        //     dispatch(actions.ErrorDialogActions.showException(e.message))
        // }
    }



    return (
        <Grid
            container
            sx={{ width: '100%', backgroundColor: COLORS.PRIMARY_DARK, padding: 1 }}
            flexDirection={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}>

            <TextField
                variant='standard'
                multiline
                maxRows={2}
                value={input}
                onChange={(e) => { setInput(e.target.value) }}
                InputProps={{ disableUnderline: true, style: { fontSize: 12, minHeight: 47 } }}
                sx={{ display: 'flex', flex: 1, marginRight: 1, backgroundColor: 'white', borderRadius: 10, paddingInline: 3 }} />
            <div style={{ backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 7 }}>

                {loader ?
                    <CircularProgress size={25} /> :
                    <ICONS.SEND_MESSAGE style={{ width: 25, height: 25, color: COLORS.PRIMARY }} onClick={() => {
                        onMessageHandle()
                    }} />}
            </div>
        </Grid>
    )
}