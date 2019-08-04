export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      const { payload } = action;

      if (typeof payload == 'string') {
        return {
          uid: payload
        }
      } else {
        return {
          ...payload
        }
      }
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
