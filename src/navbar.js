import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";

import LanguageIcon from "@material-ui/icons/Language";
import FlightIcon from "@material-ui/icons/FlightTakeoff";

import ScheduleIcon from "@material-ui/icons/Schedule";
import { Link } from "react-router-dom";
class NavBar extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit">
              <LanguageIcon style={{ fontSize: "40px" }} />
            </IconButton>
            <Typography style={{ marginLeft: "auto" }}>
              <Link
                to="/payload"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button
                  to="/"
                  color="inherit"
                  variant="outlined"
                  style={{ margin: 3 }}
                >
                  <FlightIcon style={{ marginRight: "12px" }} /> PAYLOAD
                </Button>
              </Link>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Button
                  to="/about"
                  color="inherit"
                  variant="outlined"
                  style={{ margin: 4 }}
                >
                  <ScheduleIcon style={{ marginRight: "12px" }} /> HISTORY
                </Button>
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default NavBar;
