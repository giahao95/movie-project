import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import format from "date-format";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: 300,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    width: "100%",
    overflow: "auto",
  },
}));

function CinemaShowTime(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const { cinemaId } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { cinemaListGroup } = useSelector((state) => {
    return state.cinema;
  });

  const renderCinemaListGroup = (cinemaId) => {
    return cinemaListGroup?.map((cinema, index) => {
      if (cinemaId === cinema.maHeThongRap) {
        return cinema.lstCumRap?.map((cumRap, i) => {
          return <Tab label={cumRap.tenCumRap} key={i} />;
        });
      }
    });
  };

  const renderTabPanel = (cinemaId) => {
    return cinemaListGroup?.map((cinema, index) => {
      if (cinemaId === cinema.maHeThongRap) {
        return cinema.lstCumRap?.map((cumRap, i) => {
          return (
            <TabPanel
              key={i}
              value={value}
              index={i}
              className={classes.tabPanel}
            >
              {renderMovieList(cumRap)}
            </TabPanel>
          );
        });
      }
    });
  };

  const renderMovieList = (cumRap) => {
    return cumRap.danhSachPhim?.map((item, index) => {
      return (
        <div key={index} style={{ marginBottom: "30px" }}>
          <Typography variant="h6" color="primary">
            {item.tenPhim}
          </Typography>
          {renderShowTime(item)}
        </div>
      );
    });
  };

  const renderShowTime = (movieList) => {
    return movieList.lstLichChieuTheoPhim?.map((item, index) => {
      return (
        <Button
          key={index}
          variant="contained"
          style={{ margin: "2px" }}
          onClick={() => history.push("/booking/" + item.maLichChieu)}
        >
          {format("dd/MM hh:mm", new Date(item.ngayChieuGioChieu))}
        </Button>
      );
    });
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {renderCinemaListGroup(cinemaId)}
      </Tabs>
      {renderTabPanel(cinemaId)}
    </div>
  );
}

export default CinemaShowTime;
