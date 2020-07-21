import React, { useState, useEffect } from "react";

import "./Home.css";
import FilterRecipes from "../modules/FilterRecipes";
import RecipeList from "../modules/RecipeList";
import { get } from "../../utilities";

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

  const toggleTags = (newTag) => {
    const isTagSelected = selectedTags.includes(newTag);
    if (!isTagSelected) {
      setSelectedTags([...selectedTags, newTag]);
    } else {
      setSelectedTags(copyAndRemove(selectedTags, newTag));
    }
  };

  useEffect(() => {
    setShoppingList(getRawShoppingList());
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

  const SHOPPING_LIST_KEY = "shoppingList";

  const getRawShoppingList = () => {
    const rawShoppingList = window.localStorage.getItem(SHOPPING_LIST_KEY);
    return rawShoppingList === null ? {} : JSON.parse(rawShoppingList);
  };

  const getShoppingList = (recipeName) => {
    const shoppingList = getRawShoppingList();
    return shoppingList[recipeName] === undefined ? false : shoppingList[recipeName];
  };

  const setShoppingList = (recipeName, value) => {
    const shoppingList = getRawShoppingList();
    const newShoppingList = { ...shoppingList };
    newShoppingList[recipeName] = value;
    window.localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(newShoppingList));
  };

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
        />
      </div>
    </div>
  );
};

export default Home;
