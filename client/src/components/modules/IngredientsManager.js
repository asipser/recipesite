// used with direciton adder to indicate which ingredients each direction needs
import React from "react";

import "./IngredientsManager.css";

const IngredientsManager = ({
  allIngredients,
  directionIngredients,
  setDirectionIngredients,
  selectedDirectionNumber,
}) => {
  const toggleIngredient = (ingredientIndex) => {
    if (selectedDirectionNumber != -1) {
      let newSelectedIngredients = directionIngredients[selectedDirectionNumber];
      console.log(newSelectedIngredients);
      if (directionIngredients[selectedDirectionNumber].includes(ingredientIndex)) {
        newSelectedIngredients = newSelectedIngredients.filter((i) => i != ingredientIndex);
      } else {
        newSelectedIngredients = [...newSelectedIngredients, ingredientIndex];
      }
      setDirectionIngredients([
        ...directionIngredients.slice(0, selectedDirectionNumber),
        newSelectedIngredients,
        ...directionIngredients.slice(selectedDirectionNumber + 1),
      ]);
    }
  };

  return (
    <div className={"IngredientsManager-Ingredient-container"}>
      {allIngredients.map((ingredient, i) => {
        console.log(
          ingredient,
          i,
          directionIngredients,
          selectedDirectionNumber,
          directionIngredients[selectedDirectionNumber]
        );
        let ingredientClassName = "";
        if (selectedDirectionNumber != -1) {
          ingredientClassName += "IngredientsManager-Ingredient";
          if (directionIngredients[selectedDirectionNumber].includes(i)) {
            ingredientClassName += " IngredientsManager-Ingredient-selected";
          }
        }

        return (
          <div
            key={`${ingredient}-${i}`}
            className={ingredientClassName}
            onClick={() => {
              toggleIngredient(i);
            }}
          >
            {ingredient}
          </div>
        );
      })}
    </div>
  );
};

export default IngredientsManager;
