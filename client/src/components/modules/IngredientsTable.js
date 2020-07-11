import React from "react";
import IngredientRow from "./IngredientRow";
import "./IngredientRow.css";

const IngredientsTable = ({ setTableText, tableText }) => {
  const defaultRowCells = [
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

  return (
    <div>
      <IngredientRow
        rowCells={[...defaultRowCells]}
        setTableText={setTableText}
        tableText={tableText}
        rowNumber={0}
      />
      <IngredientRow
        rowCells={[...defaultRowCells]}
        setTableText={setTableText}
        tableText={tableText}
        rowNumber={1}
      />
    </div>
  );
};

export default IngredientsTable;
