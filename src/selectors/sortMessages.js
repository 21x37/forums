const sortMessages = (messages) => {
    console.log(messages);
    const messag = messages.sort((a, b) => {
        return a.date < b.date ? 1 : -1
    })
    console.log(messag);
    return messag;
}

export default sortMessages;