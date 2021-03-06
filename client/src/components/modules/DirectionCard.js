import React, { useRef, useState, useEffect } from "react";
import "./DirectionCard.css";
import EditableText from "./EditableText";
import AutosizeInput from "react-input-autosize";

const DirectionCard = ({
  setActiveDirection,
  isActive,
  directionNumber,
  direction,
  updateDirection,
}) => {
  const textareaRef = useRef();
  const titleRef = useRef();
  const timeRef = useRef();
  const divClassName = "DirectionCard-Body-Text";

  return (
    <div className="DirectionCard-Container" onClick={() => setActiveDirection(directionNumber)}>
      <div className={`DirectionCard-Header ${isActive && "DirectionCard-Active"}`}>
        <EditableText
          startEditing={false}
          text={direction.title}
          childRef={titleRef}
          placeholder={`Step ${directionNumber}`}
        >
          <AutosizeInput
            ref={titleRef}
            inputStyle={{ fontSize: "1.2rem" }}
            placeholder={`Step ${directionNumber}`}
            value={direction.title}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              updateDirection(directionNumber, { ...direction, title: e.target.value })
            }
          />
        </EditableText>

        <div>
          <span>Time (in minutes): </span>
          <EditableText
            text={direction.time}
            childRef={timeRef}
            placeholder={`Step ${directionNumber}`}
            divClassName="DirectionCard-Header-Time"
          >
            <AutosizeInput
              ref={timeRef}
              placeholder={`0`}
              inputStyle={{ fontSize: "1.2rem" }}
              value={direction.time}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                updateDirection(directionNumber, { ...direction, time: e.target.value })
              }
            />
          </EditableText>
        </div>
      </div>
      <div className="DirectionCard-Body">
        <div className="DirectionCard-Body-Text-Wrapper">
          <EditableText
            divClassName={"DirectionCard-Body-Text"}
            text={direction.contents}
            childRef={textareaRef}
            placeholder={`Step ${directionNumber} contents here.`}
          >
            <textarea
              className={divClassName}
              ref={textareaRef}
              value={direction.contents}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                updateDirection(directionNumber, { ...direction, contents: e.target.value })
              }
              placeholder={`Step ${directionNumber} contents here.`}
            />
          </EditableText>
        </div>
      </div>
    </div>
  );
};

export default DirectionCard;
