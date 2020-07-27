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
      <div className="PantrySelecter-SelectedRecipes-Container">
        <div className="PantrySelecter-SelectedRecipes-Header">Selected Recipes:</div>
        <div className="PantrySelecter-SelectedRecipes-Recipes">
          {selectedRecipes.map((recipe) => (
            <SelectedRecipe
              key={`PantrySelecter-${recipe}`}
              recipe={recipe}
              OnRemove={() => onRemoveRecipe(recipe)}
            />
          ))}
        </div>
      </div>
      <div className="PantrySelecter-Pantry-Container">
        <div className="PantrySelecter-Pantry-Header">Pantry</div>
        <div className="PantrySelecter-Pantry-Table">
          <div className="PantrySelecter-Pantry-Table-Row PantrySelecter-Pantry-Table-Header">
            <div className="PantrySelecter-Pantry-Table-Item">Item</div>
            <div className="PantrySelecter-Pantry-Table-AddToList">Add to List</div>
          </div>
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

  return (
    <div className="PantrySelecter-Pantry-Table-Row">
      <div>{ingredient}</div>
      <form>
        <input
          id="addToList-true"
          type="radio"
          checked={addToList}
          onChange={(e) => handleChange()}
        />
        <label>True</label>
        <input
          id="addToList-false"
          type="radio"
          checked={!addToList}
          onChange={(e) => handleChange()}
        />
        <label>False</label>
      </form>
    </div>
  );
};

export default PantrySelecter;
