import React, { useState, useEffect } from "react";
import "./EditableText.css";

const EditableText = ({
  placeholder,
  text,
  childRef,
  children,
  divClassName,
  onFinishedEditing,
  startComplete,
}) => {
  // let users specify if they want it to not be in editing mode
  const [isEditing, setIsEditing] = useState(startComplete != undefined ? startComplete : true);

  const handleOnBlur = () => {
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

  if (isEditing) {
    return (
      <div className={divClassName} onKeyPress={handleKeyPress} onBlur={handleOnBlur}>
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
