import { CHOICE_CHAIR, GET_LIST_TICKET } from "../constants/booking-const";

const initialState = {
  listChair: {},
};

export const bookingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_TICKET: {
      state.listChair = payload;
      return { ...state };
    }
    case CHOICE_CHAIR: {
      // const { danhSachGhe } = state.listChair;
      let index = state.listChair.danhSachGhe.findIndex(
        (chair) => chair.maGhe === payload.maGhe
      );

      if (index !== -1) {
        let oldChair = state.listChair.danhSachGhe[index];
        let newChair = { ...oldChair, dangChon: !oldChair.dangChon };
        state.listChair.danhSachGhe[index] = newChair;
      }
      return { ...state };
    }

    default:
      return state;
  }
};
