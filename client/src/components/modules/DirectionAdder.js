import React, { useState } from "react";
import IngredientsManager from "./IngredientSelecter";

import "./DirectionAdder.css";
import DirectionCard from "./DirectionCard";
import IngredientSelecter from "./IngredientSelecter";

const DirectionAdder = ({ allIngredients }) => {
  const [directionIngredients, setDirectionIngredients] = useState([[]]);
  const [selectedDirectionNumber, setSelectedDirectionNumber] = useState(-1);
  const [directions, setDirections] = useState([{ title: "", time: 0, contents: "" }]);

  const setActiveDirection = (directionNumber) => {
    if (directionNumber == selectedDirectionNumber) {
      setSelectedDirectionNumber(-1);
    } else {
      setSelectedDirectionNumber(directionNumber);
    }
  };

  const updateDirection = (directionNumber, directionObj) => {
    const directionsCopy = [...directions];
    directionsCopy[directionNumber] = directionObj;
    setDirections(directionsCopy);
  };

  const addDirection = () => {
    setDirections([...directions, {}]);
    setDirectionIngredients([...directionIngredients, []]);
  };

  return (
    <div className="DirectionAdder-container">
      <IngredientSelecter
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
            updateDirection={updateDirection}
            direction={directions[i]}
          />
        ))}
        <div onClick={addDirection} className="DirectionAdder-AddDirection-Button">
          <span>Add Direction </span>
        </div>
      </div>
    </div>
  );
};

export default DirectionAdder;
