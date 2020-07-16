import React, { useState, useRef } from "react";
import "./AddRecipe.css";
import EditableText from "../modules/EditableText";
import IngredientsTable from "../modules/IngredientsTable";
import DirectionAdder from "../modules/DirectionAdder";
import AutosizeInput from "react-input-autosize";
import RecipeProgression from "./RecipeProgression";
import RecipeMeta from "../modules/RecipeMeta";

const AddRecipe = () => {
  //adding ingredients ("ingredients") or adding directions ("directions")
  const [viewMode, setViewMode] = useState("ingredients");

  //list of all meta information regarding the recipe
  const [meta, setMeta] = useState({ title: "", source: "", servings: 0 });

  //list of all recipe ingredients
  const [ingredients, setIngredients] = useState([]);

  // list of all recipe directions
  const [directions, setDirections] = useState([]);

  // selected direction, so one can add ingredients to it, -1 for no direction selected
  const [selectedDirectionNumber, setSelectedDirectionNumber] = useState(-1);

  const getFilledRows = () => {
    return ingredients.filter((row) => row.filled);
  };

  return (
    <div className="AddRecipe-Container">
      <div className="AddRecipe-RecipeHeader">
        <RecipeTitleText
          text={meta.title}
          setText={(newTitle) => setMeta({ ...meta, title: newTitle })}
        />
      </div>
      <div className="AddRecipe-RecipeBody">
        {viewMode == "ingredients" && (
          <>
            <RecipeMeta {...{ meta, setMeta }} />
            <IngredientsTable setRows={setIngredients} rows={ingredients} />
          </>
        )}
        {viewMode == "directions" && (
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
          setProgress={setViewMode}
          progress={viewMode}
          onCompletion={() => console.log(meta, getFilledRows(), directions)}
        />
      </div>
    </div>
  );
};

export default AddRecipe;

const RecipeTitleText = ({ text, setText }) => {
  const inputRef = useRef();

  return (
    <EditableText
      divClassName={"AddRecipe-RecipeHeader-Title"}
      text={text}
      childRef={inputRef}
      placeholder={"Recipe Name"}
    >
      <AutosizeInput
        inputClassName={"AddRecipe-RecipeHeader-Title"}
        ref={inputRef}
        placeholder={"Recipe Name"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </EditableText>
  );
};
