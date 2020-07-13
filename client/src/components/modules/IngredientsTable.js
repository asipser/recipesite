import React, { useState, useEffect } from "react";
import IngredientRow from "./IngredientRow";
import "./IngredientRow.css";

const IngredientsTable = ({}) => {
  const getRowCellsMetadata = () => [
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

  const getInitialRowState = () => ({
    amount: "",
    unit: "",
    item: "",
    store: "",
    checkPantry: false,
    filled: false,
  });

  const [rows, setRows] = useState([getInitialRowState()]);

  const handleFilledRow = (row, rowNumber) => {
    const rowsCopy = [...rows];
    rowsCopy[rowNumber] = { ...row, filled: true };
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
      setRows([...rows, getInitialRowState()]);
    }
  }, [rows]);

  const ingredientsRow = rows.map((row, i) => {
    return (
      <div key={`row-${i}`}>
        <IngredientRow
          cellsMetadata={getRowCellsMetadata()}
          rowNumber={i}
          onFilledRow={(row) => handleFilledRow(row, i)}
        />
      </div>
    );
  });

  return <div>{ingredientsRow}</div>;
};

export default IngredientsTable;
