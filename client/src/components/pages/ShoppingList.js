import React, { useState, useEffect } from "react";
import { get, getRawShoppingList, setShoppingList } from "../../utilities";
import "./ShoppingList.css";

const getSelectedRecipes = () => {
  const recipeMap = getRawShoppingList();
  return Object.keys(recipeMap).filter((recipe) => recipeMap[recipe]);
};
const flatten = (listOfLists) => {
  return [].concat.apply([], listOfLists);
};

const ShoppingList = () => {
  const getPantryIngredients = (recipes) => {
    return flatten(recipes.map(({ ingredients }) => ingredients));
  };

  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [pantryIngredientsMap, setPantryIngredientsMap] = useState({});

  useEffect(() => {
    const selectedRecipesName = getSelectedRecipes();
    get("/api/shopping", { recipes: selectedRecipesName }).then((newSelectedRecipes) => {
      const newPantryIngredientsMap = {};
      getPantryIngredients(newSelectedRecipes).forEach((ingredient) => {
        newPantryIngredientsMap[ingredient] = false;
      });
      setSelectedRecipes(newSelectedRecipes);
      setPantryIngredientsMap(newPantryIngredientsMap);
    });
  }, []);

  const removeRecipe = (recipeName) => {
    setShoppingList(recipeName, false);
    const newSelectedRecipes = selectedRecipes.filter(
      (otherRecipe) => otherRecipe.recipe_name !== recipeName
    );
    const newPantryIngredientsMap = {};
    getPantryIngredients(newSelectedRecipes).forEach((ingredient) => {
      newPantryIngredientsMap[ingredient] = pantryIngredientsMap[ingredient];
    });
    setSelectedRecipes(newSelectedRecipes);
    setPantryIngredientsMap(newPantryIngredientsMap);
  };

  return (
    <div className="ShoppingList-Container">
      <div className="ShoppingList-SelectedRecipes-Container">
        <div className="ShoppingList-SelectedRecipes-Header">Selected Recipes:</div>
        <div className="ShoppingList-SelectedRecipes-Recipes">
          {selectedRecipes.map((recipe) => (
            <SelectedRecipe
              key={`ShoppingList-${recipe.recipe_name}`}
              recipe={recipe.recipe_name}
              OnRemove={() => removeRecipe(recipe.recipe_name)}
            />
          ))}
        </div>
      </div>
      <div className="ShoppingList-Pantry-Container">
        <div className="ShoppingList-Pantry-Header">Pantry</div>
        <div className="ShoppingList-Pantry-Table">
          <div className="ShoppingList-Pantry-Table-Header">
            <div className="ShoppingList-Pantry-Table-Item"></div>
            <div className="ShoppingList-Pantry-Table-AddToList"></div>
          </div>
          {Object.keys(pantryIngredientsMap)
            .sort()
            .map((ingredient) => {
              return (
                <div key={`pantry-ingredient-${ingredient}`}>
                  <div>{ingredient}</div>
                  <div>{pantryIngredientsMap[ingredient] ? "True" : "False"}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const SelectedRecipe = ({ recipe, OnRemove }) => {
  return (
    <div className="ShoppingList-SelectedRecipes-Recipe">
      <div>{recipe}</div>
      <div className="ShoppingList-SelectedRecipes-Recipe-Remove" onClick={(e) => OnRemove()}>
        remove
      </div>
    </div>
  );
};

export default ShoppingList;
