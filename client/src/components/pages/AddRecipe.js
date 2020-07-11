import React, { useState, useRef } from "react";
import "./AddRecipe.css";
import EditableText from "../modules/EditableText";
import DirectionAdder from "../modules/DirectionAdder";

const AddRecipe = () => {
  const inputRef = useRef();

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const [text, setText] = useState("Title");

  return (
    <div className="AddRecipe-Container">
      <div className="AddRecipe-RecipeHeader">
        <EditableText divClassName={"AddRecipe-RecipeHeader-Title"} text={text} childRef={inputRef}>
          <input
            className={"AddRecipe-RecipeHeader-Title"}
            ref={inputRef}
            value={text}
            onChange={handleChange}
          />
        </EditableText>
      </div>
      <div className="AddRecipe-RecipeBody"></div>
    </div>
  );
};

export default AddRecipe;
