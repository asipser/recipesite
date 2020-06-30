import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import "../utilities.css";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }
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
