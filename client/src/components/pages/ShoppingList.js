import React, { useState, useEffect } from "react";
import PantrySelecter from "../modules/PantrySelecter";
import { get, getRawShoppingList, setShoppingList } from "../../utilities";

const ShoppingList = () => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [pantryIngredientsMap, setPantryIngredientsMap] = useState({});

  const getSelectedRecipes = () => {
    const recipeMap = getRawShoppingList();
    return Object.keys(recipeMap).filter((recipe) => recipeMap[recipe]);
  };

  const updatePantryIngredients = (newSelectedRecipes) => {
    get("/api/shopping", { recipes: newSelectedRecipes }).then(({ pantryIngredients }) => {
      const newPantryIngredientsMap = {};
      pantryIngredients.forEach((ingredient) => {
        newPantryIngredientsMap[ingredient] = false;
      });
      console.log(newPantryIngredientsMap);
      setPantryIngredientsMap(newPantryIngredientsMap);
    });
  };

  const handleRemoveRecipe = (recipeName) => {
    setShoppingList(recipeName, false);
    const newSelectedRecipes = selectedRecipes.filter((otherRecipe) => otherRecipe !== recipeName);
    setSelectedRecipes(newSelectedRecipes);
    updatePantryIngredients(newSelectedRecipes);
  };

  const handleOnToggle = (ingredient, addToList) => {
    setPantryIngredientsMap({ ...pantryIngredientsMap, [ingredient]: addToList });
  };

  useEffect(() => {
    const newSelectedRecipes = getSelectedRecipes();
    setSelectedRecipes(newSelectedRecipes);
    updatePantryIngredients(newSelectedRecipes);
  }, []);

  return (
    <PantrySelecter
      selectedRecipes={selectedRecipes}
      pantryIngredientsMap={pantryIngredientsMap}
      onRemoveRecipe={handleRemoveRecipe}
      onToggleIngredient={handleOnToggle}
    />
  );
};

export default ShoppingList;
