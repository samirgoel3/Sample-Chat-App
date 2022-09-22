import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MainNoChatView from './main-no-chat-view';
import MainChatView from './main-chat-view/index';





export default function ChatWindow() {

    const stateData = useSelector(state => state)
    const [windowSize, setWindowSize] = React.useState(getWindowSize())


    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (


        // <Grid container direction={'column'} width={'100%'} height={'100%'} sx={{backgroundImage:`url(${ChatBackground})`, backgroundSize:'cover'}}>
        //     {stateData.recentChatData.selected_chat == null ? null : <MainChatView selectedChat={stateData.recentChatData.selected_chat} />}
        // </Grid>


        <>
            {
                stateData.selectorData.selected_tab == 0 ?
                    stateData.selectorData.selected_one_to_one_chat != null ? <MainChatView chatId={stateData.selectorData.selected_one_to_one_chat}/>: <MainNoChatView /> :

                    stateData.selectorData.selected_tab == 1 ?
                        stateData.selectorData.selected_group_chat != null ?
                        <MainChatView chatId={stateData.selectorData.selected_group_chat}/>:<MainNoChatView /> :

                        stateData.selectorData.selected_tab == 2 ? 
                        stateData.selectorData.last_selection != null ?  <MainChatView chatId={stateData.selectorData.last_selection}/>: <MainNoChatView/> : <div>Problem in Tab Selection</div>
                        
            }
        </>
    )
}

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}