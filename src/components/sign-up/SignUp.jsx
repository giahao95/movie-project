import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { getSignUpAction } from "../../store/actions/auth-action";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  const handleChange = (e) => {
    const input = e.target;
    const { name, value } = input;

    setUser({ ...user, [name]: value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(user);
    dispatch(getSignUpAction(user));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={handleSignUp} className={classes.form} noValidate>
          <TextField
            margin="normal"
            require
            fullWidth
            id="hoTen"
            label="Họ tên"
            name="hoTen"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            require
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            require
            fullWidth
            name="soDt"
            label="Số điện thoại"
            id="soDt"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            require
            fullWidth
            name="taiKhoan"
            label="Tài khoản"
            id="taiKhoan"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            require
            fullWidth
            name="matKhau"
            label="Mật khẩu"
            type="password"
            id="matKhau"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Đăng ký
          </Button>
        </form>
      </div>
    </Container>
  );
}
