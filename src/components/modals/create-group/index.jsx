import { Button, LinearProgress, Grid, Modal, Typography } from '@mui/material'
import React from 'react'
import COLORS from '../../../constants/Colors'
import ICONS from '../../../constants/Icons'
import Storage from '../../../storage'
import ErrorInput from '../../common/ErrorInput'
import ChatGroupSearch from './ChatGroupSearch'
import { actions } from '../../../states/actions/index';
import Services from '../../../network/services'
import { useDispatch } from 'react-redux'
import ChatUtils from '../../../utils/ChatUtils'
import IndexDbResolver from '../../../databse';
import { dispatch as busDispatch} from 'use-bus'






export default function CreateEditGroupModal({ open, onClose = () => { }, onClosebuttonCLick = ()=>{} }) {

    const [groupName, setgroupName] = React.useState("")
    const [selectedUsers, setSelectedUsers] = React.useState([])
    const [groupNameError, setgroupNameError] = React.useState("")
    const [loader, setLoader] = React.useState(false)
    const dispatch = useDispatch()


    const handleOnSave = (data)=>{
        
        if(!data.chatname ){
            setgroupNameError('Please enter valid group name')
            return;
        } if(data.chatname.length < 5 ){
            setgroupNameError('Please enter at-least 5 leter')
            return;
        }if(data.users.length < 2 ){
            alert('Please Select Atleast two user')
            return;
        }
        else{
            let userIds = [];
            data.users.forEach(element => {
                userIds.push(""+element._id)
            });
            userIds.push(Storage.Session.getUserData()._id)
            data.users = userIds
            fetchCreateGroupChat(data)
        }

    }

    const fetchCreateGroupChat = async (obj)=>{
        try {
            setLoader(true)
            const data = await Services.ChatService.getCreateChatGroup(obj)
            setLoader(false)
            if (!data) {
                dispatch(actions.ErrorDialogActions.showNoDataFromApi())
            } else {
                if (data.data.result === 1) {
                    let objectToAdd = {
                        chat_id: "" + data.data.response._id,
                        chatname: "" + data.data.response.chatname,
                        createdAt: "" + data.data.response.createdAt,
                        groupadmin: data.data.response.groupadmin,
                        users: data.data.response.users,
                        identifier: ChatUtils.CreateIdentifier(data.data.response.users),
                        isgroupchat: true,
                        messages: [],
                    }

                    await IndexDbResolver.addNewChatToTop(objectToAdd)
                    dispatch(actions.SelectorAction.selectGroupChat(data.data.response._id))
                    busDispatch('REFRESH-GROUP-LIST')
                    onClose()

                }
                else {
                    dispatch(actions.ErrorDialogActions.showError({ header: "Failed To login", description: "" + data.data.message }))

                }
            }
        } catch (e) {
            setLoader(false)
            dispatch(actions.ErrorDialogActions.showException(e.message))
        }
    }

    return (
        <Modal
            open={open}
            onClose={(_, reason) => {if (reason !== "backdropClick") {onClose}}}>
            <Grid >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    boxShadow: 24,
                    padding: 10
                }}>
                    <Grid container direction={'row'}>
                    <Typography variant='h6' marginBottom={2} flex={1}>Create Group</Typography>
                    <ICONS.CLOSE size={30} color={loader?'#bbbbbb':COLORS.PRIMARY_DARK} onClick={loader?null:onClosebuttonCLick}/>
                    </Grid>
                    <ErrorInput
                        label='Group Name'
                        type={'normal'}
                        error={groupNameError}
                        onChange={(e) => {
                             setgroupName(e.target.value) 
                             setgroupNameError("")
                            }}
                        value={groupName}
                    />
                    <ChatGroupSearch onChange={(event, value) => { setSelectedUsers(value)}} />

                    <Button variant='contained' disabled={loader} sx={{ width: '100%', marginTop: 2 }} onClick={()=>{
                        let obj = {
                            chatname:groupName,
                            users:selectedUsers,
                            groupadmin:[Storage.Session.getUserData()._id]
                        }
                        handleOnSave(obj)
                    }}>{loader?'Creating Group':'Save'   }</Button>
                    {loader?
                    <LinearProgress style={{width:'100%', marginRight:10,marginTop:10}}/> : null }
                </div>

            </Grid>

        </Modal>
    )
}