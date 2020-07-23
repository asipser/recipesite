import React, { useState, useEffect } from "react";

import "./Home.css";
import FilterRecipes from "../modules/FilterRecipes";
import RecipeList from "../modules/RecipeList";
import { get, getShoppingList, setShoppingList } from "../../utilities";

const copyAndRemove = (array, elt) => {
  const arrayCopy = [...array];
  const index = arrayCopy.indexOf(elt);
  if (index > -1) {
    return [...arrayCopy.splice(0, index), ...arrayCopy.splice(index + 1, arrayCopy.length)];
  } else {
    return arrayCopy;
  }
};

const Home = () => {
  const [fillerText, setFillerText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const test = [];

  const [selectedRecipe, setSelectedRecipe] = useState({ ingredients: [], directions: [] });

  const toggleTags = (newTag) => {
    const isTagSelected = selectedTags.includes(newTag);
    if (!isTagSelected) {
      setSelectedTags([...selectedTags, newTag]);
    } else {
      setSelectedTags(copyAndRemove(selectedTags, newTag));
    }
  };

  useEffect(() => {
    get("/api/recipes").then((recipes) => {
      setAllRecipes(recipes);
    });
  }, []);

  useEffect(() => {
    const newRecipeList = allRecipes.filter((recipe) => {
      const commonTags = recipe.tags.filter((tag) => {
        return selectedTags.includes(tag);
      });
      const matchTags = selectedTags.length == 0 || commonTags.length > 0;
      return matchTags && recipe.name.toLowerCase().includes(fillerText.toLowerCase());
    });
    setRecipeList(newRecipeList);
  }, [allRecipes, fillerText, selectedTags]);

  return (
    <div className="Home-Container">
      <div className="Home-FilterRecipes">
        <FilterRecipes
          fillerText={fillerText}
          setFillerText={setFillerText}
          toggleTags={toggleTags}
          selectedTags={selectedTags}
        />
      </div>
      <div className="Home-RecipeList">
        <RecipeList
          recipes={recipeList}
          getShoppingList={getShoppingList}
          setShoppingList={setShoppingList}
          setSelectedRecipe={setSelectedRecipe}
        />
      </div>
      <div className="Home-ViewRecipe">
        <div className="Home-ViewRecipe-TextHeader">Ingredients</div>

        <div className="Home-IngredientsList">
          {selectedRecipe.ingredients.map((i) => (
            <div className="Home-IngredientsList-Ingredient">{`${i.amount} ${i.unit} ${i.item}`}</div>
          ))}
        </div>
        <div className="Home-ViewRecipe-TextHeader Home-ViewRecipe-StepHeader ">Steps</div>

        <div className="Home-DirectionList">
          {selectedRecipe.directions.map((d, i) => (
            <Direction direction={d} directionNumber={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Direction = ({ direction, directionNumber }) => {
  return (
    <div className="Home-DirectionList-DirectionContainer">
      <div className="Home-Direction-HeaderContainer">
        <div className="Home-Direction-HeaderStep">{directionNumber}</div>
        <div className="Home-Direction-HeaderContent">
          <span>{direction.title}</span>
          <span>{direction.time} min</span>
        </div>
      </div>
      <div className="Home-Direction-BodyContent">{direction.contents}</div>
    </div>
  );
};

export default Home;
