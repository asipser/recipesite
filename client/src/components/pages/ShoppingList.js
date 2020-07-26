import React, { useState, useEffect } from "react";
import { get, getRawShoppingList, setShoppingList } from "../../utilities";
import "./ShoppingList.css";

const getSelectedRecipes = () => {
  const recipeMap = getRawShoppingList();
  return Object.keys(recipeMap).filter((recipe) => recipeMap[recipe]);
};
const flatten = (listOfLists) => {
  return [].concat.apply([], listOfLists);
};

const ShoppingList = () => {
  const getPantryIngredients = (recipes) => {
    return flatten(recipes.map(({ ingredients }) => ingredients));
  };

  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [pantryIngredientsMap, setPantryIngredientsMap] = useState({});

  useEffect(() => {
    const selectedRecipesName = getSelectedRecipes();
    get("/api/shopping", { recipes: selectedRecipesName }).then((newSelectedRecipes) => {
      const newPantryIngredientsMap = {};
      getPantryIngredients(newSelectedRecipes).forEach((ingredient) => {
        newPantryIngredientsMap[ingredient] = false;
      });
      setSelectedRecipes(newSelectedRecipes);
      setPantryIngredientsMap(newPantryIngredientsMap);
    });
  }, []);

  const removeRecipe = (recipeName) => {
    setShoppingList(recipeName, false);
    const newSelectedRecipes = selectedRecipes.filter(
      (otherRecipe) => otherRecipe.recipe_name !== recipeName
    );
    const newPantryIngredientsMap = {};
    getPantryIngredients(newSelectedRecipes).forEach((ingredient) => {
      newPantryIngredientsMap[ingredient] = pantryIngredientsMap[ingredient];
    });
    setSelectedRecipes(newSelectedRecipes);
    setPantryIngredientsMap(newPantryIngredientsMap);
  };

  const handleOnToggle = (ingredient, addToList) => {
    setPantryIngredientsMap({ ...pantryIngredientsMap, [ingredient]: addToList });
  };

  return (
    <div className="ShoppingList-Container">
      <div className="ShoppingList-SelectedRecipes-Container">
        <div className="ShoppingList-SelectedRecipes-Header">Selected Recipes:</div>
        <div className="ShoppingList-SelectedRecipes-Recipes">
          {selectedRecipes.map((recipe) => (
            <SelectedRecipe
              key={`ShoppingList-${recipe.recipe_name}`}
              recipe={recipe.recipe_name}
              OnRemove={() => removeRecipe(recipe.recipe_name)}
            />
          ))}
        </div>
      </div>
      <div className="ShoppingList-Pantry-Container">
        <div className="ShoppingList-Pantry-Header">Pantry</div>
        <div className="ShoppingList-Pantry-Table">
          <div className="ShoppingList-Pantry-Table-Row ShoppingList-Pantry-Table-Header">
            <div className="ShoppingList-Pantry-Table-Item">Item</div>
            <div className="ShoppingList-Pantry-Table-AddToList">Add to List</div>
          </div>
          {Object.keys(pantryIngredientsMap)
            .sort()
            .map((ingredient) => (
              <PantryRow
                key={`PantryRow-${ingredient}`}
                ingredient={ingredient}
                onToggle={(addToList) => handleOnToggle(ingredient, addToList)}
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
    <div className="ShoppingList-SelectedRecipes-Recipe">
      <div>{recipe}</div>
      <div className="ShoppingList-SelectedRecipes-Recipe-Remove" onClick={(e) => OnRemove()}>
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
    <div className="ShoppingList-Pantry-Table-Row">
      <div>{ingredient}</div>
      <form onChange={(e) => handleChange()}>
        <input id="addToList-true" type="radio" checked={addToList} />
        <label for="addToList-true">True</label>
        <input id="addToList-false" type="radio" checked={!addToList} />
        <label for="addToList-true">False</label>
      </form>
    </div>
  );
};

export default ShoppingList;
