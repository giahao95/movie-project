import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "65px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  link: {
    textDecoration: "none",
    padding: "5px 10px",
  },
  navBar: {
    backgroundColor: "#fff",
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  let [user, setUser] = useState({} ? false : true);
  // let user = {};

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userClient = JSON.parse(localStorage.getItem("user"));
      if (userClient.maLoaiNguoiDung === "KhachHang") {
        setUser({ ...userClient });
      }
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    history.push("/");
    history.go(0);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.navBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <img src="/images/movie-icon.png" alt="Cinema" />
          <Typography className={classes.title} align="center">
            <Link to="/" className={classes.link}>
              Trang chủ
            </Link>
            <Link to="/" className={classes.link}>
              Tin tức
            </Link>
            <Link to="/" className={classes.link}>
              Liên hệ
            </Link>
            <Link to="/" className={classes.link}>
              Ứng dụng
            </Link>
          </Typography>
          <Typography>
            <Link
              to="/signin-up"
              className={classes.link}
              style={user ? { display: "none" } : { display: "inline" }}
            >
              Đăng nhập
            </Link>
          </Typography>
          <Link
            to="/user-info"
            className={classes.link}
            style={user ? { display: "block" } : { display: "none" }}
          >
            <Typography style={{ display: "flex", alignItems: "center" }}>
              <PersonOutlineIcon />
              {user.taiKhoan}
            </Typography>
          </Link>
          <IconButton
            onClick={handleLogOut}
            style={user ? { display: "inline" } : { display: "none" }}
            title="Đăng xuất"
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
