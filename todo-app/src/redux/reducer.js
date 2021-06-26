const mainReducer = (state = [], action) => {
    console.log("reducer", action.message)
    switch (action.type) {
      case "ADD":
        console.log("ADD")
        return [
          ...state,
          action.message
        ];
      case "EDIT":
        console.log("EDIT")
        console.log(state)
        return [...state]
      default:
        console.log("DEFAULT")
        return state;
    }
};

export default mainReducer