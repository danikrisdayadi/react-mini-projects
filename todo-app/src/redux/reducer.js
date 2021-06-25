const mainReducer = (state = [], action) => {
    console.log("reducer", action.message)
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          action.message
        ];
      case "EDIT":
        return action.message
      default:
        return state;
    }
};

export default mainReducer