
import IndexedDB from '../databse';

const saveuserDetails = async (data)=>{
    await localStorage.setItem('USER_DATA', data)
    return;
}

const getUserData = ()=>{
    let data = localStorage.getItem('USER_DATA')
    let returningData = JSON.parse(data)
    return returningData;
}

const logout = ()=>{
    IndexedDB.clearDB();
    localStorage.clear();
    window.location.reload(false);
    global.socket.disconnect()
}

export default {saveuserDetails, getUserData, logout}