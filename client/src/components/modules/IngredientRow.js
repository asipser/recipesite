import React, { useRef, useState } from "react";
import EditableText from "./EditableText";
import "./IngredientRow.css";

const IngredientRow = ({ rowNumber, rowCells, setTableText, tableText }) => {
  const ingredientRow = rowCells.map(({ placeholder, divClassName }, colNumber) => {
    const inputRef = useRef();

    const handleChange = (event) => {
      const tableTextCopy = [...tableText];
      tableTextCopy[rowNumber][colNumber] = event.target.value;
      setTableText(tableTextCopy);
    };

    return (
      <div key={`row-${rowNumber}-${colNumber}`}>
        <EditableText
          divClassName={divClassName}
          text={tableText[rowNumber][colNumber]}
          childRef={inputRef}
          placeholder={placeholder}
        >
          <input
            className={divClassName}
            ref={inputRef}
            value={tableText[rowNumber][colNumber]}
            onChange={handleChange}
            placeholder={placeholder}
          />
        </EditableText>
      </div>
    );
  });

  return (
    <div className={"IngredientRow-Container"}>
      <form className={"IngredientRow-Form"}>{ingredientRow}</form>
    </div>
  );
};

export default IngredientRow;
