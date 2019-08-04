export const authError = (error) => ({
    type: 'AUTH_ERROR',
    payload: error
});

export const clearAuthError = () => ({
    type: 'CLEAR_AUTH_ERROR'
})

export const startClearAuthError = () => {
    return (dispatch) => {
        dispatch(clearAuthError())
    }
}