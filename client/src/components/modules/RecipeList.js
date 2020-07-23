import React, { useState, useEffect } from "react";
import "./RecipeList.css";
import { getShoppingList, setShoppingList } from "../../utilities";

const RecipeList = ({ recipes }) => {
  return (
    <div className="RecipeList-Container">
      <div className="RecipeRow-Container RecipeList-Header">
        <div className="RecipeRow-Title">Recipe Name</div>
        <div className="RecipeRow-Time">Time</div>
        <div className="RecipeRow-Actions-Container">Actions</div>
      </div>

      {recipes.map((recipe) => {
        return (
          <div key={`RecipeList-Recipe-${recipe.name}`}>
            <RecipeRow recipe={recipe} />
          </div>
        );
      })}
    </div>
  );
};

const RecipeRow = ({ recipe }) => {
  const [displayRecipe, setDisplayRecipe] = useState(false);
  const [selected, setSelected] = useState(getShoppingList(recipe.name));

  const toggleSelected = () => {
    setSelected(!selected);
    setShoppingList(recipe.name, !selected);
  };

  const ingredientToText = (ingredient) => {
    const words = [ingredient.amount, ingredient.unit, ingredient.item];
    return words.join(" ");
  };

  return (
    <div className="RecipeRow-Container">
      <div className="RecipeRow-Title">{recipe.name}</div>
      <div className="RecipeRow-Time">{recipe.time}m</div>

      <div className="RecipeRow-Actions-Container">
        <div className="RecipeRow-Action RecipeRow-Action-Edit">Edit</div>
        <div
          className="RecipeRow-Action RecipeRow-Action-View"
          onClick={(e) => setDisplayRecipe(!displayRecipe)}
        >
          View
        </div>
        {selected ? (
          <div
            className="RecipeRow-Action RecipeRow-Action-Remove"
            onClick={(e) => toggleSelected()}
          >
            ✖
          </div>
        ) : (
          <div className="RecipeRow-Action RecipeRow-Action-Add" onClick={(e) => toggleSelected()}>
            ✓
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
