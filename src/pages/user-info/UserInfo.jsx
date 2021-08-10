import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import format from "date-format";
import { getUserInfoAction, updateUser } from "../../store/actions/user-action";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  table: {
    minWidth: 650,
  },
}));

export default function UserInfo() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { userClient } = useSelector((state) => state.user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(getUserInfoAction(user.taiKhoan));
  }, []);

  const renderHistoryBooking = () => {
    return userClient.thongTinDatVe?.map((item, index) => {
      const listChair = [];
      item.danhSachGhe?.forEach((chair) => listChair.push(chair.tenGhe));
      return (
        <TableRow key={index}>
          <TableCell>{item.maVe}</TableCell>
          <TableCell>{item.tenPhim}</TableCell>
          <TableCell>
            {item.danhSachGhe[0].tenHeThongRap} ({item.danhSachGhe[0].tenCumRap}
            )
          </TableCell>
          <TableCell>
            {format("dd/MM/yyyy hh:mm", new Date(item.ngayDat))}
          </TableCell>
          <TableCell>{listChair.join(", ")}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Container
      maxWidth="lg"
      style={{ paddingTop: "20px", marginBottom: "236px" }}
    >
      <div className={classes.root}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Thông tin tài khoản" {...a11yProps(0)} />
          <Tab label="Lịch sử đặt vé" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid container>
            <Grid item xs={2}>
              <Typography>Họ tên:</Typography>
            </Grid>
            <Grid item xs={10}>
              {userClient.hoTen}
            </Grid>
            <Grid item xs={2}>
              <Typography>Tài khoản:</Typography>
            </Grid>
            <Grid item xs={10}>
              {userClient.taiKhoan}
            </Grid>
            <Grid item xs={2}>
              <Typography>Email:</Typography>
            </Grid>
            <Grid item xs={10}>
              {userClient.email}
            </Grid>
            <Grid item xs={2}>
              <Typography>Số điện thoại:</Typography>
            </Grid>
            <Grid item xs={10}>
              {userClient.soDT}
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Mã vé</TableCell>
                  <TableCell>Tên phim</TableCell>
                  <TableCell>Tên rạp</TableCell>
                  <TableCell>Suất chiếu</TableCell>
                  <TableCell>Số ghế</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderHistoryBooking()}</TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </div>
    </Container>
  );
}
