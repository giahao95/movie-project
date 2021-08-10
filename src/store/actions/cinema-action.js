import axios from "axios";
import {
  GET_CINEMA_LIST,
  GET_CINEMA_LIST_GROUP,
} from "../constants/cinema-const";

export const getCinemaListAction = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
      });
      dispatch({
        type: GET_CINEMA_LIST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCinemaListGroupAction = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01",
      });
      dispatch({
        type: GET_CINEMA_LIST_GROUP,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
