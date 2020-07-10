import React, { useState, useEffect } from "react";
import "./EditableText.css";

const EditableText = ({ text, childRef, children, divClassName }) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleOnBlur = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  let renderText;

  if (isEditing) {
    return (
      <div className={divClassName} onKeyPress={handleKeyPress} onBlur={handleOnBlur}>
        {children}
      </div>
    );
  } else {
    return (
      <div className={`${divClassName} EditableText-hover`} onClick={handleClick}>
        {text}
      </div>
    );
  }
};
export default EditableText;
