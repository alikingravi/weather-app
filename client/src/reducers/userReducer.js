import { ADD_USER, REMOVE_USER } from "./types";

export const userReducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        ...action.payload,
      };
    case REMOVE_USER:
      return null;
    default:
      return state;
  }
};
