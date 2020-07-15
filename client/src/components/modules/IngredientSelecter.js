// used with direciton adder to indicate which ingredients each direction needs
import React from "react";

import "./IngredientSelecter.css";

const IngredientSelecter = ({
  allIngredients,
  selectedDirectionNumber,
  directions,
  setDirections,
}) => {
  const toggleIngredient = (ingredientIndex) => {
    if (selectedDirectionNumber != -1) {
      let newSelectedIngredients = directions[selectedDirectionNumber].ingredients;
      if (directions[selectedDirectionNumber].ingredients.includes(ingredientIndex)) {
        newSelectedIngredients = newSelectedIngredients.filter((i) => i != ingredientIndex);
      } else {
        newSelectedIngredients = [...newSelectedIngredients, ingredientIndex];
      }
      const directionsCopy = [...directions];
      directionsCopy[selectedDirectionNumber].ingredients = newSelectedIngredients;
      setDirections(directionsCopy);
    }
  };

  const renderSelectedIngredients = () => {
    if (selectedDirectionNumber == -1) return;

    return directions[selectedDirectionNumber].ingredients.map((ingredientIndex) => (
      <div
        key={`selected-ingredient-${ingredientIndex}`}
        className="IngredientSelecter-Ingredient IngredientSelecter-Ingredient-selected"
        onClick={() => {
          toggleIngredient(ingredientIndex);
        }}
      >
        {allIngredients[ingredientIndex].item}
      </div>
    ));
  };

  const renderRemainderIngredients = () => {
    const ingredientsClassName =
      selectedDirectionNumber != -1 ? "IngredientSelecter-Ingredient" : 0;
    return allIngredients.map((ingredient, i) => {
      if (
        selectedDirectionNumber == -1 ||
        !directions[selectedDirectionNumber].ingredients.includes(i)
      ) {
        return (
          <div
            key={`ingredient-${i}`}
            className={ingredientsClassName}
            onClick={() => {
              toggleIngredient(i);
            }}
          >
            {ingredient.item}
          </div>
        );
      }
    });
  };

  return (
    <div className={"IngredientSelecter-Ingredient-container"}>
      <div className="IngredientSelecter-Ingredient-header">Ingredients:</div>
      {renderSelectedIngredients()}
      {renderRemainderIngredients()}
    </div>
  );
};

export default IngredientSelecter;
