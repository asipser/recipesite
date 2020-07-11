import React, { useState } from "react";
import IngredientsManager from "./IngredientsManager";

const DirectionAdder = () => {
  const [allIngredients, setAllIngredients] = useState([
    "5 cups cheese",
    "2 cups oil",
    "1 pound beef",
  ]);

  const [directionIngredients, setDirectionIngredients] = useState([[1], [0, 1, 2]]);
  const [selectedDirectionNumber, setSelectedDirectionNumber] = useState(0);

  return (
    <div>
      <IngredientsManager
        allIngredients={allIngredients}
        directionIngredients={directionIngredients}
        setDirectionIngredients={setDirectionIngredients}
        selectedDirectionNumber={selectedDirectionNumber}
      />
    </div>
  );
};

export default DirectionAdder;
