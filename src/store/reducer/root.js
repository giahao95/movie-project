import { combineReducers } from "redux";
import { cinemaReducer } from "./cinema-reducer";
import { movieReducer } from "./movie-reducer";
import { bookingReducer } from "./booking-reducer";
import { userReducer } from "./user-reducer";
import { commonReducer } from "./common-reducer";

export const rootReducer = combineReducers({
  movie: movieReducer,
  cinema: cinemaReducer,
  booking: bookingReducer,
  user: userReducer,
  common: commonReducer,
});
