import React, { useRef, useState } from "react";
import EditableText from "../modules/EditableText";
import AutosizeInput from "react-input-autosize";
import "./RecipeMeta.css";

const RecipeMeta = () => {
  const timeRef = useRef();
  const servingsRef = useRef();
  const linkRef = useRef();
  const [link, setLink] = useState("");

  return (
    <div className="RecipeMeta-container">
      <div className="RecipeMeta-Block">
        <span className="RecipeMeta-Text">Enter Source Link:</span>
        <EditableText text={link} childRef={linkRef} placeholder={"Source Link"}>
          <AutosizeInput
            inputStyle={{ fontSize: "1.2rem", display: "inline-block" }}
            ref={linkRef}
            placeholder={"Source Link"}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </EditableText>
      </div>
      <div className="RecipeMeta-Block">
        <span className="RecipeMeta-Text">Time to cook:</span>
        <EditableText text={link} childRef={linkRef} placeholder={"Cooking Length"}>
          <AutosizeInput
            inputStyle={{ fontSize: "1.2rem", display: "inline-block" }}
            ref={linkRef}
            placeholder={"Cooking Length"}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </EditableText>
      </div>
      <div className="RecipeMeta-Block">
        <span className="RecipeMeta-Text">Serving Size:</span>
        <EditableText text={link} childRef={linkRef} placeholder={"Servings"}>
          <AutosizeInput
            inputStyle={{ fontSize: "1.2rem", display: "inline-block" }}
            ref={linkRef}
            placeholder={"Servings"}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </EditableText>
      </div>
    </div>
  );
};

export default RecipeMeta;
