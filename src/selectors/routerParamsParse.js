const routerParamsParse = (subForumNames) => {
    let string = ''
        subForumNames.forEach((param) => {
        string += param + '|'
    })
    return string
}

export default routerParamsParse;