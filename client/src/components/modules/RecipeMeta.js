import React, { useRef, useState } from "react";
import EditableText from "../modules/EditableText";
import AutosizeInput from "react-input-autosize";
import "./RecipeMeta.css";

const RecipeMeta = ({ meta, setMeta, allTags }) => {
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
      <RecipeMetaSelect
        allTags={allTags}
        selectedTags={meta.tags}
        selectTags={(newTags) => {
          setMeta({ ...meta, tags: newTags });
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

const RecipeMetaSelect = ({ allTags, selectedTags, selectTags }) => {
  const handleChange = (e) => {
    selectTags(Array.from(e.target.selectedOptions, (option) => option.value));
  };

  return (
    <div className="RecipeMeta-Block">
      <span className="RecipeMeta-Text">Select all relevant tags</span>
      <select
        className="RecipeMeta-Select"
        name="meta-select"
        id="meta-select"
        multiple
        value={selectedTags}
        onChange={handleChange}
      >
        {allTags.map((group, i) => {
          return (
            <optgroup key={`group-${i}`} label={group.name}>
              {group.tags.map((tag, j) => {
                return (
                  <option key={`${tag}-{i}`} value={tag.toLowerCase()}>
                    {tag}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </select>
    </div>
  );
};

export default RecipeMeta;
