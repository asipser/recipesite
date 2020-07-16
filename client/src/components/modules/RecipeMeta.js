import React, { useRef, useState } from "react";
import EditableText from "../modules/EditableText";
import AutosizeInput from "react-input-autosize";
import "./RecipeMeta.css";

const RecipeMeta = ({ meta, setMeta }) => {
  return (
    <div className="RecipeMeta-container">
      <RecipeMetaLine
        labelText={"Enter Source"}
        placeholderText={"Link / Book / Person"}
        text={meta.source}
        setText={(newText) => {
          setMeta({ ...meta, source: newText });
        }}
      />
      <RecipeMetaLine
        labelText={"Number of Servings"}
        placeholderText={"0"}
        text={meta.servings}
        setText={(newText) => {
          setMeta({ ...meta, servings: newText });
        }}
      />
    </div>
  );
};

const RecipeMetaLine = ({ text, setText, labelText, placeholderText }) => {
  const inputRef = useRef();

  return (
    <div className="RecipeMeta-Block">
      <span className="RecipeMeta-Text">{labelText}:</span>
      <EditableText
        divClassName="RecipeMeta-Input-Text"
        text={text}
        childRef={inputRef}
        placeholder={placeholderText}
      >
        <AutosizeInput
          inputStyle={{ fontSize: "1.2rem", display: "inline-block" }}
          ref={inputRef}
          placeholder={placeholderText}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </EditableText>
    </div>
  );
};

export default RecipeMeta;
