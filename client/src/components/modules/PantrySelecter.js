import React, { useState } from "react";
import "./PantrySelecter.css";

const PantrySelecter = ({
  selectedRecipes,
  pantryIngredientsMap,
  onRemoveRecipe,
  onToggleIngredient,
}) => {
  return (
    <div className="PantrySelecter-Container">
      <div className="PantrySelecter-Pantry-Container">
        <div className="PantrySelecter-Pantry-Header">Pantry</div>
        <div className="PantrySelecter-Pantry-Table">
          {Object.keys(pantryIngredientsMap)
            .sort()
            .map((ingredient) => (
              <PantryRow
                key={`PantryRow-${ingredient}`}
                ingredient={ingredient}
                onToggle={(addToList) => onToggleIngredient(ingredient, addToList)}
                initialAddToList={pantryIngredientsMap[ingredient]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const SelectedRecipe = ({ recipe, OnRemove }) => {
  return (
    <div className="PantrySelecter-SelectedRecipes-Recipe">
      <div>{recipe}</div>
      <div className="PantrySelecter-SelectedRecipes-Recipe-Remove" onClick={(e) => OnRemove()}>
        remove
      </div>
    </div>
  );
};

const PantryRow = ({ ingredient, onToggle, initialAddToList }) => {
  const [addToList, setAddToList] = useState(initialAddToList);

  const handleChange = (e) => {
    setAddToList(!addToList);
    onToggle(!addToList);
  };
  const cssClass = addToList ? "PantrySelecter-Row-Selected" : "PantrySelecter-Row";
  return (
    <div className="PantrySelecter-PantryRow-container" onClick={handleChange}>
      <span className={cssClass}>{ingredient}</span>
    </div>
  );
};

export default PantrySelecter;
