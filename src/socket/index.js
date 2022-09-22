import { io } from "socket.io-client";
import { actions } from "../states/actions";
import Session from "../storage/Session";
import IndexedDB from "../databse"
import KEYS from "./SocketKeys";




const initSocket = (dispatch) => {
    let authentication = { auth: { token: Session.getUserData().token} }
    // let authentication = {auth: {  token: ""+Session.getUserData().token}}
    global.socket = io.connect('http://43.205.208.192:5000', authentication)
    //  socket = io('http://43.205.208.192:5000')
    // const socket = io()

    global.socket.on("disconnect", () => {
        dispatch(actions.ConnectionAction.setConnection(false))
    })

    // On Successfull connection after secure handshake
    global.socket.on("" + Session.getUserData()._id + "_connection", (data) => {
        dispatch(actions.ConnectionAction.setConnection(true))
        global.socket.on("" + data.unique_key, (data) => {
            performUniqueKeyOperations( data.type, data.data)
        })
    })

    global.socket.on("" + Session.getUserData()._id, (data) => {
        if(data.type == KEYS.CHAT){
            IndexedDB.addMessageToChat(data.response)
        }if(data.type == KEYS.MARK_MESSAGE_AS_READ){
            IndexedDB.updateChatMessage(data.response)
        }
    })

    global.socket.on("connect_error", (err) => {
        if(err.hasOwnProperty('data')){
            alert("It seems you are logged in another device, please Login again on this device")
            Session.logout();
        }
        else{alert('Please check your network Connection')}
    });
}

const performUniqueKeyOperations = async (type, data) => {
    switch (type) {
        case "LOGOUT":
            alert("It seems you are logged in another device, please Login again on this device")
            Session.logout();
            break;
        case "ALERT":
            alert("" + data.data)
            break;
        default:
            alert("No Operation defined for " + type)
            break;
    }
}





export default { initSocket }