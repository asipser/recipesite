import React from "react";
import "./ScalingSelecter.css";
import ScaleRecipeCard from "./ScaleRecipeCard";

const ScalingSelecter = ({
  shoppingListIngredients,
  recipeMap,
  pantryIngredientsMap,
  setRecipeMap,
}) => {
  const renderScaleCards = () => {
    const recipeNames = Object.keys(recipeMap);
    return recipeNames.map((name) => (
      <ScaleRecipeCard
        key={`scale-card-${name}`}
        recipe={{ ...recipeMap[name], name }}
        setRecipeScale={(userServings) => {
          const updatedRecipe = { ...recipeMap[name], userServings };
          setRecipeMap({ ...recipeMap, [name]: updatedRecipe });
        }}
      />
    ));
  };
  return (
    <div className="ScalingSelecter-Container">
      <div className="ScalingSelecter-ScaleContainer">{renderScaleCards()}</div>
      <div className="ScalingSelecter-PreviewContainer"></div>
    </div>
  );
};

export default ScalingSelecter;
