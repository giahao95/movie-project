import React from "react";
import MovieList from "../../components/movie-list/MovieList";
import CinemaGroup from "../../components/cinema-group/CinemaGroup";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieListAction } from "../../store/actions/movie-action";
import {
  getCinemaListAction,
  getCinemaListGroupAction,
} from "../../store/actions/cinema-action";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  carousel: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  img: {
    width: "100%",
    height: 400,
  },

  loading: {
    position: "absolute",
    top: "49%",
    left: "49%",
  },
}));

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowBackIosIcon
      color="primary"
      fontSize="large"
      className={className}
      onClick={onClick}
    />
  );
}

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowForwardIosIcon
      color="primary"
      fontSize="large"
      className={className}
      onClick={onClick}
    />
  );
}

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(getMovieListAction());
    dispatch(getCinemaListAction());
    dispatch(getCinemaListGroupAction());
  }, []);

  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (loading) {
    return (
      <div style={{ height: "100vh" }}>
        <CircularProgress className={classes.loading} />
      </div>
    );
  }
  return (
    <Container maxWidth="lg">
      <Slider
        style={{ width: "99%" }}
        {...settings}
        className={classes.carousel}
      >
        <Link to="/movie-detail/5967">
          <img
            src="/images/banner1.jpeg"
            alt="banner"
            className={classes.img}
          />
        </Link>
        <Link to="/movie-detail/1479">
          <img
            src="/images/bannermortal.jpeg"
            alt="banner"
            className={classes.img}
          />
        </Link>
        <Link to="/movie-detail/4031">
          <img
            src="/images/F9_Banner.jpg"
            alt="banner"
            className={classes.img}
          />
        </Link>
      </Slider>
      <section>
        <MovieList />
      </section>
      <section>
        <CinemaGroup />
      </section>
    </Container>
  );
}

export default Home;
