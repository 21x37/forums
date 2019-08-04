const notificationReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_NOTIFICATIONS':
            return action.payload
        case 'ADD_NOTIFICATION':
            return action.payload
        default:
            return state;
    };
};

export default notificationReducer;