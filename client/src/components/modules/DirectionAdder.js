import React, { useState } from "react";
import IngredientsManager from "./IngredientsManager";

import "./DirectionAdder.css";
import DirectionCard from "./DirectionCard";

const DirectionAdder = () => {
  const [allIngredients, setAllIngredients] = useState([
    "5 cups cheese",
    "2 cups oil",
    "1 pound beef",
  ]);

  const [directionIngredients, setDirectionIngredients] = useState([[], []]);
  const [selectedDirectionNumber, setSelectedDirectionNumber] = useState(-1);
  const [directions, setDirections] = useState([{}, {}]);

  const setActiveDirection = (directionNumber) => {
    if (directionNumber == selectedDirectionNumber) {
      setSelectedDirectionNumber(-1);
    } else {
      setSelectedDirectionNumber(directionNumber);
    }
  };

  return (
    <div className="DirectionAdder-container">
      <IngredientsManager
        allIngredients={allIngredients}
        directionIngredients={directionIngredients}
        setDirectionIngredients={setDirectionIngredients}
        selectedDirectionNumber={selectedDirectionNumber}
      />
      <div className="DirectionAdder-directions-container">
        {directions.map((_, i) => (
          <DirectionCard
            key={`DirectionCard-${i}`}
            isActive={i == selectedDirectionNumber}
            directionNumber={i}
            setActiveDirection={setActiveDirection}
          />
        ))}
      </div>
    </div>
  );
};

export default DirectionAdder;
