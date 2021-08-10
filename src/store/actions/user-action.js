import axios from "axios";
import {
  GET_USER_INFO,
  GET_USER_LIST,
  UPDATE_USER,
} from "../constants/user-const";

export const getUserListAction = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
      });
      dispatch({
        type: GET_USER_LIST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserInfoAction = (taiKhoan) => {
  return async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        data: { taiKhoan },
      });
      dispatch({
        type: GET_USER_INFO,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "PUT",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        data: { user },
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (res.status === 200) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
