import React from "react";

const ShoppingListProgression = ({ progress, setProgress }) => {
  const renderProgressionButtons = () => {
    if (progress == "pantry") {
      return <div onClick={() => setProgress("scaling")}>Scale Recipes</div>;
    } else if (progress == "scaling") {
      return (
        <>
          <div onClick={() => setProgress("pantry")}>Go back</div>
          <div onClick={() => setProgress("preview")}>Preview</div>
        </>
      );
    } else {
      return (
        <>
          <div onClick={() => setProgress("scaling")}>Go back</div>
        </>
      );
    }
  };

  return <div className="RecipeProgression-container">{renderProgressionButtons()}</div>;
};

export default ShoppingListProgression;
