import { Grid, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GroupChatItem from '../../../components/sidebar-item/GroupChatItem';
import IndexedDb from '../../../databse'
import useBus from 'use-bus'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../states/actions';
import Team from '../../../images/team.png'




export default function GroupList() {

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const stateData = useSelector(state => state)
  const dispatch = useDispatch()


  useEffect(() => {
    fetchDBGroupChats()
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useBus('REFRESH-GROUP-LIST',() => {fetchDBGroupChats()})


  const fetchDBGroupChats = async () => {
    try {
      let data = await IndexedDb.getAllChat();
      let temp = []
      data.forEach(element => {
        if (element.isgroupchat) {
          temp.push(element)
        }
      });
      dispatch(actions.ChatActions.setGroupChat(temp))
    } catch (e) {
    }
  }


  return (
    <Grid container sx={{ height: '100%', minWidth:280 }} direction={'column'}>
      <div style={{
        height: windowSize.innerWidth < 900 ? (windowSize.innerHeight - 106) : (windowSize.innerHeight - 150),
        overflowY: 'scroll'
      }}>
        {
          stateData.chatData.group_chat.length == 0  ?
            <Grid container direction={'column'} sx={{ height: '100%' }} justifyContent={'center'} alignItems={'center'}>
              <img style={{width:70, height:70, marginBottom:10}} src={Team}/>
              <Typography style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>NO GROUP FOUND</Typography>
              <Typography style={{ color: 'white', fontWeight: 400, fontSize: 11 }}>Create group to send message to multiple users</Typography>
              <Button variant='contained' sx={{ margin: 1, width: 200 }}>Create Group</Button>
            </Grid>
            :
            stateData.chatData.group_chat.map((e, i) => <GroupChatItem key={i} element={e}/>)

        }
      </div>
    </Grid>
  )
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}