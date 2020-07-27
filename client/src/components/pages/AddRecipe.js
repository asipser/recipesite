import React, { useState, useRef, useEffect } from "react";
import "./AddRecipe.css";
import EditableText from "../modules/EditableText";
import IngredientsTable from "../modules/IngredientsTable";
import DirectionAdder from "../modules/DirectionAdder";
import AutosizeInput from "react-input-autosize";
import RecipeProgression from "./RecipeProgression";
import RecipeMeta from "../modules/RecipeMeta";
import { get } from "../../utilities";

import { post } from "../../utilities";

const AddRecipe = (props) => {
  //adding ingredients ("ingredients") or adding directions ("directions")
  const [viewMode, setViewMode] = useState("ingredients");

  const [meta, setMeta] = useState({
    title:
      props.location.state && props.location.state.name != undefined
        ? props.location.state.name
        : "",
    source:
      props.location.state && props.location.state.source != undefined
        ? props.location.state.source
        : "",
    servings:
      props.location.state && props.location.state.servings != undefined
        ? props.location.state.servings
        : 0,
    tags:
      props.location.state && props.location.state.tags != undefined
        ? props.location.state.tags
        : [],
  });

  //list of all recipe ingredients
  const [ingredients, setIngredients] = useState(
    props.location.state && props.location.state.ingredients != undefined
      ? props.location.state.ingredients
      : []
  );

  // list of all recipe directions
  const [directions, setDirections] = useState(
    props.location.state && props.location.state.directions != undefined
      ? props.location.state.directions
      : []
  );

  // selected direction, so one can add ingredients to it, -1 for no direction selected
  const [selectedDirectionNumber, setSelectedDirectionNumber] = useState(-1);

  //list of all meta information regarding the recipe
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState([]);
  const [ingredientsMeta, setIngredientsMeta] = useState({
    units: [],
    stores: [],
    types: [],
    ingredients: [],
  });

  const getFilledRows = () => {
    return ingredients.filter((row) => row.filled);
  };

  const getFilledDirections = () => {
    return directions.filter((d) => d.contents && d.title);
  };

  useEffect(() => {
    if (allTags.length > 0 && ingredientsMeta.units.length > 0) {
      setLoading(false);
    }
  }, [allTags, ingredientsMeta]);

  useEffect(() => {
    get("/api/ingredients-meta").then(({ units, stores, types, ingredients }) => {
      setIngredientsMeta({ units, stores, types, ingredients });
    });
    get("/api/tags").then((allTags) => {
      setAllTags(allTags);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <RecipeMeta {...{ meta, setMeta, allTags }} />
            <IngredientsTable
              setRows={setIngredients}
              rows={ingredients}
              ingredientsMeta={ingredientsMeta}
            />
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
          editingRecipe={props.location.state != undefined && props.location.state != {}}
          onCompletion={() => {
            post("/api/recipe", {
              meta,
              directions: getFilledDirections(),
              ingredients: getFilledRows(),
            });
          }}
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
