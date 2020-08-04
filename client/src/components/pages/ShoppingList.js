import React, { useState, useEffect } from "react";
import PantrySelecter from "../modules/PantrySelecter";
import ScalingSelecter from "../modules/ScalingSelecter";
import { get, getRawShoppingList, setShoppingList } from "../../utilities";
import "./ShoppingList.css";
import ShoppingListPreview from "../modules/ShoppingListPreview";
import ShoppingListProgression from "../modules/ShoppingListProgression";

const ShoppingList = () => {
  const VIEW_OPTIONS = ["pantry", "scaling", "preview"];
  const [recipeMap, setRecipeMap] = useState([]);
  const [pantryIngredientsMap, setPantryIngredientsMap] = useState({});
  const [viewMode, setViewMode] = useState(VIEW_OPTIONS[0]);
  const [shoppingListIngredients, setShoppingListIngredients] = useState({});
  const [ingredientStoreMap, setIngredientStoreMap] = useState({});

  const getSelectedRecipeNames = () => {
    const recipeMap = getRawShoppingList();
    return Object.keys(recipeMap).filter((recipe) => recipeMap[recipe]);
  };

  const updateRecipesAndIngredients = (selectedRecipeNames) => {
    get("/api/shopping", { recipes: selectedRecipeNames }).then((data) => {
      const newPantryIngredientsMap = {};
      data.pantryIngredients.forEach((ingredient) => {
        newPantryIngredientsMap[ingredient] =
          pantryIngredientsMap[ingredient] !== undefined ? pantryIngredientsMap[ingredient] : false; //preserve old value if exists
      });
      const newRecipeMap = {};
      selectedRecipeNames.forEach((recipeName) => {
        newRecipeMap[recipeName] = {
          userServings: data.recipeMap[recipeName].servings,
          ...recipeMap[recipeName],
          ...data.recipeMap[recipeName],
        };
      });

      setRecipeMap(newRecipeMap);
      setPantryIngredientsMap(newPantryIngredientsMap);
      setShoppingListIngredients(data.shoppingListIngredients);
      setIngredientStoreMap(data.ingredientStoreMap);
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
      <div className="ShoppingList-Control">
        <PantrySelecter
          selectedRecipes={Object.keys(recipeMap).sort()}
          pantryIngredientsMap={pantryIngredientsMap}
          onRemoveRecipe={handleRemoveRecipe}
          onToggleIngredient={handleOnToggle}
        />
        <ScalingSelecter {...{ recipeMap, pantryIngredientsMap, setRecipeMap }} />
      </div>
      <div className="ShoppingList-Preview">
        <ShoppingListPreview
          {...{ ingredientStoreMap, shoppingListIngredients, recipeMap, pantryIngredientsMap }}
        />
      </div>
    </div>
  );
};

export default ShoppingList;
