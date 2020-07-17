import React, { useEffect, useState } from "react";
import IngredientRow from "./IngredientRow";
import "./IngredientsTable.css";

const IngredientsTable = ({ rows, setRows }) => {
  const getInitialRowState = () => ({
    amount: "",
    unit: "",
    item: "",
    store: "",
    type: "",
    checkPantry: false,
    filled: false,
  });

  const [ingredientsMeta, setIngredientsMeta] = useState({
    units: [],
    stores: [],
    ingredients: [],
  });

  const handleFilledRow = (row, rowNumber) => {
    const rowsCopy = [...rows];
    rowsCopy[rowNumber] = { ...row, filled: true };
    setRows(rowsCopy);
  };

  useEffect(() => {
    fetch("/api/ingredients-meta")
      .then((response) => response.json())
      .then(({ units, stores, ingredients }) => {
        setIngredientsMeta({ units, stores, ingredients });
      });
  }, []);

  useEffect(() => {
    if (!rows) {
      setRows([getInitialRowState()]);
    }
  }, []);

  useEffect(() => {
    let tableFilled = true;
    for (let i = 0; i < rows.length; i++) {
      if (!rows[i].filled) {
        tableFilled = false;
      }
    }
    if (tableFilled) {
      setRows([...rows, getInitialRowState()]);
    }
  }, [rows]);

  const ingredientsRow = rows.map((row, i) => {
    return (
      <div className={"IngredientsTable-container"} key={`row-${i}`}>
        <IngredientRow
          rowNumber={i}
          onFilledRow={(row) => handleFilledRow(row, i)}
          rowContent={row}
          ingredientsMeta={ingredientsMeta}
        />
      </div>
    );
  });

  return <>{ingredientsRow}</>;
};

export default IngredientsTable;
