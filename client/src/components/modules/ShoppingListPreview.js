import React from "react";
import "./ShoppingListPreview.css";

const ShoppingListPreview = ({
  shoppingListIngredients,
  recipeMap,
  pantryIngredientsMap,
  ingredientStoreMap,
  setRecipeMap,
}) => {
  const MERGE_UNIT_SCALE_FACTORS = {
    teaspoon: { targetUnit: "cup", scaleFactor: 0.0208333 },
    tablespoon: { targetUnit: "cup", scaleFactor: 0.0625 },
    gram: { targetUnit: "pound", scaleFactor: 0.00220462 },
    ounce: { targetUnit: "pound", scaleFactor: 0.0625 },
  };

  const mergeUnits = (unitsObj) => {
    return unitsObj;
  };

  const getCombinedIngredientString = (ingredient, unitsObj) => {
    // do all math for combining amounts within a given ingredient
    // return a div

    if (pantryIngredientsMap[ingredient] === false) {
      return <></>;
    }

    const mergedUnits = mergeUnits(unitsObj);

    const ingredientsDivs = Object.entries(mergedUnits).map(([unit, amounts]) => {
      let sum = 0;
      let explanations = [];
      amounts.forEach(({ recipe, amount }) => {
        let recipeAmount = (amount * recipeMap[recipe].userServings) / recipeMap[recipe].servings;
        recipeAmount = Math.round(recipeAmount * 1000) / 1000;
        sum += recipeAmount;
        explanations.push(`${recipeAmount} for ${recipe}`);
      });
      const recipeUnit = unit != "unit" ? unit : "";
      return (
        <div>
          {`${sum} ${recipeUnit} ${ingredient}`}{" "}
          {explanations.length > 1 &&
            explanations.map((explanation) => (
              <div className="ShoppingListPreview-Ingredient-Explanation">{`(${explanation})`}</div>
            ))}
        </div>
      );
    });

    return <>{ingredientsDivs}</>;
  };

  const renderStoreIngredients = (store) => {
    if (
      ingredientStoreMap[store].every((ingredient) => pantryIngredientsMap[ingredient] === false)
    ) {
      return; // means every ingredient needed from the store is in the pantry, so no need to render
    }

    return (
      <>
        <div className="ShoppingListPreview-StoreName-Header">{store}</div>
        <div className="ShoppingListPreview-StoreName-Ingredients">
          {ingredientStoreMap[store].map((ingredient) => {
            return getCombinedIngredientString(ingredient, shoppingListIngredients[ingredient]);
          })}
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="PantrySelecter-SelectedRecipes-Header">Shopping List Preview</div>
      {Object.keys(ingredientStoreMap).map((store) => renderStoreIngredients(store))}
    </div>
  );
};

export default ShoppingListPreview;
