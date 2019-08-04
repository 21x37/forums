export const forumValidator = (subForum) => {
    if (subForum.title.trim().length > 3) {
        if (subForum.text.trim().length > 5) {
            return true
        } else {
            return 'Post needs to be longer than 5 characters.'
        }
    } else {
        return 'Title needs to be longer than 3 characters.'
    }
} 

export const commentValidator = (comment) => {
    if (comment.comment.trim().length > 5) {
        return true;
    } else {
        return 'Comment must be longer than 5 characters.'
    }
} 


