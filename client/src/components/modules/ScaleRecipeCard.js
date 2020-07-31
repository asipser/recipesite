import React, { useState } from "react";
import "./ScaleRecipeCard.css";

const ScaleRecipeCard = ({ recipe, setRecipeScale }) => {
  const INCREMENT_FACTOR = 5;
  const ROUND_FACTOR = 10 ** 3;
  const [showAllIngredients, setShowAllIngredients] = useState(false);

  const getScaledAmount = (ingredientAmount, recipeServings) => {
    return (
      Math.round(ROUND_FACTOR * (recipe.userServings / recipeServings) * ingredientAmount) /
      ROUND_FACTOR
    );
  };

  const renderProteins = () => {
    const proteins = recipe.ingredients.filter((i) => i.type == "meat" || i.type == "fish");
    return (
      <>
        {proteins.length > 0 && (
          <div>
            <div className="ScaleRecipeCard-Proteins-Header">Proteins</div>

            {proteins.map((ingredient) => (
              <div className="ScaleRecipeCard-Proteins-Text">
                {`${ingredient.item} : ${getScaledAmount(ingredient.amount, recipe.servings)} ${
                  ingredient.unit
                } 
          `}
              </div>
            ))}
          </div>
        )}
        <div>
          <div
            onClick={() => {
              setShowAllIngredients(!showAllIngredients);
            }}
            className="ScaleRecipeCard-Proteins-Header u-link"
          >
            Show all ingredients
          </div>

          {recipe.ingredients
            .filter((i) => i.type != "meat" && i.type != "fish" && showAllIngredients)
            .map((ingredient) => (
              <div className="ScaleRecipeCard-Proteins-Text">
                {`${ingredient.item} : ${getScaledAmount(ingredient.amount, recipe.servings)} ${
                  ingredient.unit
                } 
          `}
              </div>
            ))}
        </div>
      </>
    );
  };
  return (
    <div className="ScaleRecipeCard-Container">
      <div className="ScaleRecipeCard-Name">{recipe.name}</div>
      <div className="ScaleRecipeCard-ServingsContainer">
        <div className="ScaleRecipeCard-Servings">
          <span>Servings:</span> {recipe.userServings}
        </div>
        <input
          className="ScaleRecipeCard-ServingsInput"
          type="range"
          min="0"
          max={Number.parseFloat(recipe.servings) * 3 * INCREMENT_FACTOR}
          value={recipe.userServings * INCREMENT_FACTOR}
          onChange={(e) => {
            setRecipeScale(e.target.value / INCREMENT_FACTOR);
          }}
        />
      </div>

      {renderProteins()}
    </div>
  );
};

export default ScaleRecipeCard;
