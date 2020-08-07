import React from "react";
import "./Navbar.css";
import { navigate } from "@reach/router";
import Icon from "../public/home.png";
import ShoppingListNav from "./ShoppingListNav";

const Navbar = (props) => {
  return (
    <div className="u-flex Navbar-Container">
      <div className="Navbar-Title" onClick={() => navigate("/")}>
        <img height="64px" width="auto" src={Icon} />
        <span className="Navbar-TitleText">Mister Chef</span>
      </div>
      <div className="u-flex Navbar-ActionsContainer">
        <span
          onClick={() => {
            navigate("/add-recipe");
          }}
          className="u-link Navbar-Action-Add"
        >
          Add Recipe
        </span>
        <ShoppingListNav {...props} />
      </div>
    </div>
  );
};

export default Navbar;
