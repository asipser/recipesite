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

  const [directionIngredients, setDirectionIngredients] = useState([[1], [0, 1, 2]]);
  const [selectedDirectionNumber, setSelectedDirectionNumber] = useState(0);

  return (
    <div className="DirectionAdder-container">
      <IngredientsManager
        allIngredients={allIngredients}
        directionIngredients={directionIngredients}
        setDirectionIngredients={setDirectionIngredients}
        selectedDirectionNumber={selectedDirectionNumber}
      />
      <div className="DirectionAdder-directions-container">
        <DirectionCard />
      </div>
    </div>
  );
};

export default DirectionAdder;
