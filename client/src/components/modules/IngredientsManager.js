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

  const renderSelectedIngredients = () => {
    if (selectedDirectionNumber == -1) return;

    return directionIngredients[selectedDirectionNumber].map((ingredientIndex) => (
      <div
        key={`selected-ingredient-${ingredientIndex}`}
        className="IngredientsManager-Ingredient IngredientsManager-Ingredient-selected"
        onClick={() => {
          toggleIngredient(ingredientIndex);
        }}
      >
        {allIngredients[ingredientIndex]}
      </div>
    ));
  };

  const renderRemainderIngredients = () => {
    const ingredientsClassName =
      selectedDirectionNumber != -1 ? "IngredientsManager-Ingredient" : 0;
    return allIngredients.map((ingredient, i) => {
      if (
        selectedDirectionNumber == -1 ||
        !directionIngredients[selectedDirectionNumber].includes(i)
      ) {
        return (
          <div
            key={`${ingredient}-${i}`}
            className={ingredientsClassName}
            onClick={() => {
              toggleIngredient(i);
            }}
          >
            {ingredient}
          </div>
        );
      }
    });
  };

  return (
    <div className={"IngredientsManager-Ingredient-container"}>
      <div className="IngredientsManager-Ingredient-header">Ingredients:</div>
      {renderSelectedIngredients()}
      {renderRemainderIngredients()}
    </div>
  );
};

export default IngredientsManager;
