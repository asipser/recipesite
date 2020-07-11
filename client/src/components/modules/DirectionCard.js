import React, { useRef, useState } from "react";
import "./DirectionCard.css";
import EditableText from "./EditableText";

const DirectionCard = () => {
  const textareaRef = useRef();
  const divClassName = "DirectionCard-Body-Text";
  const [direction, setDirection] = useState("");
  return (
    <div className="DirectionCard-Container">
      <div className="DirectionCard-Header"> Wash Chicken</div>
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
