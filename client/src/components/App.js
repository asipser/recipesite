import React, { Component, useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import "../utilities.css";
import AddRecipe from "./pages/AddRecipe.js";
import Navbar from "./modules/Navbar.js";
import ViewRecipe from "./pages/ViewRecipe.js";
import ShoppingList from "./pages/ShoppingList.js";

const App = () => {
  const [selectedShoppingRecipes, setSelectedShoppingRecipes] = useState([]);

  const SHOPPING_LIST_KEY_NEW = "shoppingList_new";

  const loadShoppingListRecipes = () => {
    const rawShoppingList = window.localStorage.getItem(SHOPPING_LIST_KEY_NEW);
    return rawShoppingList === null ? [] : JSON.parse(rawShoppingList);
  };

  const toggleShoppingListRecipe = (recipeName) => {
    let newSelectedRecipes = !selectedShoppingRecipes.includes(recipeName)
      ? [...selectedShoppingRecipes, recipeName]
      : selectedShoppingRecipes.filter((name) => name !== recipeName);
    console.log(newSelectedRecipes);
    setSelectedShoppingRecipes(newSelectedRecipes);
    window.localStorage.setItem(SHOPPING_LIST_KEY_NEW, JSON.stringify(newSelectedRecipes));
  };

  useEffect(() => {
    setSelectedShoppingRecipes(loadShoppingListRecipes());
  }, []);

  return (
    <div className="app-container">
      <Navbar
        selectedShoppingRecipes={selectedShoppingRecipes}
        toggleShoppingListRecipe={toggleShoppingListRecipe}
      />
      <Router primary={false}>
        <AddRecipe path="/add-recipe" />
        <ViewRecipe path="/view-recipe" />
        <ShoppingList
          selectedShoppingRecipes={selectedShoppingRecipes}
          toggleShoppingListRecipe={toggleShoppingListRecipe}
          path="/shopping-list"
        />
        <Home
          selectedShoppingRecipes={selectedShoppingRecipes}
          toggleShoppingListRecipe={toggleShoppingListRecipe}
          path="/"
        />
        <NotFound default />
      </Router>
    </div>
  );
};

export default App;
