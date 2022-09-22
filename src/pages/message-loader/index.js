import { Grid, LinearProgress, Typography, Button, Avatar } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import COLORS from '../../constants/Colors'
import Session from '../../storage/Session'
import ROUTESNAMES from '../../constants/RoutesName';
import { useDispatch } from 'react-redux'
import { actions } from '../../states/actions/index';
import Services from '../../network/services'
import IndexedDb from '../../databse';






export default function MessageLoader() {

    let navigate = useNavigate();
    const [loadingMessage, setLoadingMessage] = React.useState("")
    let dispatch = useDispatch()
    let chats = [];
    let stepPercentage = 100;
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        fetchAllChats();
    }, [])


    const fetchAllChats = async () => {
        try {
            setLoadingMessage('Loading Chats')
            const data = await Services.ChatService.getAllChatsWithoutMessages()
            if (!data) {
                setLoadingMessage('API Causing Error while fetching chats')
            } else {
                if (data.data.result === 1) {
                    setLoadingMessage(data.data.response.length + ' Chats Found successfully')
                    chats = data.data.response;
                    stepPercentage = 100 / chats.length;
                    for(var i=0 ; i < chats.length ; i++){
                        let messages = await fetchMessagesbyChatId(chats[i])
                        IndexedDb.addChatToDb(chats[i], messages)
                        
                        if(i == chats.length -1){
                            setLoadingMessage('Chats Loaded completely')
                            setTimeout(()=>{
                                navigate( ROUTESNAMES.MAIN, { replace: true });
                            }, 2000)
                        }
                    }                    
                }
                else {
                    setLoadingMessage('No Chats Found')
                    setTimeout(()=>{
                        navigate("" + ROUTESNAMES.MAIN, { replace: true });
                    }, 2000)
                }
            }
        } catch (e) {
            dispatch(actions.ErrorDialogActions.showException(e.message))
            setLoadingMessage(''+e.message)
        }
    }


    const fetchMessagesbyChatId = async (chatData)=>{
        try {
            setLoadingMessage('Fetching chat: ' +chatData.chatname)
            const data = await Services.MessageService.getAllMessagesByChatId(chatData._id)
            if (!data) {
                setLoadingMessage('API Causing Error while fetching messages')
                return [];
            } else {
                setProgress(progress => (progress + 10))
                return data.data.response;
            }
        } catch (e) {
            setLoadingMessage(e.message)
            return[]
        }
    }

   

    return (
        <Grid
            container
            justifyContent={'center'}
            direction={'column'}
            alignItems={'center'}
            sx={{ width: '100%', height: '100%', backgroundColor: COLORS.PRIMARY_DARK, position: 'absolute', left: 0, overflow: 'hidden' }}
        >
            {Session.getUserData() != null ?
                <>
                    <Avatar sx={{width:180, height:180,margin:2}} src={Session.getUserData().image}/>
                    <Typography variant='h5' color={'white'}>LOADING YOUR CHATS</Typography>
                    <Typography fontSize={12} color={'white'}>Please do not close this page until message is loading</Typography>
                    <LinearProgress variant="determinate" sx={{ width: 300, margin: 2 }} value={progress}/>
                    <Typography fontSize={11} color={'white'}>{loadingMessage}</Typography>
                </>
                :
                <>
                    <Typography variant='h5' color={'white'}>Unable to load Chats</Typography>
                    <Typography fontSize={12} color={'white'}>Please Login your accoun in order reload this page</Typography>
                    <Button variant='contained' sx={{ width: '80%', marginTop: 2 }} onClick={() => { navigate(ROUTESNAMES.LOGIN) }}>Login</Button>
                </>
            }



        </Grid>
    )
}