import React, { useState, useRef } from "react";
import "./AddRecipe.css";
import EditableText from "../modules/EditableText";
import IngredientsTable from "../modules/IngredientsTable";
import DirectionAdder from "../modules/DirectionAdder";
import AutosizeInput from "react-input-autosize";

const AddRecipe = () => {
  const inputRef = useRef();

  const handleChange = (event) => {
    setTitleText(event.target.value);
  };
  const [titleText, setTitleText] = useState("");

  const getNewRow = () => ["", "", "", ""];

  return (
    <div className="AddRecipe-Container">
      <div className="AddRecipe-RecipeHeader">
        <EditableText
          divClassName={"AddRecipe-RecipeHeader-Title"}
          text={titleText}
          childRef={inputRef}
          placeholder={"Title"}
        >
          <AutosizeInput
            inputClassName={"AddRecipe-RecipeHeader-Title"}
            ref={inputRef}
            placeholder={"Title"}
            value={titleText}
            onChange={handleChange}
          />
        </EditableText>
      </div>
      <div className="AddRecipe-RecipeBody">
        <IngredientsTable />
      </div>
    </div>
  );
};

export default AddRecipe;
