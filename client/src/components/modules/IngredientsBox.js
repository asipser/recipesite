import React from 'react';
import "./IngredientsBox.css";

const IngredientsBox = ({ activeSteps, steps }) => {

    const ingredientsText = activeSteps.sort().map(stepNumber => {
        return (
            <>
                <div className="IngredientsBox-step-number">
                    <b>Step {stepNumber}</b>
                </div>
                {steps[stepNumber].ingredients.map((ingredient, i) => (
                    <div key={`ingredient-${stepNumber}-${i}`}
                        className="IngredientsBox-step-ingedients">
                        {ingredient}
                    </div>
                ))}

            </>
        )
    })

    return (
        <div className="IngredientsBox-text">
            {ingredientsText}
        </div>
    );
};

export default IngredientsBox;