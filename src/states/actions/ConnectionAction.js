const setConnection = (data)=>{
    console.log("Dispatching event for connection "+data)
    return async ( dispatch) =>{
        dispatch({
            type:'set_connection',
            payload:data
        })
    }
}


export default {setConnection}