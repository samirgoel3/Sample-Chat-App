import { Check } from '@mui/icons-material'
import { Avatar, Divider, Drawer, Grid, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from '@mui/material'
import React from 'react'
import COLORS from '../../constants/Colors'
import ICONS from '../../constants/Icons'
import ConceptsUsedInSite from './ConceptsUsedInSite'
import Concepts from '../../constants/DevConcepts'




export default function MobileSideDrawerLeft() {

    const [drawerOpen, setDrawerOpen] = React.useState(false)

    return (
        <React.Fragment key={'left'}>
            <ICONS.MENU_ONE style={{ marginLeft: 5 }} color={'white'} onClick={() => {
                setDrawerOpen(!drawerOpen)
            }} />
            <Drawer
                anchor={'left'}
                open={drawerOpen}
                onClose={() => { setDrawerOpen(!drawerOpen) }}
            >


                {/* MY MyInfo */}
                <div>
                    <Grid container direction={'row'} alignItems={'center'} justifyContent={'center'} paddingLeft={1} width={'100%'} height={'100%'} sx={{ backgroundColor: COLORS.PRIMARY, padding: 1 }}>
                        <Grid item>
                            <Avatar alt="Natacha" src='https://d22y893cekuu8h.cloudfront.net/s_eaf98ae5e893-2018-07-25-13-25-14-000203.jpg' style={{ width: 25, height: 25, marginRight: 13 }} />
                        </Grid>
                        <Grid item>

                            <Typography color={'white'}>Created By Samir Goel</Typography>
                        </Grid>
                    </Grid>
                </div>


                {/* Concepts  */}
                <div>
                    <MenuList dense>
                        {Concepts.map((e, i) => {
                            return(
                            <MenuItem key={i}>
                                <ListItemText>{e.detail}</ListItemText>
                            </MenuItem>)
                        })}
                        <Divider />
                        <MenuItem>
                            <ListItemText>Custom spacing...</ListItemText>
                        </MenuItem>
                    </MenuList>
                </div>
            </Drawer>
        </React.Fragment>
    )
}