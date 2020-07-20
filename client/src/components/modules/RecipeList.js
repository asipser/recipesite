import React from "react";

const RecipeList = ({ recipes }) => {
  return (
    <div>
      {recipes.map((recipe, recIndex) => {
        <div key={`RecipeList-Recipe-${recIndex}`}>{recipe.title}</div>;
      })}
    </div>
  );
};

export default RecipeList;
