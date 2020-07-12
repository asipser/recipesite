import React, { useRef, useState, useEffect } from "react";
import EditableText from "./EditableText";
import "./IngredientRow.css";

const IngredientRow = ({ rowNumber, cellsMetadata, onFilledRow }) => {
  const defaultCell = () => ({
    text: "",
    filled: false,
  });

  const [rowCells, setRowCells] = useState(cellsMetadata.map((cellMetadata) => defaultCell()));

  const handleChange = (colNumber, event) => {
    const rowCellsCopy = [...rowCells];
    rowCellsCopy[colNumber].text = event.target.value;
    setRowCells(rowCellsCopy);
  };

  const handleOnEditCell = (colNumber) => {
    const rowCellsCopy = [...rowCells];
    rowCellsCopy[colNumber].filled = true;
    setRowCells(rowCellsCopy);
  };

  useEffect(() => {
    if (refs[0] && refs[0].current) {
      refs[0].current.focus();
    }
  }, []);

  useEffect(() => {
    let rowFilled = true;
    for (let i = 0; i < rowCells.length; i++) {
      if (!rowCells[i].filled) {
        rowFilled = false;
      }
    }
    if (rowFilled) {
      onFilledRow();
    }
  }, [rowCells]);

  const refs = cellsMetadata.map((met) => useRef());

  const ingredientRow = cellsMetadata.map(({ placeholder, divClassName }, colNumber) => {
    const inputRef = refs[colNumber];

    return (
      <div key={`row-${rowNumber}-${colNumber}`}>
        <EditableText
          divClassName={divClassName}
          text={rowCells[colNumber].text}
          childRef={inputRef}
          placeholder={placeholder}
          onFinishedEditing={() => handleOnEditCell(colNumber)}
        >
          <input
            className={divClassName}
            ref={inputRef}
            value={rowCells[colNumber].text}
            onChange={(event) => handleChange(colNumber, event)}
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
