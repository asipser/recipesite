import React, { useState, useRef } from "react";
import "./AddRecipe.css";
import EditableText from "../modules/EditableText";
import IngredientsTable from "../modules/IngredientsTable";
import DirectionAdder from "../modules/DirectionAdder";
import AutosizeInput from "react-input-autosize";
import RecipeProgression from "./RecipeProgression";

const AddRecipe = () => {
  const inputRef = useRef();
  const handleChange = (event) => {
    setTitleText(event.target.value);
  };

  const [titleText, setTitleText] = useState("");
  const [rows, setRows] = useState([{}]);

  //adding ingredients ("ingredients") or adding directions ("directions")
  const [createMode, setCreateMode] = useState("ingredients");

  // selected direction, so one can add ingredients to it, -1 for no direction selected
  const [selectedDirectionNumber, setSelectedDirectionNumber] = useState(-1);

  // list of all recipe directions
  const [directions, setDirections] = useState([
    { title: "", time: 0, contents: "", ingredients: [] },
  ]);

  const getFilledRows = () => {
    return rows.filter((row) => row.filled);
  };

  return (
    <div className="AddRecipe-Container">
      <div className="AddRecipe-RecipeHeader">
        <EditableText
          divClassName={"AddRecipe-RecipeHeader-Title"}
          text={titleText}
          childRef={inputRef}
          placeholder={"Recipe Name"}
        >
          <AutosizeInput
            inputClassName={"AddRecipe-RecipeHeader-Title"}
            ref={inputRef}
            placeholder={"Recipe Name"}
            value={titleText}
            onChange={handleChange}
          />
        </EditableText>
      </div>
      <div className="AddRecipe-RecipeBody">
        {createMode == "ingredients" && <IngredientsTable setRows={setRows} rows={rows} />}
        {createMode == "directions" && (
          <DirectionAdder
            allIngredients={getFilledRows()}
            {...{
              selectedDirectionNumber,
              setSelectedDirectionNumber,
              directions,
              setDirections,
            }}
          />
        )}
      </div>
      <div className="AddRecipe-RecipeFooter">
        <RecipeProgression
          setProgress={setCreateMode}
          progress={createMode}
          onCompletion={() => alert("hello")}
        />
      </div>
    </div>
  );
};

export default AddRecipe;
