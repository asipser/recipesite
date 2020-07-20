import React from "react";

const RecipeList = ({ recipes }) => {
  return (
    <div>
      {recipes.map((recipe, recIndex) => {
        return <div key={`RecipeList-Recipe-${recIndex}`}>{recipe.name}</div>;
      })}
    </div>
  );
};

export default RecipeList;
