import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardContent } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 220,
    height: 380,
    boxShadow: "none",
  },
  media: {
    maxWidth: 220,
    height: 290,
  },
});

export default function CardMovie(props) {
  const classes = useStyles();
  const { movie } = props;
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image={movie.hinhAnh}
          title="Contemplative Reptile"
          className={classes.media}
          onClick={() => {
            history.push("/movie-detail/" + movie.maPhim);
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            onClick={() => {
              history.push("/movie-detail/" + movie.maPhim);
            }}
          >
            {movie.tenPhim}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
