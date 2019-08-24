export default (state = { errorMessage: '' }, action) => {
    switch(action.type) {
        case 'AUTH_ERROR':
            return action.payload
        case 'CLEAR_AUTH_ERROR':
            return { errorMessage: '' }
        default:
            return state;
    };
};