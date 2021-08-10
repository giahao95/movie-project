import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CardMovie from "../../components/card-movie/CardMovie";
import Slider from "react-slick";
import { Container } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: "15px 0",
  },
  tab: {
    overflow: "hidden",
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

function MovieList(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { movieList } = props;

  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 5,
    speed: 500,
    rows: 2,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

  const renderMovieList = () => {
    return movieList?.map((movie, index) => {
      return <CardMovie movie={movie} key={index} />;
    });
  };

  return (
    <Container maxWidth="lg" style={{ margin: "50px 0" }}>
      <Slider {...settings}>{renderMovieList()}</Slider>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    movieList: state.movie.movieList,
  };
};

export default connect(mapStateToProps)(MovieList);
