import Booking from "../pages/booking/Booking";
import Home from "../pages/home/Home";
import MovieDetail from "../pages/movie-detail/MovieDetail";
import SignPage from "../pages/sign-page/SignPage";
import UserInfo from "../pages/user-info/UserInfo";
import Dashboard from "../pages/dashboard/Dashboard";
import UserManagement from "../pages/user-management/UserManagement";
import MovieManagement from "../pages/movie-management/MovieManagement";

export const clientRouter = [
  {
    path: "/",
    exact: true,
    Component: Home,
  },
  {
    path: "/movie-detail/:maPhim",
    exact: false,
    Component: MovieDetail,
  },
  {
    path: "/signin-up",
    exact: false,
    Component: SignPage,
  },
  {
    path: "/booking/:maLichChieu",
    exact: false,
    Component: Booking,
    checkLogin: true,
  },
  {
    path: "/user-info",
    exact: false,
    Component: UserInfo,
  },
];

export const adminRouter = [
  {
    path: "/admin/dashboard",
    exact: false,
    Component: Dashboard,
  },
  {
    path: "/admin/user-management",
    exact: false,
    Component: UserManagement,
  },
  {
    path: "/admin/movie-management",
    exact: false,
    Component: MovieManagement,
  },
];
