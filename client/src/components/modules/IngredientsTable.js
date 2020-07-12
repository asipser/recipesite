import React, { useState, useEffect } from "react";
import IngredientRow from "./IngredientRow";
import "./IngredientRow.css";

const IngredientsTable = ({}) => {
  const defaultRowCells = () => [
    {
      placeholder: "Amount",
      divClassName: "IngredientRow-Cell-Amount",
    },
    {
      placeholder: "Unit",
      divClassName: "IngredientRow-Cell-Unit",
    },
    {
      placeholder: "Item",
      divClassName: "IngredientRow-Cell-Item",
    },
    {
      placeholder: "Store",
      divClassName: "IngredientRow-Cell-Store",
    },
  ];

  const [rows, setRows] = useState([{ filled: false }]);

  const handleFilledRow = (rowNumber) => {
    const rowsCopy = [...rows];
    rowsCopy[rowNumber].filled = true;
    setRows(rowsCopy);
  };

  useEffect(() => {
    let tableFilled = true;
    console.log(rows);
    for (let i = 0; i < rows.length; i++) {
      if (!rows[i].filled) {
        tableFilled = false;
      }
    }
    if (tableFilled) {
      setRows([...rows, { filled: false }]);
    }
  }, [rows]);

  const ingredientsRow = rows.map((row, i) => {
    return (
      <div key={`row-${i}`}>
        <IngredientRow
          cellsMetadata={defaultRowCells()}
          rowNumber={i}
          onFilledRow={() => handleFilledRow(i)}
        />
      </div>
    );
  });

  return <div>{ingredientsRow}</div>;
};

export default IngredientsTable;
