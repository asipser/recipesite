import React, { useRef, useState, useEffect } from "react";
import EditableText from "./EditableText";
import "./IngredientRow.css";

const getAutofill = (options, text) => {
  if (!options.includes(text)) {
    const autofillOptions = options.filter((option) => {
      return option.startsWith(text);
    });
    if (autofillOptions.length > 0) {
      return autofillOptions[0];
    } else {
      return options[0];
    }
  } else {
    return text;
  }
};

const getCellWithFilled = (cell, filled) => {
  const newCell = { ...cell };
  newCell.filled = filled;
  return newCell;
};

const getCellWithText = (cell, text) => {
  const newCell = { ...cell };
  newCell.text = text;
  return newCell;
};

const IngredientRow = ({ rowNumber, cellsMetadata, onFilledRow, rowContent }) => {
  const generateRowCell = (textField, filled) => {
    return { text: textField, filled: filled || !!textField };
  };

  const units = ["cup", "ounce", "pound"];
  const stores = ["trader joe's", "whole's foods"];

  const [cellAmount, setCellAmount] = useState(
    generateRowCell(rowContent.amount, rowContent.filled)
  );
  const [cellUnit, setCellUnit] = useState(generateRowCell(rowContent.unit, rowContent.filled));
  const [cellItem, setCellItem] = useState(generateRowCell(rowContent.item, rowContent.filled));
  const [cellStore, setCellStore] = useState(generateRowCell(rowContent.store, rowContent.filled));
  const [checkPantry, setCheckPantry] = useState(rowContent.checkPantry);

  const handleCheckbox = (e) => {
    setCheckPantry(!checkPantry);
  };

  useEffect(() => {
    document.getElementById(`input-${rowNumber}-Amount$`).focus();
  }, []);

  useEffect(() => {
    let rowFilled = true;
    const rowCells = [cellAmount, cellUnit, cellItem, cellStore];
    for (let i = 0; i < rowCells.length; i++) {
      if (!rowCells[i].filled) {
        rowFilled = false;
      }
    }
    if (rowFilled) {
      onFilledRow({
        amount: cellAmount.text,
        unit: cellUnit.text,
        item: cellItem.text,
        store: cellStore.text,
        checkPantry: checkPantry,
      });
    }
  }, [cellAmount, cellUnit, cellItem, cellStore, checkPantry]);

  return (
    <div className={"IngredientRow-Container"}>
      <form className={"IngredientRow-Form"}>
        <CellAmount cell={cellAmount} setCell={setCellAmount} rowNumber={rowNumber} />
        <CellUnit cell={cellUnit} setCell={setCellUnit} rowNumber={rowNumber} units={units} />
        <CellItem cell={cellItem} setCell={setCellItem} rowNumber={rowNumber} />
        <CellStore cell={cellStore} setCell={setCellStore} rowNumber={rowNumber} stores={stores} />
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

const CellAmount = ({ rowNumber, cell, setCell }) => {
  const placeholder = "Amount";
  const inputRef = useRef();
  const text = cell.text;
  const setText = (newText) => {
    setCell(getCellWithText(cell, newText));
  };
  const setFilled = () => {
    setCell(getCellWithFilled(cell, true));
  };
  return (
    <EditableText
      divClassName={`IngredientRow-Cell-Amount IngredientRow-Cell`}
      text={text}
      childRef={inputRef}
      placeholder={placeholder}
      onFinishedEditing={setFilled}
    >
      <input
        className={"IngredientRow-Input"}
        type={"number"}
        ref={inputRef}
        id={`input-${rowNumber}-Amount$`}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={placeholder}
      />
    </EditableText>
  );
};

const CellUnit = ({ units, rowNumber, cell, setCell }) => {
  const placeholder = "Unit";
  const inputRef = useRef();
  const text = cell.text;
  const setText = (newText) => {
    setCell(getCellWithText(cell, newText));
  };
  const handleFinishedEditing = () => {
    const newText = getAutofill(units, text);
    setCell({
      text: newText,
      filled: true,
    });
  };

  return (
    <EditableText
      divClassName={`IngredientRow-Cell-Unit IngredientRow-Cell`}
      text={text}
      childRef={inputRef}
      placeholder={placeholder}
      onFinishedEditing={handleFinishedEditing}
    >
      <input
        list={`units-${rowNumber}`}
        className={"IngredientRow-Input"}
        ref={inputRef}
        id={`input-${rowNumber}-Unit`}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={placeholder}
      />
      <datalist id={`units-${rowNumber}`}>
        {units.map((unit) => (
          <option key={`unit-${rowNumber}-${unit}`} value={unit} />
        ))}
      </datalist>
    </EditableText>
  );
};

const CellItem = ({ cell, setCell, rowNumber }) => {
  const placeholder = "Item";
  const inputRef = useRef();
  const text = cell.text;
  const setText = (newText) => {
    setCell(getCellWithText(cell, newText));
  };
  const setFilled = () => {
    setCell(getCellWithFilled(cell, true));
  };
  return (
    <EditableText
      divClassName={`IngredientRow-Cell-Item IngredientRow-Cell`}
      text={text}
      childRef={inputRef}
      placeholder={placeholder}
      onFinishedEditing={setFilled}
    >
      <input
        className={"IngredientRow-Input"}
        ref={inputRef}
        id={`input-${rowNumber}-Item`}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={placeholder}
      />
    </EditableText>
  );
};

const CellStore = ({ cell, setCell, rowNumber, stores }) => {
  const placeholder = "Store";
  const inputRef = useRef();
  const text = cell.text;
  const setText = (newText) => {
    setCell(getCellWithText(cell, newText));
  };
  const handleFinishedEditing = () => {
    const newText = getAutofill(stores, text);
    setCell({
      text: newText,
      filled: true,
    });
  };
  return (
    <EditableText
      divClassName={`IngredientRow-Cell-Store IngredientRow-Cell`}
      text={text}
      childRef={inputRef}
      placeholder={placeholder}
      onFinishedEditing={handleFinishedEditing}
    >
      <input
        list={`stores-${rowNumber}`}
        className={"IngredientRow-Input"}
        ref={inputRef}
        id={`input-${rowNumber}-Store`}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={placeholder}
      />
      <datalist id={`stores-${rowNumber}`}>
        {stores.map((store) => (
          <option key={`store-${rowNumber}-${store}`} value={store} />
        ))}
      </datalist>
    </EditableText>
  );
};

export default IngredientRow;
