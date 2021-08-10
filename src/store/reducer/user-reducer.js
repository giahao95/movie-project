import {
  GET_USER_INFO,
  GET_USER_LIST,
  UPDATE_USER,
} from "../constants/user-const";

const initialState = {
  userClient: {},
  userList: [],
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_INFO:
      state.userClient = payload;
      return { ...state };
    case GET_USER_LIST:
      state.userList = payload;
      return { ...state };
    default:
      return state;
  }
};
