import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import "../utilities.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Router>
          <Home path="/" />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
