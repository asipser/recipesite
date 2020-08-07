import React, { useState, useEffect } from "react";
import "./ShoppingListNav.css";
import { navigate } from "@reach/router";

const ShoppingListNav = ({ selectedShoppingRecipes, toggleShoppingListRecipe }) => {
  return (
    <div className="ShoppingListNav-Container">
      <div onClick={() => navigate("/shopping-list")} className="u-link ShoppingListNav-Header">
        Shopping List
        <span
          style={{
            paddingLeft: 4,
            color: selectedShoppingRecipes.length > 0 ? "#2ecc71" : undefined,
          }}
        >
          ({selectedShoppingRecipes.length})
        </span>
      </div>
      <div className="ShoppingListNav-dropdown-container">
        {selectedShoppingRecipes.sort().map((name) => (
          <div className="ShoppingListNav-dropdown-item">
            <span>{name}</span>
            <span className="ShoppingListNav-remove" onClick={() => toggleShoppingListRecipe(name)}>
              &minus;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingListNav;
