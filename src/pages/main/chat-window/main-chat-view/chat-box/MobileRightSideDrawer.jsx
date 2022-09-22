import { Drawer } from '@mui/material'
import React from 'react'
import useBus from 'use-bus'
import ICONS from '../../../../../constants/Icons'
import SideBar from '../../../side-bar'




export default function MobileRightSideDrawer() {

    const [drawerOpen, setDrawerOpen] = React.useState(false)

    useBus('CLOSE_DRAWER',()=>{ setDrawerOpen(false)})



    return (
        <React.Fragment key={'right'}>
            <ICONS.CHAT_MENU
                style={{ marginLeft: 5 }} color={'white'} onClick={() => {
                    setDrawerOpen(!drawerOpen)
                }} />

            <Drawer
                anchor={'right'}
                open={drawerOpen}
                onClose={() => { setDrawerOpen(!drawerOpen) }}>
                <SideBar />

            </Drawer>
        </React.Fragment>
    )
}