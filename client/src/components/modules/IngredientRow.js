import React, { useRef, useState, useEffect } from "react";
import EditableText from "./EditableText";
import "./IngredientRow.css";

const IngredientRow = ({ rowNumber, cellsMetadata, onFilledRow, rowContent }) => {
  const generateRowCell = (textField, filled) => {
    return { text: textField, filled: filled || textField };
  };

  const units = ["cup", "ounce", "pound"];

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

  const handleOnEditUnitCell = () => {
    const rowCellsCopy = [...rowCells];
    if (!units.includes(rowCellsCopy[1].text)) {
      const autofillOptions = units.filter((unit) => {
        return unit.startsWith(rowCellsCopy[1].text);
      });
      if (autofillOptions.length > 0) {
        rowCellsCopy[1].text = autofillOptions[0];
      } else {
        rowCellsCopy[1].text = units[0];
      }
    }
    rowCellsCopy[1].filled = true;
    setRowCells(rowCellsCopy);
  };

  useEffect(() => {
    document.getElementById(`input-${rowNumber}-${0}`).focus();
  }, []);

  useEffect(() => {
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

  const refs = [useRef(), useRef(), useRef(), useRef()];

  return (
    <div className={"IngredientRow-Container"}>
      <form className={"IngredientRow-Form"}>
        <div>
          <EditableText
            divClassName={`${cellsMetadata[0].divClassName} IngredientRow-Cell`}
            text={rowCells[0].text}
            childRef={refs[0]}
            placeholder={cellsMetadata[0].placeholder}
            onFinishedEditing={() => handleOnEditCell(0)}
          >
            <input
              className={"IngredientRow-Input"}
              ref={refs[0]}
              id={`input-${rowNumber}-${0}`}
              value={rowCells[0].text}
              onChange={(event) => handleChange(0, event)}
              placeholder={cellsMetadata[0].placeholder}
            />
          </EditableText>
        </div>
        <div>
          <EditableText
            divClassName={`${cellsMetadata[1].divClassName} IngredientRow-Cell`}
            text={rowCells[1].text}
            childRef={refs[1]}
            placeholder={cellsMetadata[1].placeholder}
            onFinishedEditing={handleOnEditUnitCell}
          >
            <input
              list={`units-${rowNumber}`}
              className={"IngredientRow-Input"}
              ref={refs[1]}
              id={`input-${rowNumber}-${1}`}
              value={rowCells[1].text}
              onChange={(event) => handleChange(1, event)}
              placeholder={cellsMetadata[1].placeholder}
            />
            <datalist id={`units-${rowNumber}`}>
              {units.map((unit) => (
                <option key={`unit-${rowNumber}-${unit}`} value={unit} />
              ))}
            </datalist>
          </EditableText>
        </div>
        <div>
          <EditableText
            divClassName={`${cellsMetadata[2].divClassName} IngredientRow-Cell`}
            text={rowCells[2].text}
            childRef={refs[2]}
            placeholder={cellsMetadata[2].placeholder}
            onFinishedEditing={() => handleOnEditCell(2)}
          >
            <input
              className={"IngredientRow-Input"}
              ref={refs[2]}
              id={`input-${rowNumber}-${2}`}
              value={rowCells[2].text}
              onChange={(event) => handleChange(2, event)}
              placeholder={cellsMetadata[2].placeholder}
            />
          </EditableText>
        </div>
        <div>
          <EditableText
            divClassName={`${cellsMetadata[3].divClassName} IngredientRow-Cell`}
            text={rowCells[3].text}
            childRef={refs[3]}
            placeholder={cellsMetadata[3].placeholder}
            onFinishedEditing={() => handleOnEditCell(3)}
          >
            <input
              className={"IngredientRow-Input"}
              ref={refs[3]}
              id={`input-${rowNumber}-${3}`}
              value={rowCells[3].text}
              onChange={(event) => handleChange(3, event)}
              placeholder={cellsMetadata[3].placeholder}
            />
          </EditableText>
        </div>
        <div style={{ marginRight: "8px" }}>Check Pantry:</div>
        <div>
          <input
            style={{ width: "18px", height: "100%" }}
            type={"checkbox"}
            checked={checkPantry}
            onChange={handleCheckbox}
          />
        </div>
      </form>
    </div>
  );
};

export default IngredientRow;
