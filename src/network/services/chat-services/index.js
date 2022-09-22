import Endpoints from '../../endpoints';
import Client from '../../api-client/';
import Storage from '../../../storage';


class ChatService {
    getChatWithReadMessages = () => Client.API_CLIENT.get("" + Endpoints.v1.ALL_CHAT_WITH_READ_MESSAGE, {params:{user_id: ""+Storage.Session.getUserData()._id }})
    getChatWithUnReadMessages = () => Client.API_CLIENT.get("" + Endpoints.v1.ALL_CHAT_WITH_UNREAD_MESSAGE, {params:{user_id: ""+Storage.Session.getUserData()._id }})
    getCreateChat = (chatname, secondUserId) => Client.API_CLIENT.post("" + Endpoints.v1.CREATE_CHAT, {
        chatname:""+chatname,
        users:[""+Storage.Session.getUserData()._id, ""+secondUserId],
        groupadmin:[""+Storage.Session.getUserData()._id, ""+secondUserId]
        

    }, {headers:{"x-access-token":""+Storage.Session.getUserData().token}})



    getCreateChatGroup = (object) => Client.API_CLIENT.post("" + Endpoints.v1.CREATE_GROUP_CHAT, object, {headers:{"x-access-token":""+Storage.Session.getUserData().token}})


    getChatGroups = () => Client.API_CLIENT.get("" + Endpoints.v1.CHAT_GROUPS, {headers:{"x-access-token":""+Storage.Session.getUserData().token}})
    getAllChatsWithoutMessages = () => Client.API_CLIENT.get("" + Endpoints.v1.All_CHATS_WITHOUT_MESSAGES, {headers:{"x-access-token":""+Storage.Session.getUserData().token}})

}


export default new ChatService();
