import React, { useState, useEffect } from "react";
import PantrySelecter from "../modules/PantrySelecter";
import ScalingSelecter from "../modules/ScalingSelecter";
import { get, getRawShoppingList, setShoppingList } from "../../utilities";
import "./ShoppingList.css";
import ShoppingListPreview from "../modules/ShoppingListPreview";

const ShoppingList = ({ selectedShoppingRecipes }) => {
  const [recipeMap, setRecipeMap] = useState([]);
  const [pantryIngredientsMap, setPantryIngredientsMap] = useState({});
  const [shoppingListIngredients, setShoppingListIngredients] = useState({});
  const [ingredientStoreMap, setIngredientStoreMap] = useState({});
  const [loading, setLoading] = useState(true);

  const updateRecipesAndIngredients = () => {
    setLoading(true);
    get("/api/shopping", { recipes: selectedShoppingRecipes }).then((data) => {
      const newPantryIngredientsMap = {};
      data.pantryIngredients.forEach((ingredient) => {
        newPantryIngredientsMap[ingredient] =
          pantryIngredientsMap[ingredient] !== undefined ? pantryIngredientsMap[ingredient] : false; //preserve old value if exists
      });
      const newRecipeMap = {};
      selectedShoppingRecipes.forEach((recipeName) => {
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
      setLoading(false);
    });
  };

  const handleOnToggle = (ingredient, addToList) => {
    setPantryIngredientsMap({ ...pantryIngredientsMap, [ingredient]: addToList });
  };

  useEffect(() => {
    updateRecipesAndIngredients();
  }, [selectedShoppingRecipes]);

  return (
    <div className="ShoppingList-Container">
      <div className="ShoppingList-Control">
        <PantrySelecter
          selectedRecipes={Object.keys(recipeMap).sort()}
          pantryIngredientsMap={pantryIngredientsMap}
          onToggleIngredient={handleOnToggle}
        />
        <ScalingSelecter {...{ recipeMap, pantryIngredientsMap, setRecipeMap }} />
      </div>
      <div className="ShoppingList-Preview">
        {!loading && (
          <ShoppingListPreview
            {...{ ingredientStoreMap, shoppingListIngredients, recipeMap, pantryIngredientsMap }}
          />
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
