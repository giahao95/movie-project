import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { getSignInAction } from "../../store/actions/auth-action";
import { useHistory } from "react-router-dom";

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

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleInputChange = (e) => {
    const element = e.target;
    const { value, name } = element;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(getSignInAction(user, history));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={handleLogin} className={classes.form} noValidate>
          <TextField
            margin="normal"
            require
            fullWidth
            id="taiKhoan"
            label="Tài khoản"
            name="taiKhoan"
            autoComplete="taiKhoan"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            require
            fullWidth
            name="matKhau"
            label="Mật khẩu"
            type="password"
            id="matKhau"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Đăng nhập
          </Button>
        </form>
      </div>
    </Container>
  );
}
