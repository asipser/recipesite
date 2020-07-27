import React, { useState, useEffect } from "react";
import PantrySelecter from "../modules/PantrySelecter";
import ScalingSelecter from "../modules/ScalingSelecter";
import { get, getRawShoppingList, setShoppingList } from "../../utilities";
import "./ShoppingList.css";
import P from "pino";

const ShoppingList = () => {
  const [recipeMap, setRecipeMap] = useState([]);
  const [pantryIngredientsMap, setPantryIngredientsMap] = useState({});
  const [viewPantry, setViewPantry] = useState(true);

  const getSelectedRecipeNames = () => {
    const recipeMap = getRawShoppingList();
    return Object.keys(recipeMap).filter((recipe) => recipeMap[recipe]);
  };

  const updateRecipesAndIngredients = (selectedRecipeNames) => {
    get("/api/shopping", { recipes: selectedRecipeNames }).then((data) => {
      const newPantryIngredientsMap = {};
      data.pantryIngredients.forEach((ingredient) => {
        newPantryIngredientsMap[ingredient] =
          pantryIngredientsMap[ingredient] !== undefined ? pantryIngredientsMap[ingredient] : false;
      });
      const newRecipeMap = {};
      selectedRecipeNames.forEach((recipeName) => {
        newRecipeMap[recipeName] = {
          userServings: data.recipeMap[recipeName].servings,
          ...data.recipeMap[recipeName],
          ...recipeMap[recipeName],
        };
      });

      setRecipeMap(newRecipeMap);
      setPantryIngredientsMap(newPantryIngredientsMap);
    });
  };

  const handleRemoveRecipe = (recipeName) => {
    setShoppingList(recipeName, false);
    const newSelectedRecipeNames = Object.keys(recipeMap).filter((other) => other != recipeName);
    updateRecipesAndIngredients(newSelectedRecipeNames);
  };

  const handleOnToggle = (ingredient, addToList) => {
    setPantryIngredientsMap({ ...pantryIngredientsMap, [ingredient]: addToList });
  };

  useEffect(() => {
    const newSelectedRecipeNames = getSelectedRecipeNames();
    updateRecipesAndIngredients(newSelectedRecipeNames);
  }, []);

  return (
    <div className="ShoppingList-Container">
      <div className="ShoopingList-Body">
        {viewPantry ? (
          <PantrySelecter
            selectedRecipes={Object.keys(recipeMap).sort()}
            pantryIngredientsMap={pantryIngredientsMap}
            onRemoveRecipe={handleRemoveRecipe}
            onToggleIngredient={handleOnToggle}
          />
        ) : (
          <ScalingSelecter />
        )}
      </div>
      <div className="ShoppingList-Footer">
        <button onClick={(e) => setViewPantry(!viewPantry)}>Change</button>
      </div>
    </div>
  );
};

export default ShoppingList;
