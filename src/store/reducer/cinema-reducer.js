import {
  GET_CINEMA_LIST,
  GET_CINEMA_LIST_GROUP,
} from "../constants/cinema-const";

const initialState = {
  cinemaList: [],
  cinemaListGroup: [],
};

export const cinemaReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CINEMA_LIST:
      state.cinemaList = payload;
      return { ...state };
    case GET_CINEMA_LIST_GROUP:
      state.cinemaListGroup = payload;
      return { ...state };
    default:
      return state;
  }
};
