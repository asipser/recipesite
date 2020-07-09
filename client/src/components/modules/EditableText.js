import React, { useState, useEffect } from 'react';

const EditableText = ({text, childRef, children}) => {

	const [isEditing, setIsEditing] = useState(false);


	const handleOnBlur = () => {
		setIsEditing(false);
	}

	const handleKeyPress = (event) => {
		if(event.key === 'Enter'){
			setIsEditing(false);
		}
	}
	
	const handleClick = () => {
		setIsEditing(true);
	}

	useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

	let renderText;

	if (isEditing) {
		renderText = (
			<div onKeyPress={handleKeyPress} onBlur={handleOnBlur}>
			{children}
		</div>
		);
	} else {
		renderText = (
			<div onClick={handleClick}>
				{text}
			</div>
		);
	}

	return renderText;

};

export default EditableText;