const forumNamesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FORUM_NAMES':
            return action.payload;
        default:
            return state;
    }
}

export default forumNamesReducer