const initialState = {
    selected_one_to_one_chat: null,
    selected_group_chat: null,
    selected_tab: 0,
    last_selection: null

}

const SelectorReducer = (state = initialState, action) => {
    if (action.type === 'select_one_to_one_chat') {
        return {
            ...state,
            selected_one_to_one_chat: action.payload,
            last_selection: action.payload

        };
    } if (action.type === 'select_group_chat') {
        return {
            ...state,
            selected_group_chat: action.payload,
            last_selection: action.payload
        };
    } if (action.type === 'select_tab') {
        let lastSelection;
        if (state.selected_tab == 0) { lastSelection = state.selected_one_to_one_chat }
        if (state.selected_tab == 1) { lastSelection = state.selected_group_chat }
        if (state.selected_tab == 2) { lastSelection = state.last_selection }

        return {
            ...state,
            selected_tab: action.payload,
            last_selection: lastSelection
        };
    } else {
        return state;
    }
}






export default SelectorReducer;