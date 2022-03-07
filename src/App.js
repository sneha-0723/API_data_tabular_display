import React, { Component } from "react";
import History from "./history";
import Payload from "./payload";
import Navbar from "./navbar";

import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
export class App extends Component {
  render() {
    return (
      
        <Router>
         <Navbar/>
        <Switch>
          <Route path="/payload">
            <Payload />
          </Route>
          <Route path="/">
            <History />
          </Route>
        </Switch>
      
        </Router>
      
    );
  }
}

export default App;
