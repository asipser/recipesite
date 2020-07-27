import React, { useState, useEffect } from "react";
import PantrySelecter from "../modules/PantrySelecter";
import ScalingSelecter from "../modules/ScalingSelecter";
import { get, getRawShoppingList, setShoppingList } from "../../utilities";
import "./ShoppingList.css";

const ShoppingList = () => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [pantryIngredientsMap, setPantryIngredientsMap] = useState({});
  const [viewPantry, setViewPantry] = useState(true);

  const getSelectedRecipeNames = () => {
    const recipeMap = getRawShoppingList();
    return Object.keys(recipeMap).filter((recipe) => recipeMap[recipe]);
  };

  const fetchData = async (selectedRecipeNames) => {
    return get("/api/shopping", { recipes: selectedRecipeNames }).then(
      ({ pantryIngredients, recipes }) => {
        const newPantryIngredientsMap = {};
        pantryIngredients.forEach((ingredient) => {
          newPantryIngredientsMap[ingredient] =
            pantryIngredientsMap[ingredient] !== undefined
              ? pantryIngredientsMap[ingredient]
              : false;
        });
        return {
          pantryIngredientsMap: newPantryIngredientsMap,
          recipes: recipes,
        };
      }
    );
  };

  const handleRemoveRecipe = (recipeName) => {
    setShoppingList(recipeName, false);
    const newSelectedRecipes = selectedRecipes.filter(
      (otherRecipe) => otherRecipe.name !== recipeName
    );
    fetchData(newSelectedRecipes.map((recipe) => recipe.name)).then((data) => {
      setPantryIngredientsMap(data.pantryIngredientsMap);
      setSelectedRecipes(newSelectedRecipes);
    });
  };

  const handleOnToggle = (ingredient, addToList) => {
    setPantryIngredientsMap({ ...pantryIngredientsMap, [ingredient]: addToList });
  };

  useEffect(() => {
    const newSelectedRecipeNames = getSelectedRecipeNames();
    fetchData(newSelectedRecipeNames).then((data) => {
      setPantryIngredientsMap(data.pantryIngredientsMap);
      setSelectedRecipes(
        data.recipes.map((recipe) => ({ ...recipe, userServings: recipe.servings }))
      );
    });
  }, []);

  return (
    <div className="ShoppingList-Container">
      <div className="ShoopingList-Body">
        {viewPantry ? (
          <PantrySelecter
            selectedRecipes={selectedRecipes.map((recipe) => recipe.name)}
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
