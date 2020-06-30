import React, { Component, useState } from "react";

import "../../utilities.css";
import "./Home.css";
import DirectionStep from "../modules/DirectionStep";
import IngredientsBox from "../modules/IngredientsBox";
const Home = (props) => {
  const [activeSteps, setActiveSteps] = useState([]);

  const toggleActiveStep = (stepNumber) => {
    if (activeSteps.includes(stepNumber)) {
      setActiveSteps(activeSteps.filter(stepNo => stepNo != stepNumber));
    } else {
      setActiveSteps([...activeSteps, stepNumber]);
    }
  }

  const data = {
    steps: [
      {
        title: "Simmer Meat",
        time: "5",
        content: `Heat 2 tablespoons of oil in a large nonstick skillet over medium heat, and stir in the rice.'
        Toss the rice with the hot
         oil until heated through and beginning to brown, about 2 minutes. Add the garlic powder, toss the rice
         for 1 more minute to develop the garlic taste, and stir in the luncheon meat, sausage, scrambled eggs,
         pineapple, and oyster sauce. Cook and stir until the oyster sauce coats the rice and other ingredients,
         2 to 3 minutes, stir in the green onions, and serve.`,
        ingredients: [
          "1 tsp salt",
          "2 tsp baking soda",
          "1 pound beef"]

      },
      {
        title: "Prepare Sauce",
        time: "1",
        content: `Serve with cold water.`,
        ingredients: [
          "1 quart chicken stock",
          "1 chicken sandwich",
          "10 carrots"]
      },
    ]
  }

  return (
    <>

      <div className="app-container">
        <div className="banner">
          <img width="128" height="128" src="images/home.png" />
          <div className="recipe-title-container">
            <div className="recipe-title-text">Chicken Paprikash</div>
            <div className="recipe-title-time">Total Time: 2 hours</div>
          </div>
        </div>
        <div className="recipe-container">
          <div className="ingredients-container">
            <IngredientsBox activeSteps={activeSteps} steps={data.steps} />
          </div>
          <div className="directions-container">
            {data.steps.map(
              (step, number) =>
                (
                  <DirectionStep toggleStep={toggleActiveStep} key={`step-${number}`} {...step} number={number} />
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
