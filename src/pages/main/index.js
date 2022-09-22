import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Socket from '../../socket';
import ChatWindow from './chat-window';
import SideBar from './side-bar';




function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

export default function Main() {
    const [windowSize, setWindowSize] = React.useState(getWindowSize())
    const dispatch = useDispatch()


    const makeSocketConnection = () => {
        Socket.initSocket(dispatch)   
    }










    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        makeSocketConnection()

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);



    return (
        <Grid
            container
            direction={'row'}
            flex={1} style={{
                height: windowSize.innerWidth < 900 ? (windowSize.innerHeight - 55) : (windowSize.innerHeight - 55),
                backgroundColor: '#bbbbbb'
            }}>

            {/* Left Part */}
            <Grid
                item
                xl={3} lg={3} md={4}
                display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }}
                sx={{ backgroundColor: '#ffbbbb' }} >
                <SideBar />
            </Grid>

            {/* Right Part */}
            <Grid
                item
                xl={9} lg={9} md={8} sm={12} xs={12}>
                <ChatWindow />

            </Grid>


        </Grid>
    )
}