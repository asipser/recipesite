import React, { useState } from 'react';
import "./DirectionStep.css";

const DirectionStep = ({ number, title, time, content, toggleStep }) => {

    const [stepCollapsed, setStepCollapsed] = useState(true);

    const toggleStepActive = () => {
        setStepCollapsed(!stepCollapsed);
        toggleStep(number);
    }

    return (

        <div className="DirectionStep-container">
            <div className="DirectionStep-header-container" onClick={toggleStepActive}>
                <div className="DirectionStep-header-number">
                    <b>{number}</b>
                </div>
                <div className="DirectionStep-header-name"> {title}</div>
                <div className="DirectionStep-header-break">&mdash;</div>
                <div className="DirectionStep-header-time"> {time} min</div>
            </div>
            <div className={`DirectionStep-contents ${stepCollapsed && "hidden"}`}>
                {content}
            </div>
        </div>
    );
};

export default DirectionStep;