import React from "react";
import { sign } from "core-js/fn/number";

const ShoppingListPreview = ({
  shoppingListIngredients,
  recipeMap,
  pantryIngredientsMap,
  setRecipeMap,
}) => {
  const MERGE_UNIT_SCALE_FACTORS = {
    teaspoon: { targetUnit: "cup", scaleFactor: 0.0208333 },
    tablespoon: { targetUnit: "cup", scaleFactor: 0.0625 },
    gram: { targetUnit: "pound", scaleFactor: 0.00220462 },
    ounce: { targetUnit: "pound", scaleFactor: 0.0625 },
  };

  const sortOrder = {
    produce: 0,
    meat: 3,
    fish: 1,
    baking: 4,
    spice: 5,
    bread: 6,
    dairy: 2,
    other: 7,
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
      let explanation = "";
      amounts.forEach(({ recipe, amount }) => {
        const recipeAmount = (amount * recipeMap[recipe].userServings) / recipeMap[recipe].servings;
        sum += recipeAmount;
        explanation += `${recipeAmount} ${recipe}`;
      });
      const recipeUnit = unit != "unit" ? unit : "";
      return <div>{`${sum} ${recipeUnit} ${ingredient} (${explanation})`}</div>;
    });

    return <>{ingredientsDivs}</>;
  };

  return (
    <div>
      {Object.entries(shoppingListIngredients).map(([ingredient, unitsObj]) => {
        return getCombinedIngredientString(ingredient, unitsObj);
      })}
    </div>
  );
};

export default ShoppingListPreview;
