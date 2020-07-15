import React, { useEffect } from "react";
import IngredientRow from "./IngredientRow";
import "./IngredientsTable.css";

const IngredientsTable = ({ rows, setRows }) => {
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
    type: "",
    checkPantry: false,
    filled: false,
  });

  const handleFilledRow = (row, rowNumber) => {
    const rowsCopy = [...rows];
    rowsCopy[rowNumber] = { ...row, filled: true };
    setRows(rowsCopy);
  };

  useEffect(() => {
    if (!rows) {
      setRows([getInitialRowState()]);
    }
  });

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
          cellsMetadata={getRowCellsMetadata()}
          rowNumber={i}
          onFilledRow={(row) => handleFilledRow(row, i)}
          rowContent={row}
        />
      </div>
    );
  });

  return <>{ingredientsRow}</>;
};

export default IngredientsTable;
