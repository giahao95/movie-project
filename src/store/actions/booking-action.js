import axios from "axios";
import { CHOICE_CHAIR, GET_LIST_TICKET } from "../constants/booking-const";

export const getListTicketAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
      });
      dispatch({
        type: GET_LIST_TICKET,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const bookingTicketAction = (
  maLichChieu,
  danhSachVe,
  taiKhoanNguoiDung,
  history
) => {
  return async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
        data: {
          maLichChieu,
          danhSachVe,
          taiKhoanNguoiDung,
        },
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (res.status === 200) {
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const choiceChairAction = (chair) => {
  return {
    type: CHOICE_CHAIR,
    payload: chair,
  };
};
