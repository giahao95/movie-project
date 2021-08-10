import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getMovieDetailAction } from "../../store/actions/movie-action";
import {
  CircularProgress,
  Container,
  Grid,
  withStyles,
} from "@material-ui/core";
import { style } from "./style";
import { Typography } from "@material-ui/core";
import format from "date-format";
import ShowTime from "../../components/show-time/ShowTime";

function MovieDetail(props) {
  const dispatch = useDispatch();
  const { maPhim } = useParams();
  const { classes, movieDetail, loading } = props;

  useEffect(() => {
    dispatch(getMovieDetailAction(maPhim));
  }, []);

  if (loading) {
    return (
      <div style={{ height: "100vh" }}>
        <CircularProgress className={classes.loading} />
      </div>
    );
  }
  return (
    <div style={{ position: "relative" }}>
      <Container maxWidth="lg">
        <div
          style={{ backgroundImage: `url(${movieDetail.hinhAnh})` }}
          className={classes.backgroundImg}
        ></div>
        <div className={classes.backgroundMovie}></div>
        <Grid container alignItems="center" style={{ paddingTop: "50px" }}>
          <Grid item xs={12} md={4}>
            <img
              src={movieDetail.hinhAnh}
              alt={movieDetail.biDanh}
              className={classes.img}
            />
          </Grid>
          <Grid item xs={12} md={8} className={classes.content}>
            <Typography>
              {format("dd.MM.yyyy", new Date(movieDetail.ngayKhoiChieu))}
            </Typography>
            <Typography variant="h4">{movieDetail.tenPhim}</Typography>
            <Typography>{movieDetail.moTa}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <ShowTime lichChieu={movieDetail.lichChieu} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export const mapStateToProps = (state) => {
  return {
    movieDetail: state.movie.movieDetail,
    cinemaList: state.cinema.cinemaList,
    loading: state.common.loading,
  };
};

export default connect(mapStateToProps)(withStyles(style)(MovieDetail));
