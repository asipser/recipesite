import React, { useState, useEffect } from "react";
import "./RecipeList.css";

const RecipeList = ({ recipes, getInShoppingList, setInShoppingList }) => {
  return (
    <div className="RecipeList-Container">
      {recipes.map((recipe, recIndex) => {
        return (
          <div key={`RecipeList-Recipe-${recipe.name}`}>
            <RecipeListItem
              recipe={recipe}
              initialInShoppingList={getInShoppingList(recipe.name)}
              storeInShoppingList={(inShoppingList) =>
                setInShoppingList(recipe.name, inShoppingList)
              }
            />
          </div>
        );
      })}
    </div>
  );
};

const RecipeListItem = ({ recipe, initialInShoppingList, storeInShoppingList }) => {
  const [displayRecipe, setDisplayRecipe] = useState(false);
  const [inShoppingList, setInShoppingList] = useState(initialInShoppingList);

  const toggleShoppingList = () => {
    setInShoppingList(!inShoppingList);
    storeInShoppingList(!inShoppingList);
  };

  const ingredientToText = (ingredient) => {
    const words = [ingredient.amount, ingredient.unit, ingredient.item];
    return words.join(" ");
  };

  return (
    <div className="RecipeListItem-Recipe">
      <div className="RecipeListItem-RecipeHeader-Container">
        <div className="RecipeListItem-RecipeHeader-Title">{recipe.name}</div>
        <div className="RecipeListItem-RecipeHeader-Actions">
          <div className="RecipeListItem-Action RecipeListItem-Action-Edit">Edit</div>
          <div
            className="RecipeListItem-Action RecipeListItem-Action-View"
            onClick={(e) => setDisplayRecipe(!displayRecipe)}
          >
            View
          </div>
          {inShoppingList ? (
            <div
              className="RecipeListItem-Action RecipeListItem-Action-Remove"
              onClick={(e) => toggleShoppingList()}
            >
              ✖
            </div>
          ) : (
            <div
              className="RecipeListItem-Action RecipeListItem-Action-Add"
              onClick={(e) => toggleShoppingList()}
            >
              ✓
            </div>
          )}
        </div>
      </div>
      {displayRecipe ? (
        <div className="RecipeListItem-RecipeBody-Container">
          {recipe.ingredients.map((ingredient, i) => (
            <div key={`RecipeListItem-Ingredient-${i}`}>{ingredientToText(ingredient)}</div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default RecipeList;
