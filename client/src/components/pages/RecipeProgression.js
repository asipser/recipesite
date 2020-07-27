import React from "react";
import "./RecipeProgression.css";

const RecipeProgression = ({ progress, setProgress, onCompletion, editingRecipe }) => {
  const renderProgressionButtons = () => {
    if (progress == "ingredients") {
      return <div onClick={() => setProgress("directions")}>Directions</div>;
    } else {
      return (
        <>
          <div onClick={() => setProgress("ingredients")}>Go back</div>
          <div
            onClick={() => {
              if (confirm("Are you sure you are done")) {
                onCompletion();
              }
            }}
          >
            {editingRecipe ? "Update Recipe" : "Submit Recipe"}
          </div>
        </>
      );
    }
  };

  return <div className="RecipeProgression-container">{renderProgressionButtons()}</div>;
};

export default RecipeProgression;
