const showError = (data)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'show_Error',
            payload:{
                header:data.header,
                description:data.description,
                show:true
            }
        })
    }
}

const clearError = ()=>{
    return async ( dispatch) =>{
        dispatch({
            type:'clear_Error',
            payload:{
                header:"",
                description:"",
                show:false
            }
        })
    }
}

const showException = (exceptionMessage)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'show_Exception',
            payload:{
                header:"Exception Occurred",
                description:""+exceptionMessage,
                show:true
            }
        })
    }
}

const showNoDataFromApi = ()=>{
    return async ( dispatch) =>{
        dispatch({
            type:'show_no_data_from_api',
            payload:{
                header:"Something went Wrong",
                description:"It seems some Problem with API",
                show:true
            }
        })
    }
}


export default {showError, clearError, showException, showNoDataFromApi}