import axios from "axios";
import { GET_MOVIE_DETAIL, GET_MOVIE_LIST } from "../constants/movie-const";
import { startLoadingAction, stopLoadingAction } from "./common-action";

export const getMovieListAction = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoadingAction());

      const res = await axios({
        method: "GET",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
      });
      dispatch({
        type: GET_MOVIE_LIST,
        payload: res.data,
      });

      dispatch(stopLoadingAction());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMovieDetailAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(startLoadingAction());

      const res = await axios({
        method: "GET",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
      });
      dispatch({
        type: GET_MOVIE_DETAIL,
        payload: res.data,
      });

      dispatch(stopLoadingAction());
    } catch (error) {
      console.log(error);
    }
  };
};
