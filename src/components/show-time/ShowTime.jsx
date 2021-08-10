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
    height: 290,
    margin: "50px 0",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    width: "100%",
    overflow: "auto",
  },
}));

function ShowTime(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { lichChieu } = props;
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { cinemaList } = useSelector((state) => {
    return state.cinema;
  });

  const renderCinemaList = () => {
    return cinemaList?.map((cinema, index) => {
      return (
        <Tab
          style={{ color: "#8ac6d1" }}
          label={cinema.tenHeThongRap}
          key={index}
          data-id={cinema.maHeThongRap}
        />
      );
    });
  };

  // sắp xếp thời gian chiếu theo cụm rạp
  const cinemaNameGroupTime = (tenCumRap) => {
    return lichChieu?.map((item, index) => {
      if (tenCumRap === item.thongTinRap.tenCumRap) {
        return (
          <Button
            style={{ margin: "2px" }}
            variant="contained"
            onClick={() => {
              history.push("/booking/" + item.maLichChieu);
            }}
            key={index}
          >
            {format("dd/MM hh:mm", new Date(item.ngayChieuGioChieu))}
          </Button>
        );
      }
    });
  };

  const renderShowTime = (cinemaId) => {
    let count = [];
    return lichChieu?.map((item, index) => {
      if (cinemaId === item.thongTinRap.maHeThongRap) {
        count.push(item.thongTinRap.tenCumRap);
        if (count.length === 1 || count[index] !== count[index - 1]) {
          return (
            <div key={index}>
              <span style={{ color: "#fff" }}>
                {item.thongTinRap.tenCumRap}
              </span>
              <br />
              {cinemaNameGroupTime(item.thongTinRap.tenCumRap)}
            </div>
          );
        }
      }
    });
  };

  const renderTabPanel = () => {
    return cinemaList?.map((cinema, index) => {
      return (
        <TabPanel
          key={index}
          value={value}
          index={index}
          className={classes.tabPanel}
        >
          {renderShowTime(cinema.maHeThongRap)}
        </TabPanel>
      );
    });
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {renderCinemaList()}
      </Tabs>
      {renderTabPanel()}
    </div>
  );
}

export default ShowTime;
