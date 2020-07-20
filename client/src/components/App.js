import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import "../utilities.css";
import AddRecipe from "./pages/AddRecipe.js";
import Navbar from "./modules/Navbar.js";
import ViewRecipe from "./pages/ViewRecipe.js";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-container">
        <Navbar />
        <Router>
          <AddRecipe path="/add-recipe" />
          <ViewRecipe path="/view-recipe" />
          <Home path="/" />
          <NotFound default />
        </Router>
      </div>
    );
  }
}

export default App;
