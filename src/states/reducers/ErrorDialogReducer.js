const initialState = {
    header:"Header from Reduces",
    description:"description from reducer",
    show:false
}

const ErrorDialogReducer = (state = initialState, action)=>{
    if(action.type === 'show_Error'){
        return {
            ...initialState,
            header:action.payload.header,
            description:action.payload.description,
            show: action.payload.show
        };
    }if(action.type === 'clear_Error'){
        return {
            ...initialState,
            header:action.payload.header,
            description:action.payload.description,
            show: action.payload.show
        };
    }if(action.type === 'show_Exception'){
        return {
            ...initialState,
            header:action.payload.header,
            description:action.payload.description,
            show: action.payload.show
        };
    }if(action.type === 'show_no_data_from_api'){
        return {
            ...initialState,
            header:action.payload.header,
            description:action.payload.description,
            show: action.payload.show
        };
    }else{
        return state;
    }
}

export default ErrorDialogReducer;