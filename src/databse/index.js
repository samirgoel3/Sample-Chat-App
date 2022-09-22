import Localbase from 'localbase'
import Session from '../storage/Session';
import ChatUtils from '../utils/ChatUtils';
import { dispatch as busDispatch } from 'use-bus'
import EventKeys from '../events/EventKeys';
import { store } from '../states/index';




class IndexdbResolver {
    constructor() {
        this.db = new Localbase('chat-db')
    }


    addChatToDb = async (chatData, messages) => {
        this.db.collection('chats').add({
            chat_id: chatData._id,
            chatname: chatData.isgroupchat ? chatData.chatname : chatData.chatname.replace(Session.getUserData().username, "").replace("-", ""),
            isgroupchat: chatData.isgroupchat,
            users: chatData.users,
            groupadmin: chatData.groupadmin,
            createdAt: chatData.createdAt,
            identifier: ChatUtils.CreateIdentifier(chatData.users),
            messages: messages
        }, "" + chatData._id)
    }

    addNewChatToTop = async (obj) => {
        return this.db.collection('chats').add(obj, "" + obj.chat_id)
    }


    clearDB = async () => {
        await this.db.delete()
    }



    getAllChat = async () => {
        let data = await this.db.collection('chats').orderBy('createdAt', 'desc').get();
        return data;
    }

    getSpecificChatByIdentifier = async (identifierVal) => {
        let val = await this.db.collection('chats').doc({ identifier: identifierVal }).get();
        return val;
    }

    getSpecificChatByChatId = async (chatId) => {
        return await this.db.collection('chats').doc(chatId).get();
    }


    addMessageToChat = async (messageData) => {
        let existingChat = await this.db.collection('chats').doc("" + messageData.chat).get();
        if (existingChat != null) {
            let updatedObjectToSave = {
                content: messageData.content,
                createdAt: "" + messageData.createdAt,
                readby: messageData.readby,
                sender: messageData.sender,
                _id: "" + messageData._id
            };
            existingChat.messages.push(updatedObjectToSave)
            this.db.collection('chats').doc("" + messageData.chat).set(existingChat).then((res) => {
                busDispatch({ type: "MESSAGE-RECEIVED", data: { messageData: updatedObjectToSave, chat_id: "" + messageData.chat } })
                busDispatch("REFRESH_RECENT_CHATS")
                busDispatch({ type: "" + messageData.chat, data: { messageData: updatedObjectToSave, chat_id: "" + messageData.chat } })

                
            }).catch((err) => {

            })
        }
    }

    updateChatMessage = async (data) => {
        // console.log("*#*#*#*#*#*#*#*#*# "+JSON.stringify(data))
        // console.log("*#*#*#*#*#*#*#*# 1")
        let existingChat = await this.db.collection('chats').doc("" + data.chat._id).get();
        let messageInChat = existingChat.messages;
        // console.log("*#*#*#*#*#*#*#*# 3 total messages "+messageInChat.length)
        let msgIndex = messageInChat.findIndex((msg) => msg._id == data._id)
        let dbStoredMessage = messageInChat[msgIndex];
        dbStoredMessage.readby = data.readby;

        messageInChat.splice(msgIndex, 1, dbStoredMessage);

        await this.db.collection('chats').doc("" + data.chat._id).update({ messages: messageInChat })
            .then((res) => {
                if(data.chat._id == store.getState().selectorData.last_selection)
                busDispatch({ type: "" +EventKeys.MESSAGE_UPDATE, data: messageInChat })
            })
            .catch((err) => {
                console.log("*#*#*#*#*#*#* Message is NOT updated")
            })


    }


}


export default Object.freeze(new IndexdbResolver());