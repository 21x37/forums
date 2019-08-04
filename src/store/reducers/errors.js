export default (state = { errorMessage: '' }, action) => {
    switch(action.type) {
        case 'AUTH_ERROR':
            return { errorMessage: action.payload }
        default:
            return state;
    };
};