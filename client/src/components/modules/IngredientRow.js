import React, { useRef, useState, useEffect } from "react";
import EditableText from "./EditableText";
import "./IngredientRow.css";

const IngredientRow = ({ rowNumber, cellsMetadata, onFilledRow, rowContent }) => {
  const generateRowCell = (textField, filled) => {
    return { text: textField, filled: filled || textField };
  };

  const [rowCells, setRowCells] = useState([
    generateRowCell(rowContent.amount, rowContent.filled),
    generateRowCell(rowContent.unit, rowContent.filled),
    generateRowCell(rowContent.item, rowContent.filled),
    generateRowCell(rowContent.store, rowContent.filled),
  ]);

  const [checkPantry, setCheckPantry] = useState(rowContent.checkPantry);

  const handleChange = (colNumber, event) => {
    const rowCellsCopy = [...rowCells];
    rowCellsCopy[colNumber].text = event.target.value;
    setRowCells(rowCellsCopy);
  };

  const handleCheckbox = (e) => {
    setCheckPantry(!checkPantry);
  };

  const handleOnEditCell = (colNumber) => {
    const rowCellsCopy = [...rowCells];
    rowCellsCopy[colNumber].filled = true;
    setRowCells(rowCellsCopy);
  };

  useEffect(() => {
    document.getElementById(`input-${rowNumber}-${0}`).focus();
  }, []);

  useEffect(() => {
    console.log("something changed in the row...");
    let rowFilled = true;
    for (let i = 0; i < rowCells.length; i++) {
      if (!rowCells[i].filled) {
        rowFilled = false;
      }
    }
    if (rowFilled) {
      onFilledRow({
        amount: rowCells[0].text,
        unit: rowCells[1].text,
        item: rowCells[2].text,
        store: rowCells[3].text,
        checkPantry: checkPantry,
      });
    }
  }, [rowCells, checkPantry]);

  const ingredientRow = cellsMetadata.map(({ placeholder, divClassName }, colNumber) => {
    const inputRef = useRef();
    return (
      <div key={`cell-${rowNumber}-${colNumber}`}>
        <EditableText
          divClassName={`${divClassName} IngredientRow-Cell`}
          text={rowCells[colNumber].text}
          childRef={inputRef}
          placeholder={placeholder}
          onFinishedEditing={() => handleOnEditCell(colNumber)}
        >
          <input
            className={"IngredientRow-Input"}
            ref={inputRef}
            id={`input-${rowNumber}-${colNumber}`}
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
      <form className={"IngredientRow-Form"}>
        {ingredientRow}
        <div style={{ marginRight: "8px" }}>Check Pantry:</div>
        <div>
          <input
            style={{ width: "18px", height: "100%" }}
            type={"checkbox"}
            checked={checkPantry}
            onClick={handleCheckbox}
          />
        </div>
      </form>
    </div>
  );
};

export default IngredientRow;
