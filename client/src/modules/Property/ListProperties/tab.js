import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { requestFetch } from "./actions";
import ListProperties from "./list";
import PropertyPending from "../PropertyPending";
import PropertyActivated from "../PropertyActivated";
import PropertySelling from "../PropertySelling";

function TabPanel(props) {
  const { children, value, index, history, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    props.handleClick();
  }, []);
  return (
    <div className="container mt-75 mb-100">
      <div className="recent-activity my-listing">
        <div className="act-title">
          <h5>Property List</h5>
        </div>
        <div className={classes.root}>
          <AppBar
            position="static"
            style={{ boxShadow: "none" }}
            color="inherit"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="All" {...a11yProps(0)} />
              <Tab label="Pending Approval" {...a11yProps(1)} />
              <Tab label="Approved" {...a11yProps(2)} />
              <Tab label="For Sale" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <ListProperties list={props.myListing} history={props.history} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PropertyPending />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <PropertyActivated />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <PropertySelling />
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  myListing: state.myListing.properties,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => {
      dispatch(requestFetch());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollableTabsButtonAuto);
