import React, { useState, useEffect } from "react";
import "./RecipeList.css";
import { getShoppingList, setShoppingList } from "../../utilities";
import { navigate } from "@reach/router";

const RecipeList = ({
  recipes,
  getShoppingList,
  setShoppingList,
  selectedShoppingRecipes,
  toggleShoppingListRecipe,
  setSelectedRecipe,
  selectedRecipe,
}) => {
  return (
    <div className="RecipeList-Container">
      <div className="RecipeRow-Container RecipeList-Header">
        <div className="RecipeRow-Title">Recipe Name</div>
        <div className="RecipeRow-Time">Time</div>
      </div>

      {recipes.map((recipe) => {
        return (
          <RecipeRow
            key={`RecipeList-Recipe-${recipe.name}`}
            recipe={recipe}
            getShoppingList={getShoppingList}
            setShoppingList={setShoppingList}
            selectedShoppingRecipes={selectedShoppingRecipes}
            toggleShoppingListRecipe={toggleShoppingListRecipe}
            setSelectedRecipe={setSelectedRecipe}
            selectedRecipe={selectedRecipe}
          />
        );
      })}
    </div>
  );
};

const RecipeRow = ({
  recipe,
  selectedShoppingRecipes,
  toggleShoppingListRecipe,
  setSelectedRecipe,
  selectedRecipe,
}) => {
  const isSelected = selectedShoppingRecipes.includes(recipe.name);
  const cssClass = isSelected ? "RecipeRow-Selected" : "RecipeRow-Unselected";
  return (
    <div className={`RecipeRow-Container ${cssClass}`}>
      <div className="RecipeRow-Title ">
        <input
          type="checkbox"
          name={`checkbox-${recipe.name}`}
          id={`checkbox-${recipe.name}`}
          checked={isSelected}
          onChange={() => {
            toggleShoppingListRecipe(recipe.name);
          }}
        />
        <label for={`checkbox-${recipe.name}`}>Test</label>
        <span
          onClick={() => {
            setSelectedRecipe(recipe);
          }}
          className="RecipeRow-Title-Text"
          style={{ color: selectedRecipe.name == recipe.name ? "var(--primary)" : undefined }}
        >
          {recipe.name}
        </span>
        {recipe.source.startsWith("http") && (
          <a className="RecipeRow-link" href={recipe.source}>
            (link)
          </a>
        )}
      </div>
      <div className="RecipeRow-Time">{recipe.time ? recipe.time + "m" : "---"}</div>
    </div>
  );
};

export default RecipeList;
