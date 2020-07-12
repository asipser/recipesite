import React from "react";
import IngredientRow from "./IngredientRow";
import "./IngredientRow.css";

const IngredientsTable = ({ setTableText, tableText }) => {
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

  console.log(tableText);

  const ingredientsRow = tableText.map((row, i) => {
    return (
      <div key={`row-${i}`}>
        <IngredientRow
          rowCells={defaultRowCells()}
          setTableText={setTableText}
          tableText={tableText}
          rowNumber={i}
        />
      </div>
    );
  });

  return <div>{ingredientsRow}</div>;
};

export default IngredientsTable;
