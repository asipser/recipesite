import React, { useState, useRef } from "react";
import "./AddRecipe.css";
import EditableText from "../modules/EditableText";
import IngredientsTable from "../modules/IngredientsTable";
import DirectionAdder from "../modules/DirectionAdder";

const AddRecipe = () => {
  const inputRef = useRef();

  const handleChange = (event) => {
    setTitleText(event.target.value);
  };
  const [titleText, setTitleText] = useState("");

  const [ingredientsTableText, setIngredientsTableText] = useState([
    ["", ""],
    ["", ""],
  ]);

  return (
    <div className="AddRecipe-Container">
      <div className="AddRecipe-RecipeHeader">
        <EditableText
          divClassName={"AddRecipe-RecipeHeader-Title"}
          text={titleText}
          childRef={inputRef}
          placeholder={"Title"}
        >
          <input
            className={"AddRecipe-RecipeHeader-Title"}
            ref={inputRef}
            value={titleText}
            onChange={handleChange}
            placeholder={"Title"}
          />
        </EditableText>
      </div>
      <div className="AddRecipe-RecipeBody">
        <IngredientsTable tableText={ingredientsTableText} setTableText={setIngredientsTableText} />
      </div>
    </div>
  );
};

export default AddRecipe;
