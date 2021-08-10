import React, { useEffect } from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getMovieListAction } from "../../store/actions/movie-action";
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

  paper: {
    padding: "5px 10px",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { movieList } = useSelector((state) => state.movie);
  const { userList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMovieListAction());
    dispatch(getUserListAction());
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Paper elevation={3} className={classes.paper}>
            <Typography>
              Số lượng phim{" "}
              <span style={{ color: "#3D2645" }}>{movieList.length}</span>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} className={classes.paper}>
            <Typography>
              Số lượng người dùng{" "}
              <span style={{ color: "#3D2645" }}>{userList.length}</span>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
}

export default Dashboard;
