const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'ADD_USERS_POSTS':
            return { ...state, userPosts: action.payload }
        default:
            return state;
    }
}

export default userProfileReducer;
