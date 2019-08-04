export default (state=[], action) => {
    switch (action.type) {
        case 'FETCH_FORUMS':
            return action.payload
        default:
            return state;
    }
}