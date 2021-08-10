import React, { useEffect } from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getUserListAction } from "../../store/actions/user-action";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  table: {
    minWidth: 600,
  },
}));

function UserManagement() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { userList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserListAction());
  }, []);

  const renderUserList = () => {
    return userList?.map((user, index) => {
      return (
        <TableRow>
          <TableCell>{user.hoTen}</TableCell>
          <TableCell>{user.taiKhoan}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.maLoaiNguoiDung}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <TableContainer component={Paper} style={{ overflow: "auto" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Họ tên</TableCell>
              <TableCell>Tài khoản</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mã loại người dùng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderUserList()}</TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}

export default UserManagement;
