import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import "../utilities.css";
import AddRecipe from "./pages/AddRecipe.js";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-container">
        <Router>
          <AddRecipe path="/" />
          <Home path="/home" />
          <NotFound default />
        </Router>
      </div>
    );
  }
}

export default App;
