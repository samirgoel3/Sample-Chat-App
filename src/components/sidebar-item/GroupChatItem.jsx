import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../constants/Colors';
import DateAndTimeUtil from '../../utils/DateAndTimeUtil';
import { actions } from '../../states/actions';
import { dispatch as busDispatch } from 'use-bus'



export default function GroupChatItem({ element }) {

    const stateData = useSelector(state => state)
    const dispatch = useDispatch()


    return (
        <Grid item sx={{ display: 'flex', padding: '0px 7px', justifyContent: 'flex-start', alignItems: 'center', height: 90, width: '100%', backgroundColor: element.chat_id != stateData.selectorData.selected_group_chat ? COLORS.PRIMARY_LIGHT :COLORS.TEAL_A700 }}
            direction={'row'} >
            {/* <Avatar sx={{ width: 40, height: 40 }} src={""} /> */}
            <Grid container direction={'column'} sx={{ marginLeft: 1 }} onClick={() => {
                dispatch(actions.SelectorAction.selectGroupChat(element.chat_id))
                busDispatch('CLOSE_DRAWER')
            }}>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 1 }}>{element.chatname}</Typography>
                <Grid container justifyContent={'center'} alignItems={'center'} direction={'row'}>
                    <Grid item flex={1}>
                        <Grid container direction={'row'} x={{ color: 'white', fontWeight: 400, fontSize: 10, paddingRight: 1, maxWidth: 200, whiteSpace: 'nowrap' }}>
                            {element.users.map((el, i) => {
                                return <Avatar src={el.image} sx={{ width: 30, height: 30, border: '2px solid white', marginLeft: -0.7 }} />
                            })}
                        </Grid>
                    </Grid>

                </Grid>
                <Grid container direction={'row'} marginTop={1}>
                    <Grid item flex={1}>
                        <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 10, paddingRight: 1, maxWidth: 200, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {
                                element.messages.length != 0 ?
                                    element.messages[element.messages.length - 1].sender.username + ": " + element.messages[element.messages.length - 1].content.message
                                    : null
                            }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 9 }}>
                            {
                                element.messages.length != 0 ?
                                    DateAndTimeUtil.convertMongoDbTimestampToDate(element.messages[element.messages.length - 1].createdAt, 'ddd hh:mm A')
                                    : null
                            }
                        </Typography>
                    </Grid>

                </Grid>
            </Grid>
        </Grid >
    )
}