import React, { useState } from "react";
import { getRawShoppingList, getShoppingList, setShoppingList } from "../../utilities";
import "./ShoppingList.css";

const getSelectedRecipes = () => {
  const recipeMap = getRawShoppingList();
  return Object.keys(recipeMap).filter((recipe) => recipeMap[recipe]);
};

const ShoppingList = () => {
  const [selectedRecipes, setSelectedRecipes] = useState(getSelectedRecipes());
  return (
    <div className="ShoppingList-Container">
      <div>
        Selected Recipes:
        {selectedRecipes.map((recipe) => (
          <div key={`ShoppingList-${recipe}`}>{recipe}</div>
        ))}
      </div>
    </div>
  );
};

const SelectedRecipe = ({ recipe, OnRemove }) => {
  return (
    <div className="ShoppingList-SelectedRecipe">
      <div>{recipe}</div>
      <div className="ShoppingList-SelectedRecipe-Remove" onClick={() => OnRemove()}>
        Remove
      </div>
    </div>
  );
};

export default ShoppingList;
