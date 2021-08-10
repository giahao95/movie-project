import { Button, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  bookingTicketAction,
  choiceChairAction,
  getListTicketAction,
} from "../../store/actions/booking-action";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  screen: {
    width: "980px",
    height: "5px",
    backgroundColor: "#f29c2b",
    border: "1px solid #000",
    margin: "100px auto 0",
  },

  chairSection: {
    width: "980px",
    margin: "20px auto",
    textAlign: "center",
  },

  chair: {
    minWidth: "35px",
    padding: "4px 0",
    margin: "10px 3px",
    borderRadius: "50% 50% 0 0",
  },
}));

function Booking() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { listChair } = useSelector((state) => state.booking);

  const { maLichChieu } = useParams();

  useEffect(() => {
    dispatch(getListTicketAction(maLichChieu));
  }, []);

  const handleChoice = (chair) => {
    dispatch(choiceChairAction(chair));
  };

  const renderListChair = () => {
    return listChair?.danhSachGhe?.map((chair, index) => {
      return (
        <>
          <Button
            className={classes.chair}
            color={chair.dangChon ? "secondary" : "primary"}
            key={index}
            variant="contained"
            disabled={chair.daDat}
            onClick={() => handleChoice(chair)}
          >
            {chair.tenGhe}
          </Button>
          <br
            style={
              (index + 1) % 20 === 0
                ? { display: "block" }
                : { display: "none" }
            }
          />
        </>
      );
    });
  };

  const handleBooking = () => {
    const listChairChoice = listChair.danhSachGhe.filter(
      (chair) => chair.dangChon
    );
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(
      bookingTicketAction(maLichChieu, listChairChoice, user.taiKhoan, history)
    );
  };

  const handleOpen = () => {
    const listChairChoice = listChair.danhSachGhe.filter(
      (chair) => chair.dangChon
    );
    console.log(listChairChoice);
    if (listChairChoice.length > 0) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderChair = () => {
    const chair = [];
    const listChairChoice = listChair.danhSachGhe?.filter(
      (chair) => chair.dangChon
    );
    listChairChoice?.forEach((item) => {
      chair.push(item.tenGhe);
    });
    return chair;
  };

  const total = () => {
    let sum = 0;
    const listChairChoice = listChair.danhSachGhe?.filter(
      (chair) => chair.dangChon
    );
    listChairChoice?.forEach((item) => {
      sum += item.giaVe;
    });
    return sum;
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Thông tin đặt vé</h2>
      <p>Tên phim: {listChair.thongTinPhim?.tenPhim}</p>
      <p>
        Tên rạp: {listChair.thongTinPhim?.tenCumRap} (
        {listChair.thongTinPhim?.tenRap})
      </p>
      <p>Ngày chiếu: {listChair.thongTinPhim?.ngayChieu}</p>
      <p>Giờ chiếu: {listChair.thongTinPhim?.gioChieu}</p>
      <p>Số ghế: {renderChair().join(", ")}</p>
      <p>Số ghế: {total()}đ</p>
      <Button variant="contained" color="primary" onClick={handleBooking}>
        Thanh toán
      </Button>
    </div>
  );

  return (
    <>
      <Container maxWidth="lg">
        <div className={classes.screen}></div>
        <Typography style={{ marginLeft: "570px" }}>Screen</Typography>
        <section className={classes.chairSection}>{renderListChair()}</section>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpen}
          style={{ display: "block", margin: "auto" }}
        >
          Đặt vé
        </Button>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}

export default Booking;
