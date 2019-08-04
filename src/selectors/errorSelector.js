const errorSelector = (error) => {
    switch (error.code) {
        case "auth/invalid-email":
            return "Please enter a valid email."
        case "auth/wrong-password":
            return "The username and password doesn't match our records."
        case "auth/too-many-requests":
            "Too many unsuccessful login attempts. Try again later."
        case "auth/user-disabled":
            return "Your account has been disabled."
        case "auth/network-request-failed":
            return "Request timed out. Check your internet connection."
        case "auth/weak-password":
            "Password should be at least 6 characters"
        default:
            return error.message
    }
}

export default errorSelector;