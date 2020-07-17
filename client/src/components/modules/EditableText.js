import React, { useState, useEffect } from "react";
import "./EditableText.css";

const EditableText = ({
  placeholder,
  text,
  childRef,
  children,
  divClassName,
  onFinishedEditing,
  startEditing, //prop changes if editable text begins in editing mode or not
}) => {
  // let users specify if they want it to not be in editing mode
  const [isEditing, setIsEditing] = useState(startEditing != undefined ? startEditing : true);
  const [isFocused, setIsFocused] = useState(false);

  const handleOnBlur = () => {
    setIsFocused(false);
    if (text) {
      setIsEditing(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  useEffect(() => {
    if (!isEditing && onFinishedEditing) {
      onFinishedEditing();
    }
  }, [isEditing]);

  useEffect(() => {
    if (!isFocused && text.length > 0) {
      setIsEditing(false);
    }
  }, [text]);

  if (isEditing) {
    return (
      <div
        className={divClassName}
        onKeyPress={handleKeyPress}
        onBlur={handleOnBlur}
        onFocus={() => setIsFocused(true)}
      >
        {children}
      </div>
    );
  } else {
    return (
      <div className={`${divClassName} EditableText`} onClick={handleClick}>
        {text ? text : placeholder}
      </div>
    );
  }
};
export default EditableText;
