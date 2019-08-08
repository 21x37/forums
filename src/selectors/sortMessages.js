const sortMessages = (messages) => {
    const messag = messages.sort((a, b) => {
        return a.date < b.date ? 1 : -1
    })
    return messag;
}

export default sortMessages;