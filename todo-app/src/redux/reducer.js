const mainReducer = (state = [], action) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          action.message
        ];
      default:
        return state;
    }
};

export default mainReducer