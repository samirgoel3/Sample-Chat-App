import { Grid } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../../constants/Colors';
import Services from '../../../network/services';
import AllUserList from './AllUsersList';
import CreateChatView from './CreateChatView';
import GroupList from './GroupsList';
import RecentChat from './RecentChatList';
import SearchBar from './Searchbar';
import SearchedList from './SearchedList';
import TabsBar from './TabsBar';
import { actions } from '../../../states/actions/index';
import Storage from '../../../storage';
import _ from 'lodash'
import { dispatch as busDispatch } from 'use-bus'
import useBus from 'use-bus'
import ChatUtils from '../../../utils/ChatUtils';
import IndexedDBResolver from '../../../databse';
import Session from '../../../storage/Session';

var timeout = null;
export default function SideBar() {

    const [searchedResult, setSearchedResult] = React.useState([])
    const [searchedError, setSearchedError] = React.useState(null)
    const [createChatLoader, setCreateChatLoader] = React.useState(false);
    const [loaderElement, setLoaderElement] = React.useState(null);

    const stateData = useSelector(state => state)
    const dispatch = useDispatch()

  

    const handleOnUserSelected = async (element) => {
        setSearchedResult([])
        setSearchedError(null)
        timeout = null;

        // check weather this already exist in recent chat or not
        // If not exist then add view in side indicating creating chat
        // if already exist then shift that element to top in redux store in recent chat and selected position is 0
        let mIdentifier = ChatUtils.CreateIndentifierFromUserIdesOnly([Storage.Session.getUserData()._id, element._id]);

        let storedChat = await IndexedDBResolver.getSpecificChatByIdentifier(mIdentifier)

        if (storedChat) {
            dispatch(actions.SelectorAction.selectOneToOneChat(storedChat.chat_id))
            dispatch(actions.SelectorAction.selectTab(0))
            busDispatch('SLIDE-TAB-TO-FIRST')
        }
        else { fetchCreateChat(element, mIdentifier) }


    }

    const fetchCreateChat = async (element, identifier) => {

        try {
            setCreateChatLoader(true)
            setSearchedResult([])
            setLoaderElement(element)
            const data = await Services.ChatService.getCreateChat("" + Storage.Session.getUserData().username + "-" + element.username, "" + element._id)
            setCreateChatLoader(false)

            if (!data) {
                dispatch(actions.ErrorDialogActions.showNoDataFromApi())
            } else {
                if (data.data.result === 1) {
                    let admins = [
                        { _id: "" + Session.getUserData()._id, username: "" + Session.getUserData().username, image: "" + Session.getUserData().image },
                        { _id: "" + element._id, username: "" + element.username, image: "" + element.image }
                    ];
                    let objectToAdd = {
                        chat_id: "" + data.data.response._id,
                        chatname: "" + element.username,
                        createdAt: "" + data.data.response.createdAt,
                        groupadmin: admins,
                        users: admins,
                        identifier: identifier,
                        isgroupchat: false,
                        messages: [],
                    }
                    await IndexedDBResolver.addNewChatToTop(objectToAdd)
                    dispatch(actions.SelectorAction.selectOneToOneChat(data.data.response._id))
                    dispatch(actions.SelectorAction.selectTab(0))
                    busDispatch('SLIDE-TAB-TO-FIRST')
                    // busDispatch('CLOSE_DRAWER')
                }
                else {
                    dispatch(actions.ErrorDialogActions.showError({ header: "Failed To Create Chat", description: "" + data.data.message }))
                }
            }
        } catch (e) {
            setCreateChatLoader(false)
            dispatch(actions.ErrorDialogActions.showException(e.message))
        }
    }




    return (
        <Grid container direction={'column'} width={'100%'} height={'100%'} sx={{ backgroundColor: COLORS.PRIMARY_DARK }}>
            <Grid item sx={{ width: '100%' }}>
                <TabsBar onTabSelected={(tabPosition) => {
                     dispatch(actions.SelectorAction.selectTab(tabPosition))
                     }}  />
            </Grid>

            <Grid item sx={{ width: '100%' }}>
                {createChatLoader ? null :
                    <SearchBar
                        addGroupVisibility={stateData.selectorData.selected_tab == 1}
                        searchBarVisibiliy={stateData.selectorData.selected_tab == 2}
                        onSearchedResult={(data) => { setSearchedResult(data); setSearchedError(null); }}
                        onSearchError={(err) => { setSearchedError(err) }}
                    />}
            </Grid>


            <Grid item flex={1} >

                {createChatLoader ? <CreateChatView element={loaderElement} /> :

                    searchedResult.length > 0 || searchedError != null ?
                        <SearchedList
                            searchedData={searchedResult}
                            error={searchedError}
                            onElementSelected={(element) => { handleOnUserSelected(element) }}
                        /> :
                        stateData.selectorData.selected_tab == 0 ? <RecentChat /> :
                        stateData.selectorData.selected_tab == 1 ? <GroupList /> : <AllUserList onUserSelected={(data) => { handleOnUserSelected(data)}} />
                }
            </Grid>
        </Grid>
    )
}
