import Endpoints from '../../endpoints';
import Client from '../../api-client/';
import Storage from '../../../storage';


class MessageService {
    getAllMessagesByChatId = (chat_id) => Client.API_CLIENT.get("" + Endpoints.v1.GET_FULL_CHAT, {
        params:{chatid: ""+chat_id},
        headers:{"x-access-token":""+Storage.Session.getUserData().token}
    })

    getMarkMessageAsRead = (message_id)=> Client.API_CLIENT.post(""+Endpoints.v1.MARK_MESSAGE_READ, {message_id}, {headers:{"x-access-token":""+Storage.Session.getUserData().token}})
    getSendMessage = (chat_id, msg)=> Client.API_CLIENT.post(""+Endpoints.v1.SEND_MESSAGE, {content:{"message":msg},"chat":chat_id} , {headers:{"x-access-token":""+Storage.Session.getUserData().token}})

}


export default new MessageService();
