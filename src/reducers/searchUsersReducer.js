const searchUsersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_USERS':
            return action.payload
        case 'CLEAR_USERS':
            return [];
        default:
            return state;
    }
}

export default searchUsersReducer;