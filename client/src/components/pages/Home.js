import React, { useState, useEffect } from "react";

import "./Home.css";
import FilterRecipes from "../modules/FilterRecipes";
import RecipeList from "../modules/RecipeList";

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
  const [recipes, setRecipes] = useState([]);

  const toggleTags = (newTag) => {
    const isTagSelected = selectedTags.includes(newTag);
    if (!isTagSelected) {
      setSelectedTags([...selectedTags, newTag]);
    } else {
      setSelectedTags(copyAndRemove(selectedTags, newTag));
    }
  };

  const filterRecipes = () => {
    const ans = recipes.filter((recipe) => {
      const commonTags = recipe.tags.filter((tag) => {
        selectedTags.includes(tag);
      });
      //TODO: this is broken, FIIIXXXXXX
      const matchTags = selectedTags.length == 0 || commonTags.length > 0;
      return matchTags && recipe.title.toLowerCase().includes(fillerText.toLowerCase());
    });
    console.log(ans);
    return ans;
  };

  useEffect(() => {
    setRecipes([
      {
        title: "Chicken Milanesas",
        ingredients: [],
        directions: [],
        tags: ["chicken"],
      },
      {
        title: "HMart meat",
        ingredients: [],
        directions: [],
        tags: ["meat", "pork"],
      },
      {
        title: "Chocolate cake",
        ingredients: [],
        directions: [],
        tags: ["cake"],
      },
    ]);
    //TODO: fill with API request for recipes
  }, []);

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
        <RecipeList recipes={filterRecipes()} />
      </div>
    </div>
  );
};

export default Home;
