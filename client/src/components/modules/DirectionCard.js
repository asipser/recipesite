import React, { useRef, useState } from "react";
import "./DirectionCard.css";
import EditableText from "./EditableText";
import AutosizeInput from "react-input-autosize";

const DirectionCard = ({ setActiveDirection, isActive }) => {
  const textareaRef = useRef();
  const titleRef = useRef();
  const divClassName = "DirectionCard-Body-Text";
  const [directionTitle, setDirectionTitle] = useState("");
  const [direction, setDirection] = useState("");

  return (
    <div className="DirectionCard-Container" onClick={setActiveDirection}>
      <div className={`DirectionCard-Header ${isActive && "DirectionCard-Active"}`}>
        <EditableText text={directionTitle} childRef={titleRef} placeholder={"Title"}>
          <AutosizeInput
            ref={titleRef}
            inputStyle={{ fontSize: "1.2rem" }}
            placeholder={"Title"}
            value={directionTitle}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setDirectionTitle(e.target.value)}
          />
        </EditableText>
      </div>
      <div className="DirectionCard-Body">
        <div className="DirectionCard-Body-Text-Wrapper">
          <EditableText
            divClassName={"DirectionCard-Body-Text"}
            text={direction}
            childRef={textareaRef}
            placeholder={"Direction here..."}
          >
            <textarea
              className={divClassName}
              ref={textareaRef}
              value={direction}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setDirection(e.target.value)}
              placeholder={"Direction here..."}
            />
          </EditableText>
        </div>
      </div>
    </div>
  );
};

export default DirectionCard;
