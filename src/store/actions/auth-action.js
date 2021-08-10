import axios from "axios";

export const getSignInAction = (user, history) => {
  return async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        data: user,
      });
      if (res.status === 200) {
        if (res.data.maLoaiNguoiDung === "KhachHang") {
          localStorage.setItem("user", JSON.stringify(res.data));
          history.push("/");
        } else {
          if (!localStorage.getItem("admin")) {
            localStorage.setItem("admin", JSON.stringify(res.data));
            history.push("/admin/dashboard");
          } else {
            history.push("/signin-up");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSignUpAction = (user) => {
  return async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
        data: user,
      });
      if (res.status === 200) {
        alert("Đăng ký thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
